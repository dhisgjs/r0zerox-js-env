function initWindow (vmCtx, config = {}) {
	const ctx = vmCtx.context;
	const raw = ctx;

	const WindowProto = vmCtx.r0zerox.createProto('Window', {
		PERSISTENT: 1,
		TEMPORARY: 0,
		alert: function () { },
		confirm: function () { return true; },
		prompt: function () { return null; },
		open: function () { return null; },
		close: function () { },
		focus: function () { },
		blur: function () { },
		postMessage: function () { },
		getComputedStyle: function () { return {}; },
		requestAnimationFrame: function () { return 0; },
		matchMedia: function () { return { matches: true }; },
		stop: function () { },
		print: function () { },
		find: function () { return false; }
	});

	Object.setPrototypeOf(WindowProto, vmCtx.r0zerox.WindowPropertiesProto);
	Object.setPrototypeOf(raw, WindowProto);

	raw.window = raw;
	raw.self = raw;
	raw.top = raw;
	raw.parent = raw;
	raw.globalThis = raw;

	raw.innerWidth = config.innerWidth || config.screenWidth || 1920;
	raw.innerHeight = config.innerHeight || config.screenHeight || 1080;
	raw.outerWidth = config.outerWidth || config.screenWidth || 1920;
	raw.outerHeight = config.outerHeight || config.screenHeight || 1080;
	raw.devicePixelRatio = config.devicePixelRatio || 1;
	raw.chrome = {
		"app": {
			"isInstalled": false,
			"InstallState": {
				"DISABLED": "disabled",
				"INSTALLED": "installed",
				"NOT_INSTALLED": "not_installed"
			},
			"RunningState": {
				"CANNOT_RUN": "cannot_run",
				"READY_TO_RUN": "ready_to_run",
				"RUNNING": "running"
			}
		}
	};

	function Image() {
		this.complete = false;
		this.naturalWidth = 0;
		this.naturalHeight = 0;
		this.width = 0;
		this.height = 0;
		this.src = '';
		this.onload = null;
		this.onerror = null;
		this.onabort = null;
	}

	Image.prototype.addEventListener = function(type, listener) {
		if (type === 'load') this.onload = listener;
		if (type === 'error') this.onerror = listener;
		if (type === 'abort') this.onabort = listener;
	};

	Image.prototype.removeEventListener = function() {};

	Image.prototype.dispatchEvent = function(event) {
		if (event && event.type && this['on' + event.type]) {
			this['on' + event.type]();
		}
	};

	raw.Image = Image;

	const win = vmCtx.r0zerox.proxy(raw, 'window');

	vmCtx.r0zerox.setObjectTag(win, 'Window');

	ctx.window = win;
	ctx.self = win;
	ctx.top = win;
	ctx.parent = win;
	ctx.globalThis = win;
}

module.exports = initWindow;