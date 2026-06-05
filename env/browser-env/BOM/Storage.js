function initStorage (vmCtx, config = {}) {
	const StorageProto = vmCtx.r0zerox.createProto('Storage', {
		getItem: function (key) { return this._data[key] || null; },
		setItem: function (key, value) { this._data[key] = String(value); },
		removeItem: function (key) { delete this._data[key]; },
		clear: function () { this._data = {}; },
		key: function (index) { return Object.keys(this._data)[index] || null; }
	});

	// localStorage
	const localStorage = vmCtx.r0zerox.proxy({ _data: {} }, 'localStorage');
	Object.defineProperty(localStorage, 'length', {
		get: function () { return Object.keys(this._data).length; },
		configurable: true
	});
	Object.setPrototypeOf(localStorage, StorageProto);

	// sessionStorage
	const sessionStorage = vmCtx.r0zerox.proxy({ _data: {} }, 'sessionStorage');
	Object.defineProperty(sessionStorage, 'length', {
		get: function () { return Object.keys(this._data).length; },
		configurable: true
	});
	Object.setPrototypeOf(sessionStorage, StorageProto);

	vmCtx.context.localStorage = localStorage;
	vmCtx.context.sessionStorage = sessionStorage;
}

module.exports = initStorage;