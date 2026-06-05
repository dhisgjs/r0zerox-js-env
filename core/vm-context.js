const vm = require('vm');

/**
 * 原生VM隔离上下文
 * 纯作用域隔离、代码执行、定时器管理、资源销毁
 */
class VMContext {
	/**
	 * @param {Object} options 配置项
	 * @param {number} [options.timeout=30000] 执行超时(ms)
	 * @param {string} [options.filename='browser.js'] 虚拟文件名
	 * @param {boolean} [options.displayErrors=true] 展示错误栈
	 */
	constructor(options = {}) {
		this.options = {
			timeout: 30000,
			filename: 'browser.js',
			displayErrors: true,
			...options
		};

		// 状态标记
		this._destroyed = false;
		// 托管定时器，用于统一清理
		this._timeouts = new Set();
		this._intervals = new Set();

		// 创建隔离上下文
		this.context = this._createIsolatedContext();
	}

	/**
	 * 创建纯净隔离作用域
	 */
	_createIsolatedContext () {
		// 无原型空对象，减少特征
		const root = vm.createContext(Object.create(null));

		// 白名单注入标准全局对象
		const safeGlobals = {
			console,
			Function,
			Promise,
			Array,
			Object,
			String,
			Number,
			Boolean,
			Math,
			Date,
			Error,
			TypeError,
			ReferenceError,
			SyntaxError,
			RangeError,
			JSON,
			Symbol,
			Map,
			Set,
			WeakMap,
			WeakSet,
			Proxy,
			Reflect,
			btoa,
			atob,
			decodeURI,
			decodeURIComponent,
			encodeURI,
			encodeURIComponent,
			isFinite,
			isNaN,
			parseFloat,
			parseInt
		};
		Object.assign(root, safeGlobals);

		// 在 VM 上下文中包装 RegExp 以支持 $1, $2 等静态属性
		this._injectRegExpStatics(root);

		// 包装定时器，收集ID
		root.setTimeout = this._wrapTimer(setTimeout, this._timeouts);
		root.clearTimeout = this._wrapClearTimer(clearTimeout, this._timeouts);
		root.setInterval = this._wrapTimer(setInterval, this._intervals);
		root.clearInterval = this._wrapClearTimer(clearInterval, this._intervals);

		// 包装 eval、Function 构造函数，限制在当前上下文执行
		root.eval = this._wrapEval();
		// 注意：保留原生 Function.prototype（供 setNative 劫持使用），只包装 Function 构造函数
		const wrappedFunction = this._wrapFunction();
		wrappedFunction.prototype = root.Function.prototype;
		root.Function = wrappedFunction;

		return root;
	}

	/**
	 * 包装定时器
	 */
	_wrapTimer (timerFn, store) {
		return (...args) => {
			if (this._destroyed) return null;
			const timerId = timerFn(...args);
			store.add(timerId);
			return timerId;
		};
	}

	/**
	 * 包装清除定时器
	 */
	_wrapClearTimer (clearFn, store) {
		return (timerId) => {
			store.delete(timerId);
			clearFn(timerId);
		};
	}

	/**
	 * 在 VM 上下文中注入 RegExp 静态属性支持
	 */
	_injectRegExpStatics (context) {
		const injectCode =
			'(function() {' +
			'var NativeRegExp = RegExp;' +
			'var OriginalString = String;' +

			'var originalTest = NativeRegExp.prototype.test;' +
			'var originalExec = NativeRegExp.prototype.exec;' +
			'var originalReplace = OriginalString.prototype.replace;' +
			'var originalMatch = OriginalString.prototype.match;' +
			'var originalSearch = OriginalString.prototype.search;' +

			'function updateRegExpStatics(regex, str, result) {' +
			'str = String(str || "");' +
			'if (result) {' +
			'NativeRegExp.input = str;' +
			"NativeRegExp['$_'] = result[0];" +
			"NativeRegExp['$&'] = result[0];" +
			"NativeRegExp['$+'] = result[result.length - 1] || '';" +
			"NativeRegExp['$`'] = str.substring(0, result.index);" +
			"NativeRegExp[\"$'\"] = str.substring(result.index + result[0].length);" +
			'for (var i = 1; i <= 9; i++) {' +
			"NativeRegExp['$' + i] = result[i] || '';" +
			'}' +
			'} else {' +
			"NativeRegExp.input = str;" +
			"NativeRegExp['$_'] = '';" +
			"NativeRegExp['$&'] = '';" +
			"NativeRegExp['$+'] = '';" +
			"NativeRegExp['$`'] = str;" +
			"NativeRegExp[\"$'\"] = '';" +
			'for (var i = 1; i <= 9; i++) {' +
			"NativeRegExp['$' + i] = '';" +
			'}' +
			'}' +
			'}' +

			'NativeRegExp.prototype.test = function(str) {' +
			'var result = originalTest.call(this, str);' +
			'if (result) {' +
			'var lastIndex = this.lastIndex;' +
			'this.lastIndex = 0;' +
			'var matchResult = originalExec.call(this, str);' +
			'this.lastIndex = lastIndex;' +
			'updateRegExpStatics(this, str, matchResult);' +
			'} else {' +
			'updateRegExpStatics(this, str, null);' +
			'}' +
			'return result;' +
			'};' +

			'NativeRegExp.prototype.exec = function(str) {' +
			'var result = originalExec.call(this, str);' +
			'updateRegExpStatics(this, str, result);' +
			'return result;' +
			'};' +

			'OriginalString.prototype.replace = function(searchValue, replaceValue) {' +
			'if (searchValue instanceof NativeRegExp) {' +
			'var matchResult = originalMatch.call(this, searchValue);' +
			'updateRegExpStatics(searchValue, this.toString(), matchResult);' +
			'}' +
			'return originalReplace.call(this, searchValue, replaceValue);' +
			'};' +

			'OriginalString.prototype.match = function(regexp) {' +
			'var result = originalMatch.call(this, regexp);' +
			'if (regexp instanceof NativeRegExp) {' +
			'updateRegExpStatics(regexp, this.toString(), result);' +
			'}' +
			'return result;' +
			'};' +

			'OriginalString.prototype.search = function(regexp) {' +
			'var result = originalSearch.call(this, regexp);' +
			'if (regexp instanceof NativeRegExp && result !== -1) {' +
			'var matchResult = originalMatch.call(this, regexp);' +
			'updateRegExpStatics(regexp, this.toString(), matchResult);' +
			'}' +
			'return result;' +
			'};' +

			"NativeRegExp.input = '';" +
			"NativeRegExp['$_'] = '';" +
			"NativeRegExp['$&'] = '';" +
			"NativeRegExp['$+'] = '';" +
			"NativeRegExp['$`'] = '';" +
			"NativeRegExp[\"$'\"] = '';" +
			'for (var i = 1; i <= 9; i++) {' +
			"NativeRegExp['$' + i] = '';" +
			'}' +
			'})();';

		vm.runInContext(injectCode, context, {
			filename: this.options.filename,
			displayErrors: true
		});
	}

