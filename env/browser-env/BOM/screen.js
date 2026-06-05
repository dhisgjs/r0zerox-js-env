function initScreen (vmCtx, config = {}) {
	let screen = {};

	screen.width = config.width || config.screenWidth || 1920;
	screen.height = config.height || config.screenHeight || 1080;
	screen.availWidth = config.availWidth || config.screenWidth || 1920;
	screen.availHeight = config.availHeight || config.screenHeight || 1080;
	screen.availLeft = 0;
	screen.availTop = 0;
	screen.colorDepth = 24;
	screen.pixelDepth = 24;
	class ScreenOrientation {
		constructor() {
			this.type = 'landscape-primary';
			this.angle = 0;
		}
	};
	screen.orientation = new ScreenOrientation();
	screen = vmCtx.r0zerox.proxy(screen, 'screen');
	vmCtx.r0zerox.setObjectTag(screen, 'Screen');
	vmCtx.context.screen = screen;
}

module.exports = initScreen;