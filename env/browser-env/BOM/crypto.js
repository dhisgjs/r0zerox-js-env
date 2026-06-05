const crypto = require('crypto');

function initCrypto (vmCtx, config = {}) {
	const cryptoObj = vmCtx.r0zerox.proxy({
		getRandomValues (arr) {
			const buf = crypto.randomBytes(arr.length * arr.BYTES_PER_ELEMENT);
			const view = new Uint8Array(buf);
			for (let i = 0; i < arr.length; i++) {
				arr[i] = view[i];
			}
			return arr;
		},
		subtle: {
			digest: function () { return Promise.resolve(new ArrayBuffer(0)); },
			encrypt: function () { return Promise.resolve(new ArrayBuffer(0)); },
			decrypt: function () { return Promise.resolve(new ArrayBuffer(0)); },
			sign: function () { return Promise.resolve(new ArrayBuffer(0)); },
			verify: function () { return Promise.resolve(true); },
			generateKey: function () { return Promise.resolve({}); },
			deriveKey: function () { return Promise.resolve({}); },
			importKey: function () { return Promise.resolve({}); },
			exportKey: function () { return Promise.resolve({}); },
			wrapKey: function () { return Promise.resolve(new ArrayBuffer(0)); },
			unwrapKey: function () { return Promise.resolve({}); }
		}
	}, 'crypto');

	vmCtx.r0zerox.setObjectTag(cryptoObj, 'Crypto');

	vmCtx.context.crypto = cryptoObj;
}

module.exports = initCrypto;
