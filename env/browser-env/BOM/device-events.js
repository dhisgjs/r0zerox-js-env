function initDeviceEvents (vmCtx, config = {}) {
	// 先创建 Event 基类（Node.js 没有原生 Event）
	const Event = function Event (type, eventInitDict) {
		this.type = type || '';
		this.bubbles = eventInitDict && eventInitDict.bubbles ? true : false;
		this.cancelable = eventInitDict && eventInitDict.cancelable ? true : false;
	};
	vmCtx.r0zerox.setNative(Event);
	vmCtx.r0zerox.setObjectTag(Event, 'Event');
	vmCtx.context.Event = Event;

	// DeviceOrientationEvent
	const DeviceOrientationEvent = function DeviceOrientationEvent () { };
	vmCtx.r0zerox.setNative(DeviceOrientationEvent);
	vmCtx.r0zerox.setObjectTag(DeviceOrientationEvent, 'DeviceOrientationEvent');
	Object.setPrototypeOf(DeviceOrientationEvent, Event);
	vmCtx.context.DeviceOrientationEvent = DeviceOrientationEvent;

	// DeviceMotionEvent
	const DeviceMotionEvent = function DeviceMotionEvent () { };
	vmCtx.r0zerox.setNative(DeviceMotionEvent);
	vmCtx.r0zerox.setObjectTag(DeviceMotionEvent, 'DeviceMotionEvent');
	Object.setPrototypeOf(DeviceMotionEvent, Event);
	vmCtx.context.DeviceMotionEvent = DeviceMotionEvent;
}

module.exports = initDeviceEvents;