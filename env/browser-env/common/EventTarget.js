function initEventTarget (vmCtx, config = {}) {
	function addEventListener () { }
	function removeEventListener () { }
	function dispatchEvent () { }
	function when () { }
	vmCtx.r0zerox.setNative(addEventListener);
	vmCtx.r0zerox.setNative(removeEventListener);
	vmCtx.r0zerox.setNative(dispatchEvent);
	vmCtx.r0zerox.setNative(when);

	function EventTarget () { };
	vmCtx.r0zerox.setObjectTag(EventTarget, 'EventTarget');
	vmCtx.r0zerox.setNative(EventTarget);

	EventTarget.prototype.addEventListener = addEventListener;
	EventTarget.prototype.removeEventListener = removeEventListener;
	EventTarget.prototype.dispatchEvent = dispatchEvent;
	EventTarget.prototype.when = when;
	vmCtx.context.EventTarget = EventTarget;
}

module.exports = initEventTarget;