	/**
	 * 包装 eval
	 */
	_wrapEval () {
		return (code) => {
			return vm.runInContext(code, this.context, this.options);
		};
	}

	/**
	 * 包装 Function 构造函数
	 */
	_wrapFunction () {
		return (...args) => {
			const body = args.pop() || '';
			const params = args.join(',');
			const script = new vm.Script(`(function(${params}){${body}})`, {
				filename: this.options.filename
			});
			return script.runInContext(this.context);
		};
	}

	/**
	   * 执行 JS 代码（等价 eval）
	   * @param {string} code
	   * @returns {*}
	   */
	eval (code) {
		return this.run(code);
	}

	/**
	 * 执行 JS 代码，自动修正 this 指向 window
	 * @param {string} code 待执行代码
	 * @param {Object} [opts] 临时配置
	 * @returns {*} 执行结果
	 */
	run (code, opts = {}) {
		if (this._destroyed) {
			throw new Error('VMContext: 上下文已销毁，无法执行代码');
		}
		const trimmedCode = code.trim();
		// 去除开头的注释和分号后检查是否为表达式
		const codeWithoutComments = trimmedCode
			.replace(/^(\/\*[\s\S]*?\*\/\s*)+/, '')
			.replace(/^(\/\/.*\s*)+/, '')
			.replace(/^[;\s]*/, '');
		const isExpression = codeWithoutComments && !/^(var|let|const|function|class|if|for|while|switch|try|import|export|return|throw|debugger|with|do)\b/.test(codeWithoutComments);
		const wrapCode = isExpression
			? `(function(){return ${code}}).call(window);`
			: `(function(){${code}}).call(window);`;
		return vm.runInContext(wrapCode, this.context, {
			...this.options,
			...opts
		});
	}

	/**
	 * 调用上下文中的全局函数
	 * @param {string} funcName 函数名
	 * @param  {...any} args 调用参数
	 * @returns {*}
	 */
	call (funcName, ...args) {
		const argsStr = args.map(arg => JSON.stringify(arg)).join(',');
		const code = `(typeof ${funcName} === 'function' ? ${funcName}(${argsStr}) : undefined);`;
		return this.run(code);
	}

	/**
	 * 读取上下文全局变量
	 * @param {string} varName 变量名
	 * @returns {*}
	 */
	get (varName) {
		const code = `typeof ${varName} !== 'undefined' ? ${varName} : undefined;`;
		return this.run(code);
	}

	/**
	 * 向上下文挂载全局变量
	 * @param {string} varName 变量名
	 * @param {*} value 值
	 */
	set (varName, value) {
		this.context[varName] = value;
	}

	/**
	 * 销毁上下文，释放全部资源
	 */
	destroy () {
		if (this._destroyed) return;
		this._destroyed = true;

		// 清空所有定时器
		this._timeouts.forEach(id => clearTimeout(id));
		this._intervals.forEach(id => clearInterval(id));
		this._timeouts.clear();
		this._intervals.clear();

		// 清空上下文对象，释放内存
		Object.keys(this.context).forEach(key => {
			try {
				delete this.context[key];
			} catch (e) { }
		});
	}
}

module.exports = VMContext;