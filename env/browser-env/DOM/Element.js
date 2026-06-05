function initElement (vmCtx, config = {}) {
	function Element () { };
	vmCtx.r0zerox.setNative(Element);

	const _getAttribute = function () { return null; };
	const _setAttribute = function () { };
	const _removeAttribute = function () { };
	const _hasAttribute = function () { return false; };
	const _hasAttributes = function () { return false; };
	const _toggleAttribute = function () { return false; };
	const _getAttributeNames = function () { return []; };
	const _getAttributeNode = function () { return null; };
	const _setAttributeNode = function () { return null; };
	const _removeAttributeNode = function () { return null; };
	const _getElementsByTagName = function () { return []; };
	const _getElementsByTagNameNS = function () { return []; };
	const _getElementsByClassName = function () { return []; };
	const _querySelector = function () { return null; };
	const _querySelectorAll = function () { return []; };
	const _closest = function () { return null; };
	const _matches = function () { return false; };
	const _insertAdjacentElement = function () { return null; };
	const _insertAdjacentText = function () { };
	const _insertAdjacentHTML = function () { };
	const _scroll = function () { };
	const _scrollTo = function () { };
	const _scrollBy = function () { };
	const _scrollIntoView = function () { };
	const _getBoundingClientRect = function () {
		return { x: 0, y: 0, width: 0, height: 0, top: 0, left: 0, bottom: 0, right: 0 };
	};
	const _getClientRects = function () { return []; };
	const _append = function () { };
	const _prepend = function () { };
	const _before = function () { };
	const _after = function () { };
	const _replaceWith = function () { };
	const _remove = function () { };

	vmCtx.r0zerox.setNative(_getAttribute);
	vmCtx.r0zerox.setNative(_setAttribute);
	vmCtx.r0zerox.setNative(_removeAttribute);
	vmCtx.r0zerox.setNative(_hasAttribute);
	vmCtx.r0zerox.setNative(_hasAttributes);
	vmCtx.r0zerox.setNative(_toggleAttribute);
	vmCtx.r0zerox.setNative(_getAttributeNames);
	vmCtx.r0zerox.setNative(_getAttributeNode);
	vmCtx.r0zerox.setNative(_setAttributeNode);
	vmCtx.r0zerox.setNative(_removeAttributeNode);
	vmCtx.r0zerox.setNative(_getElementsByTagName);
	vmCtx.r0zerox.setNative(_getElementsByTagNameNS);
	vmCtx.r0zerox.setNative(_getElementsByClassName);
	vmCtx.r0zerox.setNative(_querySelector);
	vmCtx.r0zerox.setNative(_querySelectorAll);
	vmCtx.r0zerox.setNative(_closest);
	vmCtx.r0zerox.setNative(_matches);
	vmCtx.r0zerox.setNative(_insertAdjacentElement);
	vmCtx.r0zerox.setNative(_insertAdjacentText);
	vmCtx.r0zerox.setNative(_insertAdjacentHTML);
	vmCtx.r0zerox.setNative(_scroll);
	vmCtx.r0zerox.setNative(_scrollTo);
	vmCtx.r0zerox.setNative(_scrollBy);
	vmCtx.r0zerox.setNative(_scrollIntoView);
	vmCtx.r0zerox.setNative(_getBoundingClientRect);
	vmCtx.r0zerox.setNative(_getClientRects);
	vmCtx.r0zerox.setNative(_append);
	vmCtx.r0zerox.setNative(_prepend);
	vmCtx.r0zerox.setNative(_before);
	vmCtx.r0zerox.setNative(_after);
	vmCtx.r0zerox.setNative(_replaceWith);
	vmCtx.r0zerox.setNative(_remove);

	Object.defineProperty(Element.prototype, 'namespaceURI', {
		get () { return null; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'prefix', {
		get () { return null; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'localName', {
		get () { return ''; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'tagName', {
		get () { return ''; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'id', {
		get () { return ''; },
		set () { },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'className', {
		get () { return ''; },
		set () { },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'classList', {
		get () { return []; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'attributes', {
		get () { return []; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'innerHTML', {
		get () { return ''; },
		set () { },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'outerHTML', {
		get () { return ''; },
		set () { },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'scrollTop', {
		get () { return 0; },
		set () { },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'scrollLeft', {
		get () { return 0; },
		set () { },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'scrollWidth', {
		get () { return 0; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'scrollHeight', {
		get () { return 0; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'clientTop', {
		get () { return 0; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'clientLeft', {
		get () { return 0; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'clientWidth', {
		get () { return 0; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'clientHeight', {
		get () { return 0; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'children', {
		get () { return []; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'firstElementChild', {
		get () { return null; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'lastElementChild', {
		get () { return null; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'previousElementSibling', {
		get () { return null; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'nextElementSibling', {
		get () { return null; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'childElementCount', {
		get () { return 0; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'assignedSlot', {
		get () { return null; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'shadowRoot', {
		get () { return null; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'part', {
		get () { return []; },
		configurable: true, enumerable: true
	});
	Object.defineProperty(Element.prototype, 'slot', {
		get () { return ''; },
		set () { },
		configurable: true, enumerable: true
	});

	Element.prototype.getAttribute = _getAttribute;
	Element.prototype.setAttribute = _setAttribute;
	Element.prototype.removeAttribute = _removeAttribute;
	Element.prototype.hasAttribute = _hasAttribute;
	Element.prototype.hasAttributes = _hasAttributes;
	Element.prototype.toggleAttribute = _toggleAttribute;
	Element.prototype.getAttributeNames = _getAttributeNames;
	Element.prototype.getAttributeNode = _getAttributeNode;
	Element.prototype.setAttributeNode = _setAttributeNode;
	Element.prototype.removeAttributeNode = _removeAttributeNode;
	Element.prototype.getElementsByTagName = _getElementsByTagName;
	Element.prototype.getElementsByTagNameNS = _getElementsByTagNameNS;
	Element.prototype.getElementsByClassName = _getElementsByClassName;
	Element.prototype.querySelector = _querySelector;
	Element.prototype.querySelectorAll = _querySelectorAll;
	Element.prototype.closest = _closest;
	Element.prototype.matches = _matches;
	Element.prototype.insertAdjacentElement = _insertAdjacentElement;
	Element.prototype.insertAdjacentText = _insertAdjacentText;
	Element.prototype.insertAdjacentHTML = _insertAdjacentHTML;
	Element.prototype.scroll = _scroll;
	Element.prototype.scrollTo = _scrollTo;
	Element.prototype.scrollBy = _scrollBy;
	Element.prototype.scrollIntoView = _scrollIntoView;
	Element.prototype.getBoundingClientRect = _getBoundingClientRect;
	Element.prototype.getClientRects = _getClientRects;
	Element.prototype.append = _append;
	Element.prototype.prepend = _prepend;
	Element.prototype.before = _before;
	Element.prototype.after = _after;
	Element.prototype.replaceWith = _replaceWith;
	Element.prototype.remove = _remove;

	vmCtx.r0zerox.setObjectTag(Element.prototype, 'Element');

	Object.setPrototypeOf(Element, vmCtx.context.Node);
	Object.setPrototypeOf(Element.prototype, vmCtx.context.Node.prototype);

	const proxiedElement = vmCtx.r0zerox.proxy(Element, 'Element');
	vmCtx.context.Element = proxiedElement;
}

module.exports = initElement;
