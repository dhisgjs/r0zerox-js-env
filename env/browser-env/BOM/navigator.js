function initNavigator (vmCtx, config = {}) {
	const ctx = vmCtx.context;

	const NavigatorProto = vmCtx.r0zerox.createProto('Navigator', {
		constructor: function () { },
		javaEnabled: function () { return false; },
		cookieEnabled: true,
		doNotTrack: 'unspecified',
		hardwareConcurrency: config.hardwareConcurrency || 4,
		maxTouchPoints: config.maxTouchPoints || 0,
		msMaxTouchPoints: config.maxTouchPoints || 0,
		msManipulationViewsEnabled: true,
		webdriver: false,
		webkitPersistentStorageNotation: function () { return Promise.resolve(); }
	});

	const navigator = Object.create(NavigatorProto);
	navigator.appCodeName = 'Mozilla';
	navigator.appName = 'Netscape';
	navigator.appVersion = config.appVersion || '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
	navigator.platform = config.platform || 'Win32';
	navigator.product = 'Gecko';
	navigator.productSub = '20030107';
	navigator.userAgent = config.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
	navigator.language = config.language || 'zh-CN';
	navigator.languages = config.languages || ['zh-CN', 'zh', 'en'];
	navigator.onLine = true;
	navigator.vendor = config.vendor || 'Google Inc.';
	navigator.vendorSub = '';
	navigator.deviceMemory = config.deviceMemory || 8;
	navigator.connection = {
		effectiveType: '4g',
		downlink: 10,
		rtt: 50
	};
	navigator.plugins = new ctx.PluginArray();
	navigator.mimeTypes = new ctx.MimeTypeArray();

	const win = vmCtx.r0zerox.proxy(navigator, 'navigator');
	vmCtx.r0zerox.setObjectTag(win, 'Navigator');

	ctx.navigator = win;
}

module.exports = initNavigator;