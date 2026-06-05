function initCanvasElement (vmCtx) {
	const ctx = vmCtx.context;

	function CanvasRenderingContext2D () {
		this.canvas = null;
		this.fillStyle = '';
		this.strokeStyle = '';
		this.font = '10px sans-serif';
		this.textAlign = 'start';
		this.textBaseline = 'alphabetic';
		this.lineWidth = 1;
		this.lineCap = 'butt';
		this.lineJoin = 'miter';
		this.shadowColor = 'rgba(0,0,0,0)';
		this.shadowBlur = 0;
		this.shadowOffsetX = 0;
		this.shadowOffsetY = 0;
		this.globalAlpha = 1;
		this.globalCompositeOperation = 'source-over';
		this.imageSmoothingEnabled = true;
		this.webkitImageSmoothingEnabled = true;
		this.mozImageSmoothingEnabled = true;
		this.msImageSmoothingEnabled = true;
	}

	CanvasRenderingContext2D.prototype.save = function () { };
	CanvasRenderingContext2D.prototype.restore = function () { };
	CanvasRenderingContext2D.prototype.scale = function () { };
	CanvasRenderingContext2D.prototype.rotate = function () { };
	CanvasRenderingContext2D.prototype.translate = function () { };
	CanvasRenderingContext2D.prototype.transform = function () { };
	CanvasRenderingContext2D.prototype.setTransform = function () { };
	CanvasRenderingContext2D.prototype.resetTransform = function () { };

	CanvasRenderingContext2D.prototype.beginPath = function () { };
	CanvasRenderingContext2D.prototype.moveTo = function () { };
	CanvasRenderingContext2D.prototype.lineTo = function () { };
	CanvasRenderingContext2D.prototype.quadraticCurveTo = function () { };
	CanvasRenderingContext2D.prototype.bezierCurveTo = function () { };
	CanvasRenderingContext2D.prototype.arcTo = function () { };
	CanvasRenderingContext2D.prototype.rect = function () { };
	CanvasRenderingContext2D.prototype.arc = function () { };
	CanvasRenderingContext2D.prototype.ellipse = function () { };
	CanvasRenderingContext2D.prototype.closePath = function () { };

	CanvasRenderingContext2D.prototype.fill = function () { };
	CanvasRenderingContext2D.prototype.stroke = function () { };
	CanvasRenderingContext2D.prototype.clip = function () { };
	CanvasRenderingContext2D.prototype.isPointInPath = function () { return false; };
	CanvasRenderingContext2D.prototype.isPointInStroke = function () { return false; };

	CanvasRenderingContext2D.prototype.fillRect = function () { };
	CanvasRenderingContext2D.prototype.strokeRect = function () { };
	CanvasRenderingContext2D.prototype.clearRect = function () { };

	CanvasRenderingContext2D.prototype.fillText = function () { };
	CanvasRenderingContext2D.prototype.strokeText = function () { };
	CanvasRenderingContext2D.prototype.measureText = function () {
		return {
			width: 0, actualBoundingBoxLeft: 0, actualBoundingBoxRight: 0,
			actualBoundingBoxAscent: 0, actualBoundingBoxDescent: 0,
			alphabeticBaseline: 0, emHeightAscent: 0, emHeightDescent: 0
		};
	};

	CanvasRenderingContext2D.prototype.createLinearGradient = function () {
		return { addColorStop: function () { } };
	};
	CanvasRenderingContext2D.prototype.createRadialGradient = function () {
		return { addColorStop: function () { } };
	};
	CanvasRenderingContext2D.prototype.createPattern = function () { return null; };

	CanvasRenderingContext2D.prototype.createImageData = function () { return {}; };
	CanvasRenderingContext2D.prototype.getImageData = function () { return { data: new Uint8ClampedArray(0) }; };
	CanvasRenderingContext2D.prototype.putImageData = function () { };

	CanvasRenderingContext2D.prototype.drawImage = function () { };
	CanvasRenderingContext2D.prototype.createSVGImage = function () { };

	CanvasRenderingContext2D.prototype.getContextAttributes = function () {
		return { alpha: true, desynchronized: false };
	};

	CanvasRenderingContext2D.prototype.isContextLost = function () { return false; };

	CanvasRenderingContext2D.prototype.toString = function () {
		return '[object CanvasRenderingContext2D]';
	};


	function HTMLCanvasElement () {
		this.width = 300;
		this.height = 150;
		this.tagName = 'CANVAS';
		this.nodeType = 1;
		this.nodeName = 'CANVAS';
		this.style = {};
		this.children = [];
		this.innerHTML = '';
		this.textContent = '';
	}

	HTMLCanvasElement.prototype.getContext = function (type) {
		if (type === '2d') {
			var ctx = new CanvasRenderingContext2D();
			ctx.canvas = this;
			return ctx;
		}
		return null;
	};

	HTMLCanvasElement.prototype.toString = function () {
		return '[object HTMLCanvasElement]';
	};

	HTMLCanvasElement.prototype.getBoundingClientRect = function () {
		return {
			top: 0, left: 0, right: this.width, bottom: this.height,
			width: this.width, height: this.height
		};
	};

	HTMLCanvasElement.prototype.toDataURL = function () {
		return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
	};

	HTMLCanvasElement.prototype.toBlob = function () { };

	HTMLCanvasElement.prototype.appendChild = function () { return this; };
	HTMLCanvasElement.prototype.removeChild = function () { return this; };
	HTMLCanvasElement.prototype.replaceChild = function () { return this; };
	HTMLCanvasElement.prototype.insertBefore = function () { return this; };
	HTMLCanvasElement.prototype.getAttribute = function () { return null; };
	HTMLCanvasElement.prototype.setAttribute = function () { };
	HTMLCanvasElement.prototype.removeAttribute = function () { };
	HTMLCanvasElement.prototype.hasAttribute = function () { return false; };
	HTMLCanvasElement.prototype.addEventListener = function () { };
	HTMLCanvasElement.prototype.removeEventListener = function () { };
	HTMLCanvasElement.prototype.dispatchEvent = function () { return true; };
	HTMLCanvasElement.prototype.click = function () { };
	HTMLCanvasElement.prototype.focus = function () { };
	HTMLCanvasElement.prototype.blur = function () { };


	ctx.HTMLCanvasElement = HTMLCanvasElement;
	ctx.CanvasRenderingContext2D = CanvasRenderingContext2D;
}

module.exports = initCanvasElement;