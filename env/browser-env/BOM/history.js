function initHistory (vmCtx, config = {}) {
	const HistoryProto = vmCtx.r0zerox.createProto('History', {
		back: function () { },
		forward: function () { },
		go: function () { },
		pushState: function () { },
		replaceState: function () { }
	});

	const history = vmCtx.r0zerox.proxy({
		length: 1,
		scrollRestoration: 'auto',
		state: null
	}, 'history');

	Object.setPrototypeOf(history, HistoryProto);

	vmCtx.context.history = history;
}

module.exports = initHistory;