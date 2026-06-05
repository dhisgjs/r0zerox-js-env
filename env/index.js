// browser-env/index.js
const initR0zerox = require('../utils/r0zerox.js'); // 新增
const initEventTarget = require('./browser-env/common/EventTarget.js'); // 新增
const initNode = require('./browser-env/common/NOde.js'); // 新增
const initElement = require('./browser-env/DOM/Element.js'); // 新增
const initHTMLElement = require('./browser-env/DOM/HTMLElement.js'); // 新增
const initHTMLDocument = require('./browser-env/DOM/HTMLDocument.js'); // 新增
const initWindow = require('./browser-env/BOM/window.js');
const initWindowProperties = require('./browser-env/BOM/WindowProperties.js');
const initStorage = require('./browser-env/BOM/Storage.js');
const initDeviceEvents = require('./browser-env/BOM/device-events.js');
const initNavigator = require('./browser-env/BOM/navigator.js');
const initLocation = require('./browser-env/BOM/location.js');
const initScreen = require('./browser-env/BOM/screen.js');
const initHistory = require('./browser-env/BOM/history.js');
const initCrypto = require('./browser-env/BOM/crypto.js'); // 新增
const initDocument = require('./browser-env/DOM/document.js');



function Plugin() {
	this.name = '';
	this.description = '';
	this.filename = '';
}

function MimeType() {
	this.type = '';
	this.description = '';
	this.suffixes = '';
}

function PluginArray() {
	Array.call(this);
	this.refresh();
}

PluginArray.prototype = Object.create(Array.prototype);
PluginArray.prototype.constructor = PluginArray;
PluginArray.prototype.refresh = function() {
	this[0] = new Plugin();
	this[0].name = 'Chrome PDF Plugin';
	this[0].description = 'Portable Document Format';
	this[0].filename = 'internal-pdf-viewer';

	this[1] = new Plugin();
	this[1].name = 'Chrome PDF Viewer';
	this[1].description = '';
	this[1].filename = 'mhjfbmdgcfjbbpaeojofohoefgiehjai';

	this[2] = new Plugin();
	this[2].name = 'Native Client';
	this[2].description = '';
	this[2].filename = 'internal-nacl-plugin';

	this.length = 3;
};

function MimeTypeArray() {
	Array.call(this);
	this.length = 0;
}

MimeTypeArray.prototype = Object.create(Array.prototype);
MimeTypeArray.prototype.constructor = MimeTypeArray;


class BrowserEnv {
	constructor(vmContext, config = {}) {
		this.ctx = vmContext;
		this.config = {
			url: 'https://www.example.com/',
			userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0 Safari/537.36',
			platform: 'Win32',
			language: 'zh-CN',
			screenWidth: 1920,
			screenHeight: 1080,
			hardwareConcurrency: 8,
			cookie: '',
			...config
		};
		this._initAll();
	}

	_initAll () {
		// 配置
		initR0zerox(this.ctx); // 执行挂载

		// 添加全局类
		this.ctx.context.PluginArray = PluginArray;
		this.ctx.context.Plugin = Plugin;
		this.ctx.context.MimeType = MimeType;
		this.ctx.context.MimeTypeArray = MimeTypeArray;

		// 初始化共享的 EventTarget 原型
		this.ctx.r0zerox.EventTargetProto = this.ctx.r0zerox.createProto('EventTarget', {
			addEventListener: function () { },
			removeEventListener: function () { },
			dispatchEvent: function () { return true; }
		});

		// 初始化 EventTarget
		initEventTarget(this.ctx, this.config);
		initNode(this.ctx, this.config);

		// WindowProperties 在 Window 和 EventTarget 之间
		initWindowProperties(this.ctx, this.config);

		// BOM
		initWindow(this.ctx, this.config);
		initStorage(this.ctx, this.config);
		initDeviceEvents(this.ctx, this.config);
		initNavigator(this.ctx, this.config);
		initLocation(this.ctx, this.config);
		initHistory(this.ctx, this.config);
		initScreen(this.ctx, this.config);
		initCrypto(this.ctx, this.config);


		// DOM
		initDocument(this.ctx, this.config);
		initElement(this.ctx, this.config);
		initHTMLElement(this.ctx, this.config);
		initHTMLDocument(this.ctx, this.config);
		// // 网络
		// initXHR(this.ctx);
	}
}

module.exports = BrowserEnv;