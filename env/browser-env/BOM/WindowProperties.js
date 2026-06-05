function initWindowProperties (vmCtx, config = {}) {
	const WindowPropertiesProto = vmCtx.r0zerox.createProto('WindowProperties', {
		// WindowProperties 通常没有自己的方法，主要作为中间层
	});

	// WindowProperties.prototype → EventTarget.prototype
	Object.setPrototypeOf(WindowPropertiesProto, vmCtx.r0zerox.EventTargetProto);

	vmCtx.r0zerox.WindowPropertiesProto = WindowPropertiesProto;
}

module.exports = initWindowProperties;