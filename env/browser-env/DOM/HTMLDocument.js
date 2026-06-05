function initHTMLDocument (vmCtx, config = {}) {
	function HTMLDocument () { };
	vmCtx.r0zerox.setNative(HTMLDocument);

	Object.setPrototypeOf(HTMLDocument, vmCtx.r0zerox.Document);
	Object.setPrototypeOf(HTMLDocument.prototype, vmCtx.r0zerox.DocumentProto);

	vmCtx.r0zerox.setObjectTag(HTMLDocument.prototype, 'HTMLDocument');
	vmCtx.r0zerox.HTMLDocument = HTMLDocument;
	vmCtx.context.HTMLDocument = HTMLDocument;
}

module.exports = initHTMLDocument;
