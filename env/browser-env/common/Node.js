function initNode (vmCtx, config = {}) {
	function Node () { }; vmCtx.r0zerox.setNative(Node); const _replaceChild = function () {
		console.log('Node.prototype.replaceChild 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_replaceChild, 'toString', {
		value: function () { return "function replaceChild() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _removeChild = function () {
		console.log('Node.prototype.removeChild 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_removeChild, 'toString', {
		value: function () { return "function removeChild() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _normalize = function () {
		console.log('Node.prototype.normalize 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_normalize, 'toString', {
		value: function () { return "function normalize() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _lookupPrefix = function () {
		console.log('Node.prototype.lookupPrefix 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_lookupPrefix, 'toString', {
		value: function () { return "function lookupPrefix() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _lookupNamespaceURI = function () {
		console.log('Node.prototype.lookupNamespaceURI 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_lookupNamespaceURI, 'toString', {
		value: function () { return "function lookupNamespaceURI() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _isSameNode = function () {
		console.log('Node.prototype.isSameNode 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_isSameNode, 'toString', {
		value: function () { return "function isSameNode() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _isEqualNode = function () {
		console.log('Node.prototype.isEqualNode 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_isEqualNode, 'toString', {
		value: function () { return "function isEqualNode() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _isDefaultNamespace = function () {
		console.log('Node.prototype.isDefaultNamespace 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_isDefaultNamespace, 'toString', {
		value: function () { return "function isDefaultNamespace() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _insertBefore = function () {
		console.log('Node.prototype.insertBefore 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_insertBefore, 'toString', {
		value: function () { return "function insertBefore() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _hasChildNodes = function () {
		console.log('Node.prototype.hasChildNodes 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_hasChildNodes, 'toString', {
		value: function () { return "function hasChildNodes() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _getRootNode = function () {
		console.log('Node.prototype.getRootNode 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_getRootNode, 'toString', {
		value: function () { return "function getRootNode() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _contains = function () {
		console.log('Node.prototype.contains 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_contains, 'toString', {
		value: function () { return "function contains() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _compareDocumentPosition = function () {
		console.log('Node.prototype.compareDocumentPosition 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_compareDocumentPosition, 'toString', {
		value: function () { return "function compareDocumentPosition() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _cloneNode = function () {
		console.log('Node.prototype.cloneNode 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_cloneNode, 'toString', {
		value: function () { return "function cloneNode() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	const _appendChild = function () {
		console.log('Node.prototype.appendChild 被调用了');
		throw new TypeError('Illegal invocation');
	};
	Object.defineProperty(_appendChild, 'toString', {
		value: function () { return "function appendChild() { [native code] }"; },
		writable: false, enumerable: false, configurable: false
	});
	// ========== Node 静态属性 ==========
	Object.defineProperty(Node, 'name', {
		value: "Node",
		writable: false,
		enumerable: false,
		configurable: true
	});

	Object.defineProperty(Node, 'ELEMENT_NODE', {
		value: 1,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'ATTRIBUTE_NODE', {
		value: 2,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'TEXT_NODE', {
		value: 3,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'CDATA_SECTION_NODE', {
		value: 4,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'ENTITY_REFERENCE_NODE', {
		value: 5,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'ENTITY_NODE', {
		value: 6,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'PROCESSING_INSTRUCTION_NODE', {
		value: 7,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'COMMENT_NODE', {
		value: 8,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'DOCUMENT_NODE', {
		value: 9,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'DOCUMENT_TYPE_NODE', {
		value: 10,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'DOCUMENT_FRAGMENT_NODE', {
		value: 11,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'NOTATION_NODE', {
		value: 12,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'DOCUMENT_POSITION_DISCONNECTED', {
		value: 1,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'DOCUMENT_POSITION_PRECEDING', {
		value: 2,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'DOCUMENT_POSITION_FOLLOWING', {
		value: 4,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'DOCUMENT_POSITION_CONTAINS', {
		value: 8,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'DOCUMENT_POSITION_CONTAINED_BY', {
		value: 16,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node, 'DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC', {
		value: 32,
		writable: false,
		enumerable: true,
		configurable: false
	});

	// ========== Node.prototype 原型属性 ==========
	Object.defineProperty(Node.prototype, 'nodeType', {
		get () { console.log('Node.prototype.nodeType 被调用了'); throw new TypeError('Illegal invocation') },
		set: undefined,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'nodeName', {
		get () { console.log('Node.prototype.nodeName 被调用了'); throw new TypeError('Illegal invocation') },
		set: undefined,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'baseURI', {
		get () { console.log('Node.prototype.baseURI 被调用了'); throw new TypeError('Illegal invocation') },
		set: undefined,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'isConnected', {
		get () { console.log('Node.prototype.isConnected 被调用了'); throw new TypeError('Illegal invocation') },
		set: undefined,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'ownerDocument', {
		get () { console.log('Node.prototype.ownerDocument 被调用了'); throw new TypeError('Illegal invocation') },
		set: undefined,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'parentNode', {
		get () { console.log('Node.prototype.parentNode 被调用了'); throw new TypeError('Illegal invocation') },
		set: undefined,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'parentElement', {
		get () { console.log('Node.prototype.parentElement 被调用了'); throw new TypeError('Illegal invocation') },
		set: undefined,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'childNodes', {
		get () { console.log('Node.prototype.childNodes 被调用了'); throw new TypeError('Illegal invocation') },
		set: undefined,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'firstChild', {
		get () { console.log('Node.prototype.firstChild 被调用了'); throw new TypeError('Illegal invocation') },
		set: undefined,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'lastChild', {
		get () { console.log('Node.prototype.lastChild 被调用了'); throw new TypeError('Illegal invocation') },
		set: undefined,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'previousSibling', {
		get () { console.log('Node.prototype.previousSibling 被调用了'); throw new TypeError('Illegal invocation') },
		set: undefined,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'nextSibling', {
		get () { console.log('Node.prototype.nextSibling 被调用了'); throw new TypeError('Illegal invocation') },
		set: undefined,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'nodeValue', {
		get () { console.log('Node.prototype.nodeValue 被调用了'); throw new TypeError('Illegal invocation') },
		set (v) { /* 补全逻辑 */ },
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'textContent', {
		get () { console.log('Node.prototype.textContent 被调用了'); throw new TypeError('Illegal invocation') },
		set (v) { /* 补全逻辑 */ },
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'ELEMENT_NODE', {
		value: 1,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'ATTRIBUTE_NODE', {
		value: 2,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'TEXT_NODE', {
		value: 3,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'CDATA_SECTION_NODE', {
		value: 4,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'ENTITY_REFERENCE_NODE', {
		value: 5,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'ENTITY_NODE', {
		value: 6,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'PROCESSING_INSTRUCTION_NODE', {
		value: 7,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'COMMENT_NODE', {
		value: 8,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'DOCUMENT_NODE', {
		value: 9,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'DOCUMENT_TYPE_NODE', {
		value: 10,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'DOCUMENT_FRAGMENT_NODE', {
		value: 11,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'NOTATION_NODE', {
		value: 12,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'DOCUMENT_POSITION_DISCONNECTED', {
		value: 1,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'DOCUMENT_POSITION_PRECEDING', {
		value: 2,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'DOCUMENT_POSITION_FOLLOWING', {
		value: 4,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'DOCUMENT_POSITION_CONTAINS', {
		value: 8,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'DOCUMENT_POSITION_CONTAINED_BY', {
		value: 16,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC', {
		value: 32,
		writable: false,
		enumerable: true,
		configurable: false
	});

	Object.defineProperty(Node.prototype, 'appendChild', {
		value: _appendChild,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'cloneNode', {
		value: _cloneNode,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'compareDocumentPosition', {
		value: _compareDocumentPosition,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'contains', {
		value: _contains,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'getRootNode', {
		value: _getRootNode,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'hasChildNodes', {
		value: _hasChildNodes,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'insertBefore', {
		value: _insertBefore,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'isDefaultNamespace', {
		value: _isDefaultNamespace,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'isEqualNode', {
		value: _isEqualNode,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'isSameNode', {
		value: _isSameNode,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'lookupNamespaceURI', {
		value: _lookupNamespaceURI,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'lookupPrefix', {
		value: _lookupPrefix,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'normalize', {
		value: _normalize,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'removeChild', {
		value: _removeChild,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(Node.prototype, 'replaceChild', {
		value: _replaceChild,
		writable: true,
		enumerable: true,
		configurable: true
	});

	Object.setPrototypeOf(Node, EventTarget);
	;
	const proxiedNode = vmCtx.r0zerox.proxy(Node, 'Node');
	vmCtx.r0zerox.setObjectTag(proxiedNode, 'Node');
	vmCtx.context.Node = proxiedNode;
}

module.exports = initNode;