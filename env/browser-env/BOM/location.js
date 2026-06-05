function initLocation (vmCtx, config = {}) {
	const url = new URL(config.url || 'https://www.example.com/');

	const LocationProto = vmCtx.r0zerox.createProto('Location', {
		reload: function () { },
		replace: function () { },
		assign: function () { },
		toString: function () { return this.href; }
	});

	const location = vmCtx.r0zerox.proxy({
		href: url.href,
		protocol: url.protocol,
		host: url.host,
		hostname: url.hostname,
		port: url.port,
		pathname: url.pathname,
		search: url.search,
		hash: url.hash,
		origin: url.origin
	}, 'location');

	Object.setPrototypeOf(location, LocationProto);

	vmCtx.context.location = location;
}

module.exports = initLocation;