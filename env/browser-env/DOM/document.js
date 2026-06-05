const initCanvasElement = require('./HTMLCanvasElement.js');

function initDocument (vmCtx, config = {}) {
	function createElement (tagName) {
		tagName = (tagName || '').toUpperCase();

		if (tagName === 'CANVAS') {
			if (!vmCtx.context.HTMLCanvasElement) {
				initCanvasElement(vmCtx);
			}
			return new vmCtx.context.HTMLCanvasElement();
		}

		return {
			nodeType: 1,
			nodeName: tagName,
			tagName: tagName,
			style: {},
			attributes: {},
			children: [],
			innerHTML: '',
			textContent: '',
			offsetWidth: 0,
			offsetHeight: 0,
			clientWidth: 0,
			clientHeight: 0,
			scrollWidth: 0,
			scrollHeight: 0,
			getAttribute: function () { return null; },
			setAttribute: function () { },
			removeAttribute: function () { },
			hasAttribute: function () { return false; },
			appendChild: function () { return this; },
			removeChild: function () { return this; },
			replaceChild: function () { return this; },
			insertBefore: function () { return this; },
			addEventListener: function () { },
			removeEventListener: function () { },
			dispatchEvent: function () { return true; },
			click: function () { },
			focus: function () { },
			blur: function () { },
			getBoundingClientRect: function () {
				return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
			}
		};
	}

	function createTextNode () { return {}; }
	function getElementById (id) {
		console.log('document getElementById', id);
		return null;
	}
	function querySelector () { return null; }
	function querySelectorAll () { return []; }
	function addEventListener () { }
	function removeEventListener () { }
	function hasFocus () { return true; }
	function getElementsByClassName () { return []; }
	function getElementsByTagName () { return []; }
	function getElementsByName (name) {
		console.log('document getElementsByName', name);
		return [];
	}

	function open () {
		console.log('Document open');
	}

	function close () {
		console.log('Document close');
	}

	function write () {
		console.log('Document write');
	}

	function writeln () {
		console.log('Document writeln');
	}

	vmCtx.r0zerox.setNative(getElementsByName);
	vmCtx.r0zerox.setNative(open);
	vmCtx.r0zerox.setNative(close);
	vmCtx.r0zerox.setNative(write);
	vmCtx.r0zerox.setNative(writeln);
	vmCtx.r0zerox.setNative(hasFocus);
	vmCtx.r0zerox.setNative(createElement);
	vmCtx.r0zerox.setNative(createTextNode);
	vmCtx.r0zerox.setNative(getElementById);
	vmCtx.r0zerox.setNative(querySelector);
	vmCtx.r0zerox.setNative(querySelectorAll);
	vmCtx.r0zerox.setNative(addEventListener);
	vmCtx.r0zerox.setNative(removeEventListener);
	vmCtx.r0zerox.setNative(hasFocus);
	vmCtx.r0zerox.setNative(getElementsByClassName);
	vmCtx.r0zerox.setNative(getElementsByTagName);

	function Document () {
		this.documentElement = { nodeType: 1, nodeName: 'HTML' };
		this.head = { nodeType: 1, nodeName: 'HEAD' };
		this.body = { nodeType: 1, nodeName: 'BODY' };
		this.title = '';
		this.URL = config.url || 'https://www.example.com/';
		this.documentURI = config.url || 'https://www.example.com/';
		this.referrer = config.referrer || config.url || 'https://www.example.com/';
		this.domain = '';
		this.cookie = config.cookie || '';
		this.readyState = 'complete';
		this.characterSet = 'UTF-8';
		this.contentType = 'text/html';
		this.compatMode = 'CSS1Compat';
		this.hidden = false;
		this.visibilityState = 'visible';
		this.documentMode = '';
	}

	Document.prototype.createElement = createElement;
	Document.prototype.createTextNode = createTextNode;
	Document.prototype.getElementById = getElementById;
	Document.prototype.querySelector = querySelector;
	Document.prototype.querySelectorAll = querySelectorAll;
	Document.prototype.addEventListener = addEventListener;
	Document.prototype.removeEventListener = removeEventListener;
	Document.prototype.getElementsByName = getElementsByName;
	Document.prototype.hasFocus = hasFocus;
	Document.prototype.getElementsByClassName = getElementsByClassName;
	Document.prototype.getElementsByTagName = getElementsByTagName;
	Document.prototype.open = open;
	Document.prototype.close = close;
	Document.prototype.write = write;
	Document.prototype.writeln = writeln;
	Document.prototype.hasFocus = hasFocus;

	vmCtx.r0zerox.setObjectTag(Document.prototype, 'Document');
	vmCtx.r0zerox.Document = Document;
	vmCtx.r0zerox.DocumentProto = Document.prototype;

	const document = new Object();
	Object.setPrototypeOf(document, vmCtx.r0zerox.HTMLDocument ? vmCtx.r0zerox.HTMLDocument.prototype : Document.prototype);

	document.documentElement = { nodeType: 1, nodeName: 'HTML' };
	document.head = { nodeType: 1, nodeName: 'HEAD' };
	document.body = { nodeType: 1, nodeName: 'BODY' };
	document.title = '';
	document.URL = config.url || 'https://www.example.com/';
	document.documentURI = config.url || 'https://www.example.com/';
	document.referrer = config.referrer || config.url || 'https://www.example.com/';
	document.domain = '';
	document.cookie = config.cookie || '';
	document.readyState = 'complete';
	document.characterSet = 'UTF-8';
	document.contentType = 'text/html';
	document.compatMode = 'CSS1Compat';
	document.hidden = false;
	document.visibilityState = 'visible';
	document.documentMode = '';

	const proxiedDocument = vmCtx.r0zerox.proxy(document, 'document');

	vmCtx.r0zerox.setObjectTag(proxiedDocument, 'HTMLDocument');

	vmCtx.context.document = proxiedDocument;
}

module.exports = initDocument;