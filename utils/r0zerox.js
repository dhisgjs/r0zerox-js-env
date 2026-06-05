const fs = require('fs');
const vm = require('vm');

/**
 * 挂载全局 r0zerox + Proxy 代理 + Function.toString 原生伪装劫持
 * @param {object} ctx VM 根上下文（VMContext 实例）
 */
function initR0zerox (ctx) {
	// 1. 先初始化 r0zerox 基础对象 & proxy 方法
	ctx.r0zerox = {
		config: {
			proxy: false
		},
		proxy: function (o, name = '') {
			if (this.config.proxy === false) {
				return o;
			}
			const label = name ? `[${name}] ` : '';
			return new Proxy(o, {
				set (target, key, value) {
					if (typeof key === 'symbol') return Reflect.set(...arguments);
					const val = value && typeof value === 'object' ? `{${value.constructor?.name || 'Object'}}` : value;
					console.log(`【set】${label} ${String(key)} =`, val);
					return Reflect.set(...arguments);
				},
				get (target, key, receiver) {
					if (typeof key === 'symbol') return Reflect.get(target, key, receiver);
					const val = Reflect.get(target, key, receiver);
					let display;
					if (typeof val === 'function') {
						display = val.toString();
					} else if (val && typeof val === 'object') {
						display = `{${val.constructor?.name || 'Object'}}`;
					} else {
						display = val;
					}
					console.log(`【get】==》${label} ${String(key)} →`, display);
					return val;
				},
				deleteProperty (target, key) {
					if (typeof key === 'symbol') return true;
					console.log(`【del】${label} ${String(key)}`);
					return true;
				}
			});
		},
		/**
		* 修正 Object.prototype.toString 类型标签
		* @param {object} target 目标对象
		* @param {string} value 类型名称，例如 Window / Navigator / Location
		*/
		setObjectTag: function (target, value) {
			Object.defineProperties(target, {
				[Symbol.toStringTag]: {
					value: value,
					configurable: true,
					enumerable: false,
				},
				toString: {
					value: function () {
						return `[object ${value}]`;
					},
					configurable: true,
					enumerable: false,
					writable: true
				}
			})
		},
		/**
		* 创建原型对象，方法自动 setNative，返回原型链
		* @param {string} protoName 原型名称（如 Location、History）
		* @param {object} methods 方法名→函数 的键值对
		* @returns {object} 原型对象
		*/
		createProto: function (protoName, methods) {
			const proto = {};
			for (const key of Object.keys(methods)) {
				const fn = methods[key];
				if (typeof fn === 'function') this.setNative(fn);
				proto[key] = fn;
			}
			this.setObjectTag(proto, protoName);
			return proto;
		}
	};

	// 2. 直接在 VM 上下文中执行 setNative 代码（不经过 ctx.eval 的 .call(window) 包装）
	// 先把 r0zerox 注入到 VM 沙箱中，供 setNative.js 引用
	ctx.context.r0zerox = ctx.r0zerox;

	const setNativeCode = fs.readFileSync(__dirname + '/setNative.js', 'utf8');
	vm.runInContext(setNativeCode, ctx.context);
}

module.exports = initR0zerox;