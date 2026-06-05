function initHTMLElement (vmCtx) {
	function getAttribute (name) {
		console.log('HTMLElement getAttribute', name);
		return null;
	}

	function setAttribute (name, value) {
		console.log('HTMLElement setAttribute', name, value);
	}

	function removeAttribute (name) {
		console.log('HTMLElement removeAttribute', name);
	}

	function hasAttribute (name) {
		return false;
	}

	function focus () {
		console.log('HTMLElement focus');
	}

	function blur () {
		console.log('HTMLElement blur');
	}

	function click () {
		console.log('HTMLElement click');
	}

	function scroll () { }
	function scrollTo () { }
	function scrollIntoView () { }
	function scrollBy () { }

	function addEventListener () { }
	function removeEventListener () { }
	function dispatchEvent () {
		return true;
	}

	function appendChild () {
		return null;
	}
	function removeChild () {
		return null;
	}
	function replaceChild () {
		return null;
	}
	function insertBefore () {
		return null;
	}
	function cloneNode () {
		return null;
	}
	function contains () {
		return false;
	}
	function getElementsByClassName () {
		return [];
	}
	function getElementsByTagName () {
		return [];
	}
	function querySelector () {
		return null;
	}
	function querySelectorAll () {
		return [];
	}
	function closest () {
		return null;
	}
	function matches () {
		return false;
	}

	vmCtx.r0zerox.setNative(getAttribute);
	vmCtx.r0zerox.setNative(setAttribute);
	vmCtx.r0zerox.setNative(removeAttribute);
	vmCtx.r0zerox.setNative(hasAttribute);
	vmCtx.r0zerox.setNative(focus);
	vmCtx.r0zerox.setNative(blur);
	vmCtx.r0zerox.setNative(click);
	vmCtx.r0zerox.setNative(addEventListener);
	vmCtx.r0zerox.setNative(removeEventListener);

	const createStyleObject = () => {
		return vmCtx.r0zerox.proxy({
			cssText: '',
			width: '',
			height: '',
			overflow: '',
			overflowX: '',
			overflowY: '',
			display: '',
			position: '',
			top: '',
			left: '',
			right: '',
			bottom: '',
			margin: '',
			marginTop: '',
			marginRight: '',
			marginBottom: '',
			marginLeft: '',
			padding: '',
			paddingTop: '',
			paddingRight: '',
			paddingBottom: '',
			paddingLeft: '',
			border: '',
			borderWidth: '',
			borderStyle: '',
			borderColor: '',
			borderTop: '',
			borderRight: '',
			borderBottom: '',
			borderLeft: '',
			borderRadius: '',
			background: '',
			backgroundColor: '',
			backgroundImage: '',
			backgroundPosition: '',
			backgroundSize: '',
			backgroundRepeat: '',
			color: '',
			font: '',
			fontSize: '',
			fontFamily: '',
			fontWeight: '',
			fontStyle: '',
			textAlign: '',
			textDecoration: '',
			textTransform: '',
			lineHeight: '',
			letterSpacing: '',
			wordSpacing: '',
			whiteSpace: '',
			opacity: '',
			visibility: '',
			zIndex: '',
			transform: '',
			transition: '',
			animation: '',
			cursor: '',
			pointerEvents: '',
			boxSizing: '',
			flex: '',
			flexDirection: '',
			justifyContent: '',
			alignItems: '',
			flexGrow: '',
			flexShrink: '',
			flexWrap: ''
		}, 'CSSStyleDeclaration');
	};

	const createClassList = () => {
		const classes = [];
		return vmCtx.r0zerox.proxy({
			length: 0,
			add () {
				console.log('classList add', Array.from(arguments));
			},
			remove () {
				console.log('classList remove', Array.from(arguments));
			},
			toggle () {
				console.log('classList toggle');
			},
			contains () {
				return false;
			},
			item () {
				return null;
			},
			toString () {
				return classes.join(' ');
			}
		}, 'DOMTokenList');
	};

	const createDataset = () => {
		return vmCtx.r0zerox.proxy({}, 'DOMStringMap');
	};

	const createNamedNodeMap = () => {
		return vmCtx.r0zerox.proxy([], 'NamedNodeMap');
	};

	const createDOMTokenList = () => {
		return vmCtx.r0zerox.proxy({
			length: 0,
			add () { },
			remove () { },
			toggle () { },
			contains () { return false; },
			item () { return null; },
			toString () { return ''; },
			value: ''
		}, 'DOMTokenList');
	};

	function createHTMLElement (tagName = 'DIV') {
		const style = createStyleObject();
		const classList = createClassList();

		return vmCtx.r0zerox.proxy({
			nodeType: 1,
			nodeName: tagName.toUpperCase(),
			tagName: tagName.toUpperCase(),

			id: '',
			className: '',
			classList: classList,

			textContent: '',
			innerText: '',
			innerHTML: '',
			outerHTML: '',

			style: style,
			dataset: createDataset(),
			attributes: createNamedNodeMap(),

			childElementCount: 0,
			children: [],
			firstElementChild: null,
			lastElementChild: null,
			nextElementSibling: null,
			previousElementSibling: null,
			firstChild: null,
			lastChild: null,
			nextSibling: null,
			previousSibling: null,
			parentElement: null,
			parentNode: null,

			offsetParent: null,
			offsetTop: 0,
			offsetLeft: 0,
			offsetWidth: 0,
			offsetHeight: 0,
			offsetX: 0,
			offsetY: 0,

			scrollTop: 0,
			scrollLeft: 0,
			scrollWidth: 0,
			scrollHeight: 0,

			clientTop: 0,
			clientLeft: 0,
			clientWidth: 0,
			clientHeight: 0,

			contentEditable: 'inherit',
			isContentEditable: false,
			spellcheck: true,
			tabIndex: -1,
			title: '',
			lang: '',
			dir: '',
			draggable: false,
			hidden: false,
			disabled: false,
			readonly: false,
			accessKey: '',
			autocapitalize: '',
			inert: false,

			name: '',
			value: '',
			type: '',
			src: '',
			alt: '',
			href: '',
			target: '_self',
			rel: '',
			relList: createDOMTokenList(),
			download: '',
			ping: '',

			checked: false,
			indeterminate: false,
			selected: false,
			defaultSelected: false,

			multiple: false,
			files: [],
			accept: '',
			maxLength: -1,
			minLength: -1,
			required: false,
			validity: {
				valid: true,
				valueMissing: false,
				typeMismatch: false,
				patternMismatch: false,
				tooLong: false,
				tooShort: false,
				rangeUnderflow: false,
				rangeOverflow: false,
				stepMismatch: false,
				badInput: false,
				customError: false
			},
			validationMessage: '',
			willValidate: true,
			width: 0,
			height: 0,
			naturalWidth: 0,
			naturalHeight: 0,
			complete: true,
			async: false,
			defer: false,

			getAttribute,
			setAttribute,
			removeAttribute,
			hasAttribute,

			focus,
			blur,
			click,

			scroll,
			scrollTo,
			scrollIntoView,
			scrollBy,

			addEventListener,
			removeEventListener,
			dispatchEvent,

			appendChild,
			removeChild,
			replaceChild,
			insertBefore,
			cloneNode,
			contains,

			getElementsByClassName,
			getElementsByTagName,
			querySelector,
			querySelectorAll,
			closest,
			matches,

			getBoundingClientRect () {
				return {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					top: 0,
					left: 0,
					bottom: 0,
					right: 0
				};
			},

			getClientRects () {
				return [];
			},

			scrollIntoViewIfNeeded () { },

			checkValidity () {
				return true;
			},

			reportValidity () {
				return true;
			},

			setCustomValidity () { },

			blur () {
				console.log('HTMLElement blur');
			},

			click () {
				console.log('HTMLElement click');
			},

			toString () {
				return `[object HTMLElement]`;
			}
		}, 'HTMLElement');
	}

	vmCtx.r0zerox.setNative(createHTMLElement);
	vmCtx.r0zerox.setObjectTag(createHTMLElement, 'HTMLUnknownElement');

	vmCtx.context.HTMLElement = createHTMLElement;
}

module.exports = initHTMLElement;