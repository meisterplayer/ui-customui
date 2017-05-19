module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BaseElement {
    constructor(meister) {
        this.meister = meister;
        this.isMobile = this.meister.browser.isMobile;

        this.element = null;

        this.eventStore = [];

        if (this.onItemLoaded) {
            this.on('itemLoaded', this.onItemLoaded.bind(this));
        }

        if (this.onItemUnloaded) {
            this.on('itemUnloaded', this.onItemUnloaded.bind(this));
        }
    }

    on(hook, handler) {
        this.eventStore.push(...this.meister.on(hook, handler, this.constructor.name));
    }

    one(hook, block, handler) {
        this.eventStore.push(this.meister.one(hook, block, handler, this.constructor.name));
    }

    classListAdd(element, ...classNames) {
        classNames.forEach(className => {
            element.classList.add(className);
        });

        if (this.isMobile) {
            element.classList.add('pf-mobile');
        }
    }

    classListRemove(element, ...classNames) {
        classNames.forEach(className => {
            element.classList.remove(className);
        });
    }

    getNode() {
        return this.element;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseElement);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
* @constant
* @memberof module:CustomUi
* @type {String}
* @default
*/
const CUSTOM_UI_EVENT_PREFIX = 'ui';
/* harmony export (immutable) */ __webpack_exports__["b"] = CUSTOM_UI_EVENT_PREFIX;


/**
 * @constant
 * @memberof module:CustomUi
 * @type {String}
 * @default
 */
const MEISTER_DATA_EVENTS_ATTR = 'data-mstr-events';
/* harmony export (immutable) */ __webpack_exports__["a"] = MEISTER_DATA_EVENTS_ATTR;


/**
* @constant
* @memberof module:CustomUi
* @type {String}
* @default
 */
const MEISTER_DATA_STANDARD_ATTR = 'data-mstr-standard';
/* harmony export (immutable) */ __webpack_exports__["c"] = MEISTER_DATA_STANDARD_ATTR;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extractNodesWithSelector;
/* harmony export (immutable) */ __webpack_exports__["b"] = replaceNodeWith;
/**
 * Returns a list of all child nodes that match the passed selector.
 * @memberof module:CustomUi
 * @param  {HTMLElement} rootNode The root node from which to search for relevant nodes.
 * @return {HTMLElement[]}        Array with nodes that match the selector.
 */
function extractNodesWithSelector(rootNode, selector) {
  return Array.prototype.slice.call(rootNode.querySelectorAll(selector));
}

/**
 * Replace one node with another node.
 * @memberof module:CustomUi
 * @param  {HTMLElement} oldNode Node to be replaced.
 * @param  {HTMLElement} newNode New node to insert.
 * @return {?HTMLElement}        Old node, or null if replacing was not possible.
 */
function replaceNodeWith(oldNode, newNode) {
  if (!oldNode.parentNode) {
    return null;
  }

  return oldNode.parentNode.replaceChild(newNode, oldNode);
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_js_CustomUi__ = __webpack_require__(4);


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__src_js_CustomUi__["a" /* default */]);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_event_node_functions__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_standard_node_functions__ = __webpack_require__(7);
/** @module CustomUi */



/**
 * Plugin that can be used to supply your own HTMLElements that make up the ui. By specifying
 * data-attributes you can customize the functionality of the ui.
 * @memberof module:CustomUi
 */
class CustomUi extends Meister.Ui {
    /**
     * Create a new CustomUi.
     * @memberof module:CustomUi
     * @param {Object} config Configuration for the plugin.
     * @param {Meister} meister Meister instance which is instantiating a new CustomUi.
     */
    constructor(config, meister) {
        super(config, meister);

        if (!this.config.ui) {
            console.error(`${CustomUi.pluginName}: No ui node or url defined, plugin will not load.`);
            // HACK: This overrides constructor behaviour and makes it not return an instance...
            return [];
        }

        if (this.meister.utils.isDOMNode(this.config.ui)) {
            this.element = this.config.ui;
            this.processTemplate();
        } else {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', this.config.ui);
            xhr.responseType = 'document';
            xhr.addEventListener('load', this.onTemplateRequestSuccess.bind(this), false);
            xhr.addEventListener('error', this.onTemplateRequestError.bind(this), false);
            xhr.send();
        }

        // Consistent return.
        return this;
    }

    /**
     * Name of the plugin that is used for registering it.
     * @return {String}
     */
    static get pluginName() {
        return 'CustomUi';
    }

    /**
     * Check the response status, and on a succes extract the first node to use as the custom ui.
     * @param {ProgressEvent} loadEvent Event object from the XMLHttpRequest.
     */
    onTemplateRequestSuccess(loadEvent) {
        if (loadEvent.target.status < 200 || loadEvent.target.status >= 400) {
            this.onTemplateRequestError(loadEvent);
            return;
        }

        this.element = loadEvent.target.response.activeElement.firstChild;
        this.processTemplate();
        // Force a redraw of the ui.
        this.draw();
        // Notify user that the remote template has been parsed and drawn successfully.
        if (this.config.remoteTemplateReady) {
            this.config.remoteTemplateReady();
        }
    }

    /**
     * Log the XMLHttpRequest to the console.
     * @param {ProgressEvent} loadEvent Event object from the XMLHttpRequest.
     */
    onTemplateRequestError(loadEvent) {
        console.error(`${CustomUi.pluginName}: error loading the template. `, loadEvent.target);
    }

    /**
     * Replace marked nodes with their StandardUi equivalents, and register events on the specified nodes.
     */
    processTemplate() {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_standard_node_functions__["a" /* extractStandardNodes */])(this.element).forEach(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_standard_node_functions__["b" /* createLoadStandardElement */])(this.meister, this.config.standard));
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_event_node_functions__["a" /* extractEventNodes */])(this.element).forEach(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_event_node_functions__["b" /* createRegisterDataEvents */])(this.meister, this.config.registeredCallback));
    }

    /**
     * Insert the Ui into the DOM.
     */
    draw() {
        if (!this.element) {
            return;
        }

        this.controlsWrapper.appendChild(this.element);
    }
}

Meister.registerPlugin(CustomUi.pluginName, CustomUi);
/* harmony default export */ __webpack_exports__["a"] = (CustomUi);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * An event used as a callback arguments in custom ui events proxying DOM events.
 * @typedef {Object} module:CustomUi~CustomUiEvent
 * @property {Meister} meister - Meister instance from which the event originated.
 * @property {HTMLElement} domNode - Node from which the DOM event originated.
 * @property {String} eventName - The name of the event that originated from meister.
 * @property {String} eventType - The name of the DOM event.
 * @property {Event} domEvent - The original DOM event that was triggered.
 */
class CustomUiEvent {
  /**
   * Create a CustomUiEvent.
   * @memberof module:CustomUi
   * @param {Meister} meister Meister instance from which the event originated.
   * @param {HTMLElement} domNode Node from which the DOM event originated.
   * @param {String} eventName The name of the event that originated from meister.
   * @param {String} eventType The name of the DOM event.
   * @param {Event} domEvent The original DOM event that was triggered.
   */
  constructor(meister, domNode, eventName, eventType, domEvent) {
    this.eventName = eventName;
    this.eventType = eventType;
    this.event = domEvent;
    this.meister = meister;
    this.element = domNode;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CustomUiEvent;


/**
 * An event used as a callback argument when all listeners have been attached to a custom DOM element.
 * @typedef {Object} module:CustomUi~CustomUiElementRegisteredEvent
 * @property {Meister} meister - Meister instance from which the event originated.
 * @property {HTMLElement} domNode - Node on which the events were registered.
 * @property {String[]} events - Array with all the events that were registered on the HTMLElement.
 * @property {String} id - The id of the node on which the events were registered.
 */
class CustomUiElementRegisteredEvent {
  /**
   * Create a CustomUiElementRegisteredEvent.
   * @memberof module:CustomUi
   * @param {Meister} meister Meister instance from which the event originated.
   * @param {HTMLElement} domNode Node on which the events were registered.
   * @param {String[]} events Array with all the events that were registered on the HTMLElement.
   */
  constructor(meister, domNode, events) {
    this.meister = meister;
    this.element = domNode;
    this.events = events;
    this.id = domNode.id;
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = CustomUiElementRegisteredEvent;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extractEventNodes;
/* harmony export (immutable) */ __webpack_exports__["b"] = createRegisterDataEvents;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_classes__ = __webpack_require__(5);




/**
 * Returns a list of all child nodes that have meister event data properties. Also includes the root node
 * should it have the property.
 * @memberof module:CustomUi
 * @param  {HTMLElement} rootNode The root node from which to search for relevant nodes.
 * @return {HTMLElement[]}        Array with nodes that have the meister event data property.
 */
function extractEventNodes(rootNode) {
    const nodeArray = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utilities__["a" /* extractNodesWithSelector */])(rootNode, `[${__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* MEISTER_DATA_EVENTS_ATTR */]}]`);

    if (rootNode.getAttribute(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* MEISTER_DATA_EVENTS_ATTR */])) {
        return nodeArray.concat(rootNode);
    }

    return nodeArray;
}

/**
 * Extracts individual strings from a single comma separated string while trimming whitespace and
 * filtering just whitespace entries.
 * @memberof module:CustomUi
 * @param  {String} eventString Comma separated string of event names.
 * @return {String[]}           Array with event names.
 */
function extractEvents(eventString) {
    return eventString.split(',').filter(eventName => !!eventName) // filter empty entries.
    .map(eventName => eventName.trim()) // remove leading/trailing whitespace.
    .filter(eventName => !!eventName); // remove entries that were only spaces.
}

/**
 * Callback that is called after all events are registered to an HTMLElement.
 * @callback module:CustomUi~onElementRegistered
 * @param {module:CustomUi~CustomUiElementRegisteredEvent} customUiElementRegisteredEvent
 */

/**
 * Create a function that can be used to map dom events to meister events for html nodes.
 * @memberof module:CustomUi
 * @param  {Meister} meister      Meister instance to be used in the event callbacks.
 * @param  {module:CustomUi~onElementRegistered} [onElementRegistered=()=>{}] Callback to be used when all events have been registered on an HTMLElement.
 * @return {module:CustomUi~registerDataEvents} Function that can be used to register events to an HTMLElement.
 */
function createRegisterDataEvents(meister, onElementRegistered = () => {}) {
    /**
     * Map events in the MEISTER_DATA_EVENTS_ATTR data attribute to meister events and call a
     * callback when done.
     * @function module:CustomUi~registerDataEvents
     * @param  {HTMLElement} domNode Node with data-mstr-events that need to be mapped to meister custom ui events.
     */
    return function registerDataEvents(domNode) {
        const rawAttributes = domNode.getAttribute(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* MEISTER_DATA_EVENTS_ATTR */]);
        if (!rawAttributes) {
            return;
        }

        const eventsArray = extractEvents(rawAttributes);
        if (eventsArray.length < 1) {
            return;
        }

        const domNodeId = domNode.id ? `${domNode.id}:` : '';
        const handleName = `${__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CUSTOM_UI_EVENT_PREFIX */]}:${domNodeId}`;

        eventsArray.forEach(eventName => {
            const meisterEventName = `${handleName}${eventName}`;
            domNode.addEventListener(eventName, e => {
                meister.trigger(meisterEventName, new __WEBPACK_IMPORTED_MODULE_2__event_classes__["a" /* CustomUiEvent */](meister, domNode, meisterEventName, eventName, e));
            });
        });

        onElementRegistered(new __WEBPACK_IMPORTED_MODULE_2__event_classes__["b" /* CustomUiElementRegisteredEvent */](meister, domNode, eventsArray));
    };
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extractStandardNodes;
/* harmony export (immutable) */ __webpack_exports__["b"] = createLoadStandardElement;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__standard_createStandardElement__ = __webpack_require__(22);




/**
 * Returns a list of all child nodes that have meister standard data properties.
 * @memberof module:CustomUi
 * @param  {HTMLElement} rootNode The root node from which to search for relevant nodes.
 * @return {HTMLElement[]}        Array with nodes that have the meister standard data property.
 */
function extractStandardNodes(rootNode) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utilities__["a" /* extractNodesWithSelector */])(rootNode, `[${__WEBPACK_IMPORTED_MODULE_0__constants__["c" /* MEISTER_DATA_STANDARD_ATTR */]}]`);
}

/**
 * Removes trailing/leading whitespace from the element name and makes it lowercase.
 * @memberof module:CustomUi
 * @param  {String} [elementName=''] Name of the standard element from the HTML element.
 * @return {String}             Formatted elementName.
 */
function formatElementName(elementName = '') {
    return elementName.trim().toLowerCase();
}

/**
 * Create a function that can be used to replace nodes with Standard Ui elements.
 * @memberof module:CustomUi
 * @param  {Meister} meister     Meister instance to be used in the event callbacks.
 * @param  {Object} [config={}]  StandardUi config to be used when creating standard components.
 * @return {module:CustomUi~loadStandardElement} Function that can be used to replace nodes with Standard Ui elements.
 */
function createLoadStandardElement(meister, config = {}) {
    /**
     * Replace nodes with the Standard Ui element specified in MEISTER_DATA_STANDARD_ATTR.
     * @function module:CustomUi~loadStandardElement
     * @param  {HTMLElement} domNode Node with data-mstr-standard that should be replaced with a Standard Ui element.
     */
    return function loadStandardElement(domNode) {
        const elementName = formatElementName(domNode.getAttribute(__WEBPACK_IMPORTED_MODULE_0__constants__["c" /* MEISTER_DATA_STANDARD_ATTR */]));
        if (!elementName) {
            return;
        }

        const standardElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__standard_createStandardElement__["a" /* default */])(meister, config, elementName);
        if (!standardElement) {
            console.error(`No standard element with name '${elementName}'`);
        }

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utilities__["b" /* replaceNodeWith */])(domNode, standardElement.getNode());
    };
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseElement__ = __webpack_require__(0);


class CaptionsButton extends __WEBPACK_IMPORTED_MODULE_0__BaseElement__["a" /* default */] {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-right', 'pf-ui-element-active');
        this.classListAdd(this.element, 'pf-icon', 'pf-icon_icCc');
        this.classListAdd(this.element, 'pf-ui-element-hidden');

        this.captionSelector = document.createElement('div');
        this.classListAdd(this.captionSelector, 'pf-quality-selector', 'hidden');

        this.meister.controlsWrapper.appendChild(this.captionSelector);

        this.element.addEventListener('click', this.onClick.bind(this));

        this.captions = null;
        this.on('itemLoaded', this.onItemLoaded.bind(this));

        // Store this eventfunction in the instance for easier removal.
        this.hide = () => {
            this.classListAdd(this.captionSelector, 'hidden');
            document.body.removeEventListener('click', this.hide);
        };
    }

    onItemUnloaded() {
        this.captionSelector.innerHTML = '';
        this.captions = null;

        this.classListAdd(this.element, 'pf-ui-element-hidden');
    }

    onClick(e) {
        // TODO: Perhaps do this later?
        e.stopPropagation();

        // Show/hide menu when the button is clicked.
        if (!e.target.hasAttribute('lang')) {
            if (this.captionSelector.classList.contains('hidden')) {
                this.show();
            } else {
                this.hide();
            }

            return;
        }

        // Element has attribute lang, must be a language option
        const newLang = e.target.getAttribute('lang');
        this.selectLang(newLang);
        this.hide();
    }

    show() {
        this.classListRemove(this.captionSelector, 'hidden');
        document.body.addEventListener('click', this.hide);
    }

    onItemLoaded(e) {
        if (!e.item || !e.item.captions) return;

        // Slice to make a copy of the array;
        if (!Array.isArray(e.item.captions)) {
            this.captions = [e.item.captions];
        } else {
            this.captions = e.item.captions.slice(0).sort((a, b) => {
                const titleA = a.title.toUpperCase();
                const titleB = b.title.toUpperCase();
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;

                return 0;
            });
        }

        // Add an option to turn cc off.
        this.captions.push({ title: this.meister.Localization.get('NONE'), lang: 'none' });

        this.classListRemove(this.element, 'pf-ui-element-hidden');

        this.captions.forEach(caption => {
            const language = caption.title;
            const code = caption.lang;
            caption.option = this.createOption(language, code);
        });

        this.classListRemove(this.element, 'pf-ui-element-hidden');
    }

    createOption(language, code) {
        const languageOption = document.createElement('div');
        languageOption.classList.add('pf-quality-option');
        languageOption.classList.add('pf-ui-element-active');

        languageOption.textContent = language.charAt(0).toUpperCase() + language.toLowerCase().slice(1);

        languageOption.setAttribute('lang', code);

        languageOption.selected = document.createElement('div');
        languageOption.selected.classList.add('pf-quality-option-select');
        languageOption.selected.classList.add('pf-icon');
        // Check for mobile.
        if (this.isMobile) languageOption.selected.classList.add('pf-mobile');
        languageOption.appendChild(languageOption.selected);

        this.captionSelector.appendChild(languageOption);

        languageOption.addEventListener('click', e => this.onClick(e));

        return languageOption;
    }

    selectLang(languageCode) {
        this.captions.forEach(caption => {
            caption.option.selected.classList.remove('pf-icon_icCheck');
        });

        if (languageCode === 'none') {
            this.meister.trigger('requestCaptions', { newLanguage: 'none' });
            return;
        }

        const newCaption = this.captions.find(caption => caption.lang === languageCode);

        newCaption.option.selected.classList.add('pf-icon_icCheck');
        this.meister.trigger('requestCaptions', newCaption);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (CaptionsButton);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseElement__ = __webpack_require__(0);


class FullscreenButton extends __WEBPACK_IMPORTED_MODULE_0__BaseElement__["a" /* default */] {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');

        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-right');
        if (this.meister.config.audioOnly) {
            this.classListAdd(this.element, 'pf-ui-element-inactive');
        } else {
            this.classListAdd(this.element, 'pf-ui-element-active');
        }

        this.classListAdd(this.element, 'pf-icon', 'pf-icon_icFullscreen');

        this.element.addEventListener('click', () => this.toggleFullscreen());

        this.on('playerFullscreen', () => this.toggleIcon());
    }

    toggleIcon() {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;

        if (fullscreenElement) {
            this.classListAdd(this.element, 'pf-icon_icFullscreenExit');
            this.classListRemove(this.element, 'pf-icon_icFullscreen');
        } else {
            this.classListAdd(this.element, 'pf-icon_icFullscreen');
            this.classListRemove(this.element, 'pf-icon_icFullscreenExit');
        }
    }

    toggleFullscreen() {
        if (this.meister.isFullscreen) {
            this.meister.cancelFullscreen();
        } else {
            this.meister.requestFullscreen();
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (FullscreenButton);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseElement__ = __webpack_require__(0);


class PlayButton extends __WEBPACK_IMPORTED_MODULE_0__BaseElement__["a" /* default */] {
    constructor(meister, config, type = 'normal') {
        super(meister);

        this.config = config;
        this.type = type;

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-left', 'pf-ui-element-active');

        this.isLive = false;

        // Default
        this.classListAdd(this.element, 'pf-icon');
        this.classListAdd(this.element, 'pf-icon_icPlay');

        // Register event listeners
        this.element.addEventListener('click', () => this.onClick());

        this.on('itemTimeInfo', timeInfo => this.onItemTimeInfo(timeInfo));
        this.on('playerPlay', () => this.toggleIcon());
        this.on('playerPause', () => this.toggleIcon());
        this.on('itemLoaded', () => this.toggleIcon());
    }

    onItemTimeInfo(timeInfo) {
        this.isLive = timeInfo.isLive;

        if (this.isLive && this.config.disablePauseWithLive && this.meister.playing && this.type === 'normal') {
            this.toggleIcon();
        }
    }

    onClick() {
        if (this.meister.playing) {
            this.meister.pause(true);
        } else {
            this.meister.play(true);
        }
    }

    toggleIcon() {
        if (this.isLive && this.config.disablePauseWithLive && this.meister.playing && this.type === 'normal') {
            this.classListRemove(this.element, 'pf-icon_icPlay');
            this.classListRemove(this.element, 'pf-icon_icPause');
            return;
        }

        if (this.meister.playing) {
            this.classListAdd(this.element, 'pf-icon_icPause');
            this.classListRemove(this.element, 'pf-icon_icPlay');
        } else {
            this.classListRemove(this.element, 'pf-icon_icPause');
            this.classListAdd(this.element, 'pf-icon_icPlay');
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (PlayButton);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseElement__ = __webpack_require__(0);


class PlaylistButtons extends __WEBPACK_IMPORTED_MODULE_0__BaseElement__["a" /* default */] {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-ui-wrapper-left');
        this.classListAdd(this.element, 'pf-ui-element-hidden');

        this.prevButton = document.createElement('div');
        this.classListAdd(this.prevButton, 'pf-ui-element');
        this.classListAdd(this.prevButton, 'pf-icon', 'pf-icon_icPrev');

        this.nextButton = document.createElement('div');
        this.classListAdd(this.nextButton, 'pf-ui-element');
        this.classListAdd(this.nextButton, 'pf-icon', 'pf-icon_icNext');

        this.prevButton.addEventListener('click', () => this.meister.trigger('playlistPrevious'));
        this.nextButton.addEventListener('click', () => this.meister.trigger('playlistNext'));

        this.element.appendChild(this.prevButton);
        this.element.appendChild(this.nextButton);

        this.on('playlistInfo', playlistInfo => this.onPlaylistInfo(playlistInfo));
    }

    onPlaylistInfo(playlistInfo) {
        // Reset the styles on the buttons.
        this.classListRemove(this.prevButton, 'pf-ui-element-inactive');
        this.classListRemove(this.nextButton, 'pf-ui-element-inactive');

        // Don't show playlist controls when there is no playlist.
        if (playlistInfo.length <= 1) {
            this.classListAdd(this.element, 'pf-ui-element-hidden');
            return;
        }

        // It's the first item, so can't go back.
        if (playlistInfo.currentIndex === 0) {
            this.classListAdd(this.prevButton, 'pf-ui-element-inactive');
            this.classListAdd(this.nextButton, 'pf-ui-element-active');
        }

        // It's the last item, so can't skip to the next item.
        if (playlistInfo.currentIndex >= playlistInfo.length - 1) {
            this.classListAdd(this.prevButton, 'pf-ui-element-active');
            this.classListAdd(this.nextButton, 'pf-ui-element-inactive');
        }

        // Show the playlist buttons.
        this.classListRemove(this.element, 'pf-ui-element-hidden');
    }
}

/* harmony default export */ __webpack_exports__["a"] = (PlaylistButtons);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = prepareBitrateOption;
/* harmony export (immutable) */ __webpack_exports__["b"] = selectBitrate;
function prepareBitrateOption(element, bitrate, index, transform) {
    const qualityOption = element;

    if (bitrate === 'auto') {
        qualityOption.textContent = bitrate;
    } else {
        qualityOption.textContent = transform(bitrate);
    }

    qualityOption.setAttribute('index', index);
}

function selectBitrate(bitrates, index, silent) {
    bitrates.forEach(bitrate => {
        if (bitrate.index === index) {
            bitrate.option.selected.classList.add('pf-icon_icCheck');
        } else {
            bitrate.option.selected.classList.remove('pf-icon_icCheck');
        }
    });

    return silent ? null : index;
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseElement__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bitrate__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resolution__ = __webpack_require__(14);





const RESOLUTION = 0;
const BITRATE = 1;

class QualityButton extends __WEBPACK_IMPORTED_MODULE_0__BaseElement__["a" /* default */] {
    constructor(meister, config) {
        super(meister);

        this.config = config;
        this.element = document.createElement('div');

        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-right', 'pf-ui-element-active');
        this.classListAdd(this.element, 'pf-icon', 'pf-icon_icHd');
        this.classListAdd(this.element, 'pf-ui-element-hidden');

        this.qualitySelector = document.createElement('div');
        this.classListAdd(this.qualitySelector, 'pf-quality-selector', 'hidden');

        this.meister.controlsWrapper.appendChild(this.qualitySelector);

        this.element.addEventListener('click', e => this.onClick(e));

        this.bitrates = null;
        this.on('itemBitrates', info => this.onItemBitrates(info));

        if (Array.isArray(this.config.qualityMapping)) {
            this.qualityMappingMode = true;
            this.qualityMapping = this.config.qualityMapping.map(__WEBPACK_IMPORTED_MODULE_2__resolution__["a" /* expandQualityMapping */]);
        }

        // Store this eventfunction in the instance for easier removal.
        this.hide = () => {
            this.classListAdd(this.qualitySelector, 'hidden');
            document.body.removeEventListener('click', this.hide);
        };
    }

    onItemUnloaded() {
        // Clear any previous bitrates that were present.
        this.qualitySelector.innerHTML = '';
        this.bitrates = null;

        this.classListAdd(this.element, 'pf-ui-element-hidden');
    }

    onClick(e) {
        // TODO: Perhaps do this later?
        e.stopPropagation();

        // Show/hide menu when the button is clicked.
        if (!e.target.hasAttribute('index') && !e.target.mapping) {
            if (this.qualitySelector.classList.contains('hidden')) {
                this.show();
            } else {
                this.hide();
            }

            return;
        }

        // Element has attribute index, must be a bitrate option
        if (e.target.hasAttribute('index')) {
            const newBitrateIndex = parseInt(e.target.getAttribute('index'), 10);
            this.selectOption(newBitrateIndex);
        }

        if (e.target.mapping) {
            const newBitrateIndex = parseInt(e.target.mapping.bitrates[0].bitrateIndex, 10);
            this.selectOption(newBitrateIndex);
        }

        this.hide();
    }

    show() {
        this.classListRemove(this.qualitySelector, 'hidden');
        document.body.addEventListener('click', this.hide);
    }

    onItemBitrates(info) {
        info.bitrates.sort((a, b) => b.bitrate - a.bitrate);
        this.bitrates = info.bitrates;
        this.classListRemove(this.element, 'pf-ui-element-hidden');

        if (this.qualityMappingMode) {
            this.bitrates = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__resolution__["b" /* prepareResolutionMapping */])(this.bitrates, this.qualityMapping);
            this.qualityMapping.forEach(mapping => {
                if (mapping.bitrates.length < 1) {
                    if (this.meister.config.debug) console.error('No bitrates available for this mapping', mapping);
                } else {
                    // eslint-disable-next-line
                    mapping.option = this.createOption({
                        type: RESOLUTION,
                        mapping
                    });
                }
            });
        } else {
            this.bitrates.forEach(bitrateInfo => {
                // A bitrate of 0 means auto quality.
                const bitrate = bitrateInfo.bitrate === 0 ? 'auto' : bitrateInfo.bitrate;
                // eslint-disable-next-line
                bitrateInfo.option = this.createOption({
                    type: BITRATE,
                    bitrate,
                    index: bitrateInfo.index
                });
            });
        }
        this.selectOption(info.currentIndex, true);
    }

    createOption(optionOpts) {
        const qualityOption = document.createElement('div');
        qualityOption.classList.add('pf-quality-option');
        qualityOption.classList.add('pf-ui-element-active');

        // When no index is passed we're dealing with resolution mapping.
        if (optionOpts.type === BITRATE) {
            const transform = this.config.bitrateToResolution ? this.config.bitrateToResolution : this.meister.utils.bitrateToResolution;

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__bitrate__["a" /* prepareBitrateOption */])(qualityOption, optionOpts.bitrate, optionOpts.index, transform);
        } else if (optionOpts.type === RESOLUTION) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__resolution__["c" /* prepareResolutionOption */])(qualityOption, optionOpts.mapping);
        }

        qualityOption.selected = document.createElement('div');
        qualityOption.selected.classList.add('pf-quality-option-select');
        qualityOption.selected.classList.add('pf-icon');
        // Check for mobile.
        if (this.isMobile) qualityOption.selected.classList.add('pf-mobile');
        qualityOption.appendChild(qualityOption.selected);

        this.qualitySelector.appendChild(qualityOption);

        qualityOption.addEventListener('click', e => this.onClick(e));

        return qualityOption;
    }

    selectOption(index, silent = false) {
        let bitrateIndex = null;

        if (this.qualityMappingMode) {
            bitrateIndex = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__resolution__["d" /* selectResolution */])(this.qualityMapping, index, silent);
        } else {
            bitrateIndex = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__bitrate__["b" /* selectBitrate */])(this.bitrates, index, silent);
        }

        if (Number.isFinite(bitrateIndex)) {
            this.meister.trigger('requestBitrate', {
                bitrateIndex
            });
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (QualityButton);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = expandQualityMapping;
/* harmony export (immutable) */ __webpack_exports__["b"] = prepareResolutionMapping;
/* harmony export (immutable) */ __webpack_exports__["c"] = prepareResolutionOption;
/* harmony export (immutable) */ __webpack_exports__["d"] = selectResolution;
function expandQualityMapping(qualityMapping, index) {
    return {
        index,
        bitrates: [],
        from: qualityMapping.from,
        to: qualityMapping.to,
        resolution: qualityMapping.resolution
    };
}

function setResolution(bitrate, bitrateIndex, qualityMapping) {
    const targetMapping = qualityMapping.find(mapping => bitrate > mapping.from && bitrate <= mapping.to);
    if (!targetMapping) {
        console.warn(`No resolution found for bitrate: ${bitrate}`);
        return;
    }

    targetMapping.bitrates.push({
        bitrate,
        bitrateIndex
    });
}

function prepareResolutionMapping(bitrates, qualityMapping) {
    bitrates.forEach(bitrateInfo => setResolution(bitrateInfo.bitrate, bitrateInfo.index, qualityMapping));
    return bitrates;
}

function prepareResolutionOption(element, mapping) {
    const qualityOption = element;

    if (!mapping.resolution) {
        console.error('Qualitymapping is missing a resolution-value', mapping);
    }

    qualityOption.textContent = mapping.resolution;
    qualityOption.mapping = mapping;
}

function selectResolution(qualityMapping, index, silent = false) {
    qualityMapping.forEach(mapping => {
        if (!mapping.option) {
            return;
        }

        const hasBitrate = !!mapping.bitrates.find(bitrate => bitrate.bitrateIndex === index);
        if (hasBitrate) {
            mapping.option.selected.classList.add('pf-icon_icCheck');
        } else {
            mapping.option.selected.classList.remove('pf-icon_icCheck');
        }
    });

    return silent ? null : index;
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseElement__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SeekBarPreview__ = __webpack_require__(16);



function updateBar(element, percentage) {
    element.style.webkitTransform = `scaleX(${percentage})`; //eslint-disable-line
    element.style.transform = `scaleX(${percentage})`; //eslint-disable-line
}

class SeekBar extends __WEBPACK_IMPORTED_MODULE_0__BaseElement__["a" /* default */] {
    constructor(meister) {
        super(meister);

        this.isDragging = false;

        this.loadedMetadata = false;

        this.mousedownX = 0;
        this.pagedownX = 0;

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-seek-bar-wrapper');

        this.seekBarPadding = document.createElement('div');
        this.classListAdd(this.seekBarPadding, 'pf-seek-bar-padding');
        this.element.appendChild(this.seekBarPadding);

        this.seekBarDuration = document.createElement('div');
        this.classListAdd(this.seekBarDuration, 'pf-seek-bar', 'duration');
        this.element.appendChild(this.seekBarDuration);

        this.seekBarBuffered = document.createElement('div');
        this.classListAdd(this.seekBarBuffered, 'pf-seek-bar', 'buffered');
        this.element.appendChild(this.seekBarBuffered);
        this.seekBarBuffered.style.transform = 'scaleX(0)';

        this.seekBarFill = document.createElement('div');
        this.classListAdd(this.seekBarFill, 'pf-seek-bar', 'fill');
        this.element.appendChild(this.seekBarFill);
        this.seekBarFill.style.transform = 'scaleX(0)';

        this.seekBarHighlight = document.createElement('div');
        this.classListAdd(this.seekBarHighlight, 'pf-seek-bar', 'highlight');
        this.element.appendChild(this.seekBarHighlight);
        this.seekBarHighlight.style.transform = 'scaleX(0)';

        this.seekBarFigure = document.createElement('div');
        this.classListAdd(this.seekBarFigure, 'pf-seek-bar-figure');
        this.seekBarDuration.appendChild(this.seekBarFigure);
        this.seekBarFigure.style.left = '0%';

        this.preview = new __WEBPACK_IMPORTED_MODULE_1__SeekBarPreview__["a" /* default */](meister);
        this.seekBarDuration.appendChild(this.preview.getNode());

        this.on('itemTimeInfo', timeInfo => this.onItemTimeInfo(timeInfo));
        this.on('playerTimeUpdate', e => this.onTimeUpdate(e));
        this.on('playerSeek', e => this.onPlayerSeek(e));
        this.on('playerProgress', e => this.onPlayerProgress(e));
        this.on('playerLoadedMetadata', () => {
            this.loadedMetadata = true;
        });

        // Ad events.
        this.points = {};
        this.on('adCuePoints', info => this.onAdCuePoints(info));
        this.on('adEnded', info => this.onAdEnded(info));

        // Mouse hover events.
        this.seekBarPadding.addEventListener('mouseover', e => this.onMouseOver(e));
        this.seekBarPadding.addEventListener('mousemove', e => this.onMouseMove(e));
        this.seekBarPadding.addEventListener('mouseout', () => this.onMouseOut());

        // Seeking event listeners.
        this.seekBarPadding.addEventListener('mousedown', e => this.onSeekDown(e));
        this.seekBarPadding.addEventListener('touchstart', e => this.onSeekDown(e));

        this.onSeekMove = e => {
            // Prevent the page from moving while scrubbing
            e.preventDefault();

            // Get the location in the page, hacky for touch events...
            const normalizedProgress = this.normalizeEventPosition(e);

            if (this.isDragging) {
                updateBar(this.seekBarFill, normalizedProgress);
                updateBar(this.seekBarHighlight, normalizedProgress);
                this.updateFigure(normalizedProgress);
                this.preview.update(normalizedProgress);
                this.updateCurrentTime(normalizedProgress);
            }
        };

        this.onSeekUp = e => {
            // Do nothing when a second touch ends.
            if (window.TouchEvent && e instanceof window.TouchEvent && e.touches.length > 0) {
                return;
            }

            if (this.isDragging) {
                // Resume video
                if (this.wasPlaying) this.meister.play();

                this.isDragging = false;

                // Always hide the preview on mobile.
                if (window.TouchEvent && e instanceof window.TouchEvent) {
                    this.preview.hide();
                } else if (e.target !== this.seekBarPadding) {
                    this.preview.hide();
                }

                document.removeEventListener('mousemove', this.onSeekMove);
                document.removeEventListener('mouseup', this.onSeekUp);

                document.removeEventListener('touchmove', this.onSeekMove);
                document.removeEventListener('touchend', this.onSeekUp);
            }
        };
    }

    onItemUnloaded() {
        this.loadedMetadata = false;

        this.seekBarBuffered.style.transform = 'scaleX(0)';
        this.seekBarHighlight.style.transform = 'scaleX(0)';
        this.seekBarFill.style.transform = 'scaleX(0)';
        this.seekBarFigure.style.left = '0%';

        Object.keys(this.points).forEach(adID => {
            if (this.points[adID] !== null) {
                this.points[adID].remove();
            }
        });

        this.points = {};
        this.classListAdd(this.element, 'pf-ui-element-hidden');
    }

    onItemTimeInfo(timeInfo) {
        if (timeInfo.isLive && !timeInfo.hasDVR) {
            this.classListAdd(this.element, 'pf-ui-element-hidden');
        } else {
            this.classListRemove(this.element, 'pf-ui-element-hidden');
        }
    }

    onTimeUpdate(e) {
        const normalizedProgress = e.currentTime / e.duration;

        updateBar(this.seekBarFill, normalizedProgress);
        this.updateFigure(normalizedProgress);
    }

    onPlayerProgress(e) {
        if (!e) return;

        const timeRanges = e.buffered;
        const currentTimeRangeIndex = this.findTimerange(timeRanges);

        // Should we not get an index don't bother updating.
        if (currentTimeRangeIndex === -1) {
            return;
        }

        let duration = this.meister.duration;
        let targetTime = timeRanges.end(currentTimeRangeIndex);

        if (this.playOffset) {
            targetTime -= this.playOffset;
            duration -= this.playOffset;
        }

        const normalizedProgress = targetTime / duration;
        updateBar(this.seekBarBuffered, normalizedProgress);
    }

    // Mouse hover events.
    onMouseOver(e) {
        if (window.TouchEvent && e instanceof window.TouchEvent) {
            this.pagedownX = e.touches[0].pageX;
            const rect = e.target.getBoundingClientRect();
            this.mousedownX = this.pagedownX - rect.left;
        } else {
            this.mousedownX = e.offsetX;
            this.pagedownX = e.pageX;
        }

        this.preview.show();
    }

    onMouseMove(e) {
        const normalizedProgress = this.normalizeEventPosition(e);

        updateBar(this.seekBarHighlight, normalizedProgress);
        this.preview.update(normalizedProgress);
    }

    onMouseOut() {
        // Reset the highlight bar.
        updateBar(this.seekBarHighlight, 0);

        if (!this.isDragging) {
            this.preview.hide();
        }
    }

    // Seeking event handles.
    onSeekDown(e) {
        // Prevents user from selecting the page.
        e.preventDefault();

        // Get the preview to show and update.
        this.onMouseOver(e);
        this.onMouseMove(e);

        // Pause video
        this.wasPlaying = this.meister.playing;
        this.meister.pause();

        this.isDragging = true;

        // Get the location in the page, hacky for touch events...
        const normalizedProgress = this.normalizeEventPosition(e);

        updateBar(this.seekBarFill, normalizedProgress);
        this.updateFigure(normalizedProgress);
        this.updateCurrentTime(normalizedProgress);

        document.addEventListener('mousemove', this.onSeekMove);
        document.addEventListener('mouseup', this.onSeekUp);

        document.addEventListener('touchmove', this.onSeekMove);
        document.addEventListener('touchend', this.onSeekUp);
    }

    // Player seeked, update the seekbar.
    onPlayerSeek(e) {
        const normalizedProgress = e.relativePosition;

        updateBar(this.seekBarFill, normalizedProgress);
        updateBar(this.seekBarHighlight, normalizedProgress);
        this.updateFigure(normalizedProgress);
    }

    // Ad event handles/
    onAdCuePoints(info) {
        for (let i = 0; i < info.points.length; i++) {
            this.setPoint(info.points[i]);
        }
    }

    setPoint(time) {
        const self = this;

        function createPoint(t) {
            const elem = document.createElement('div');
            let normalizedProgress = t / self.meister.duration;

            self.meister.elementUtils.classListAdd(elem, 'pf-seek-bar-point', 'pf-ad-point');
            elem.id = `adpoint-${t}`;

            if (t < 0) {
                normalizedProgress = 1;
            }

            const pointPosition = 100 * normalizedProgress;
            elem.style.left = `${pointPosition}%`;

            self.seekBarDuration.appendChild(elem);
            self.points[`adpoint-${t}`] = elem;
        }

        if (!this.loadedMetadata) {
            this.one('playerLoadedMetadata', () => {
                createPoint(time);
            });
        } else {
            createPoint(time);
        }
    }

    onAdEnded(info) {
        const adPodInfo = info.ad.getAdPodInfo();

        // Remove it on the end of the first ad in the break, because is simpler.
        const element = document.getElementById(`adpoint-${adPodInfo.getTimeOffset()}`);
        delete this.points[`adpoint-${adPodInfo.getTimeOffset()}`];

        if (element !== null) {
            element.remove();
        }
    }

    // 'Private' methods.
    normalizeEventPosition(e) {
        let pageX = 0;
        if (window.TouchEvent && e instanceof window.TouchEvent) {
            pageX = e.touches[e.touches.length - 1].pageX;
        } else {
            pageX = e.pageX;
        }

        let position = pageX;
        position = this.mousedownX + (pageX - this.pagedownX);

        let normalizedProgress = position / this.seekBarPadding.offsetWidth;

        // Stay within the boundaries
        if (normalizedProgress > 1.0) {
            normalizedProgress = 1.0;
        } else if (normalizedProgress < 0) {
            normalizedProgress = 0;
        }

        return normalizedProgress;
    }

    updateFigure(percentage) {
        const figureLeftPercentage = 100 * percentage;
        this.seekBarFigure.style.left = `${figureLeftPercentage}%`;
    }

    updateCurrentTime(percentage) {
        this.meister.trigger('requestSeek', {
            relativePosition: percentage
        });
    }

    findTimerange(timeRanges) {
        for (let i = 0; i < timeRanges.length; i++) {
            if (this.meister.currentTime >= timeRanges.start(i) && this.meister.currentTime <= timeRanges.end(i)) {
                return i;
            }
        }

        // No range was found
        return -1;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (SeekBar);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseElement__ = __webpack_require__(0);


class SeekbarPreview extends __WEBPACK_IMPORTED_MODULE_0__BaseElement__["a" /* default */] {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-seek-bar-preview', 'no-preview');
        this.classListAdd(this.element, 'pf-ui-element-hidden');

        this.seekBarPreviewImage = document.createElement('img');
        this.classListAdd(this.seekBarPreviewImage, 'pf-seek-bar-preview-image');
        this.seekBarPreviewImage.src = '';
        this.element.appendChild(this.seekBarPreviewImage);

        this.seekBarPreviewTime = document.createElement('span');
        this.seekBarPreviewTime.textContent = '0:00';
        this.classListAdd(this.seekBarPreviewTime, 'pf-seek-bar-preview-time');
        this.element.appendChild(this.seekBarPreviewTime);

        this.images = [];

        this.on('itemTimeInfo', timeInfo => this.onItemTimeInfo(timeInfo));

        this.on('itemImagestream', info => {
            this.images = info.images;
            this.classListRemove(this.element, 'no-preview');
        });
    }

    onItemUnloaded() {
        this.isLive = false;
        this.modifiedDuration = null;
        // Reset filmstrip
        this.images = [];
        this.classListAdd(this.element, 'no-preview');
    }

    onItemTimeInfo(timeInfo) {
        // Special case for DASH dvr
        if (timeInfo.isLive) {
            this.isLive = true;
            this.modifiedDuration = timeInfo.duration;
        }
    }

    show() {
        this.classListRemove(this.element, 'pf-ui-element-hidden');
    }

    hide() {
        this.classListAdd(this.element, 'pf-ui-element-hidden');
    }

    update(percentage) {
        const offsetWidth = this.element.offsetWidth;
        const offsetParentWidth = this.element.offsetParent.offsetWidth;
        const rightBoundary = offsetParentWidth - offsetWidth;

        // Calculate how much the preview needs to move to the right.
        let pixelsRight = offsetParentWidth * percentage - offsetWidth / 2;

        // Make it stay within the player.
        if (pixelsRight < 0) {
            pixelsRight = 0;
        } else if (pixelsRight > rightBoundary) {
            pixelsRight = rightBoundary;
        }

        this.element.style.transform = `translate(${pixelsRight}px)`;

        let time = (this.modifiedDuration || this.meister.duration) * percentage;
        this.seekBarPreviewImage.src = this.getImageByTime(time);

        if (this.modifiedDuration) {
            time = this.modifiedDuration - time;
            const timeString = this.meister.utils.timeToHMS(Math.round(time));
            this.seekBarPreviewTime.textContent = `-${timeString}`;
        } else {
            this.seekBarPreviewTime.textContent = this.meister.utils.timeToHMS(Math.round(time));
        }
    }

    getImageByTime(time) {
        if (this.images.length === 0) {
            return '';
        }

        for (let i = 0; i < this.images.length; i++) {
            const image = this.images[i];

            if (image.start <= time && image.end >= time) {
                return image.src;
            }
        }

        return this.images[this.images.length - 1].src;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (SeekbarPreview);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseElement__ = __webpack_require__(0);


class Spinner extends __WEBPACK_IMPORTED_MODULE_0__BaseElement__["a" /* default */] {
    constructor(meister) {
        super(meister);

        this.meister = meister;

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-spinner-wrapper');

        this.spinner = document.createElement('div');
        this.classListAdd(this.spinner, 'pf-spinner-loading');
        this.element.appendChild(this.spinner);

        this.spinnerMessage = document.createElement('div');
        this.classListAdd(this.spinnerMessage, 'pf-spinner-message');
        this.element.appendChild(this.spinnerMessage);

        // Register events.
        this.on('playerBufferedEnough', () => this.hideSpinner(true));
        this.on('playerPause', () => this.hideSpinner());
        this.on('itemUnloaded', () => this.hideSpinner());
        this.on('playerPlay', () => this.hideSpinner());
        this.on('showLoading', e => this.showSpinner(e));
        this.on('hideLoading', () => this.hideSpinner());
    }

    showSpinner(e) {
        this.classListRemove(this.element, 'hidden');
        this.classListRemove(this.spinner, 'hidden');

        if (e && e.message) {
            this.spinnerMessage.innerHTML = e.message;
            this.classListRemove(this.spinnerMessage, 'hidden');
        } else if (e && e.code) {
            this.spinnerMessage.innerHTML = this.meister.Localization.get(e.code);
            this.classListRemove(this.spinnerMessage, 'hidden');
        }
    }

    hideSpinner(fromBuffering) {
        // HACK quick fix so other hides don't hide buffering indicator
        if (this.spinnerMessage.innerHTML === 'Buffering...' && !fromBuffering) {
            return;
        }

        this.classListAdd(this.element, 'hidden');
        this.classListAdd(this.spinner, 'hidden');
        this.classListAdd(this.spinnerMessage, 'hidden');
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Spinner);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseElement__ = __webpack_require__(0);


class StepBackButton extends __WEBPACK_IMPORTED_MODULE_0__BaseElement__["a" /* default */] {
    constructor(meister, config) {
        super(meister);
        this.config = config;

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-left', 'pf-ui-element-active');

        // Default
        this.classListAdd(this.element, 'pf-icon');
        this.classListAdd(this.element, 'pf-icon_icStepBackward');

        // Register event listeners
        this.element.addEventListener('click', () => this.onClick());
    }

    onClick() {
        this.meister.trigger('requestSeek', {
            timeOffset: -1 * this.config.stepBack
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (StepBackButton);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseElement__ = __webpack_require__(0);


class StepForwardButton extends __WEBPACK_IMPORTED_MODULE_0__BaseElement__["a" /* default */] {
    constructor(meister, config) {
        super(meister);
        this.config = config;

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-left', 'pf-ui-element-active');

        // Default
        this.classListAdd(this.element, 'pf-icon');
        this.classListAdd(this.element, 'pf-icon_icStepForward');

        // Register event listeners
        this.element.addEventListener('click', () => this.onClick());
    }

    onClick() {
        this.meister.trigger('requestSeek', {
            timeOffset: this.config.stepForward
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (StepForwardButton);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseElement__ = __webpack_require__(0);


const LIVE_THRESHOLD = 35;

class TimeDisplay extends __WEBPACK_IMPORTED_MODULE_0__BaseElement__["a" /* default */] {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-left', 'pf-time-display');
        // HACK: dirty microsoft
        if (this.meister.browser.isIE || this.meister.browser.isEdge) {
            this.classListAdd(this.element, 'microsoft-hack');
        }

        this.currentTime = document.createElement('span');
        this.currentTime.innerHTML = '0:00';
        this.classListAdd(this.currentTime, 'time-display-element');

        this.seperator = document.createElement('span');
        this.seperator.innerHTML = '/';
        this.classListAdd(this.seperator, 'time-display-element');

        this.duration = document.createElement('span');
        this.duration.innerHTML = '0:00';
        this.classListAdd(this.duration, 'time-display-element');
        this.duration.addEventListener('click', () => this.meister.trigger('requestGoLive'));

        this.element.appendChild(this.currentTime);
        this.element.appendChild(this.seperator);
        this.element.appendChild(this.duration);

        this.isLive = false;

        this.on('itemTimeInfo', timeInfo => this.onItemTimeInfo(timeInfo));
        this.on('playerTimeUpdate', e => this.onTimeUpdate(e));
        this.on('playerSeek', e => this.onPlayerSeek(e));

        // Ad variables.
        this.adTimer = null;
        this.adDuration = 0;
    }

    onItemUnloaded() {
        this.isLive = false;
        this.classListRemove(this.duration, 'go-live', 'pf-ui-element-active');

        this.currentTime.innerHTML = '-';
        this.duration.innerHTML = '-';
    }

    onItemTimeInfo(timeInfo) {
        if (timeInfo.isLive) {
            this.isLive = true;
            this.duration.innerHTML = 'LIVE';

            if (!timeInfo.hasDVR) this.currentTime.innerHTML = '-';
        } else {
            this.duration.innerHTML = this.createTimeString(timeInfo.duration);
        }
    }

    onTimeUpdate(e) {
        // Set the duration and current time for VODs
        if (!this.isLive) {
            this.currentTime.innerHTML = this.createTimeString(e.currentTime);
            this.duration.innerHTML = this.createTimeString(e.duration);
            return;
        }

        // If a livestream is close enough to the edge display no time.
        const behindLive = e.duration - e.currentTime;

        if (behindLive < LIVE_THRESHOLD) {
            this.currentTime.innerHTML = '-';
            this.classListRemove(this.duration, 'go-live', 'pf-ui-element-active');
            return;
        }
    }

    onPlayerSeek(e) {
        // Set the duration and current time for VODs
        if (!this.isLive) {
            this.currentTime.innerHTML = this.createTimeString(e.currentTime);
            this.duration.innerHTML = this.createTimeString(e.duration);
            return;
        }

        const behindLive = e.duration - e.currentTime;
        if (behindLive < LIVE_THRESHOLD) {
            this.currentTime.innerHTML = '-';
            this.classListRemove(this.duration, 'go-live', 'pf-ui-element-active');
            return;
        }

        // Display the amount of time the player is behind live.
        const timeString = this.createTimeString(behindLive);
        this.currentTime.innerHTML = `-${timeString}`;

        // Activate the go live button.
        this.classListAdd(this.duration, 'go-live', 'pf-ui-element-active');
    }

    createTimeString(time) {
        let roundTime = Math.round(time);
        if (roundTime < 0) {
            roundTime = 0;
        }

        return this.meister.utils.timeToHMS(roundTime);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (TimeDisplay);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseElement__ = __webpack_require__(0);


class VolumeSlider extends __WEBPACK_IMPORTED_MODULE_0__BaseElement__["a" /* default */] {
    constructor(meister) {
        super(meister);

        this.isDragging = false;
        this.mousedownX = 0;
        this.pagedownX = 0;

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-left');
        // Can't control volume on iOS when it's not playing inline
        if (this.meister.browser.isiOS && !this.meister.config.iosPlaysInline) {
            this.classListAdd(this.element, 'pf-ui-element-inactive');
        } else {
            this.classListAdd(this.element, 'pf-ui-element-active');
        }

        this.volumeButton = document.createElement('div');
        this.classListAdd(this.volumeButton, 'pf-volume-button');
        this.classListAdd(this.volumeButton, 'pf-icon', 'pf-icon_icVol0');
        this.element.appendChild(this.volumeButton);

        this.sliderWrapper = document.createElement('div');
        this.classListAdd(this.sliderWrapper, 'pf-volume-slider-wrapper');
        this.element.appendChild(this.sliderWrapper);

        this.volumeBar = document.createElement('div');
        this.classListAdd(this.volumeBar, 'pf-volume-slider', 'close');
        this.sliderWrapper.appendChild(this.volumeBar);

        this.volumeBarFill = document.createElement('div');
        this.classListAdd(this.volumeBarFill, 'pf-volume-slider-fill');
        this.volumeBar.appendChild(this.volumeBarFill);

        this.volumeBarFigure = document.createElement('div');
        this.classListAdd(this.volumeBarFigure, 'pf-volume-slider-figure');
        this.volumeBar.appendChild(this.volumeBarFigure);

        // Add volume event listeners.
        this.on('playerVolumeChange', () => this.onVolumeChange());
        this.on('playerLoadedMetadata', () => this.onVolumeChange());

        // Add mouse event listeners
        this.volumeButton.addEventListener('click', () => this.onClick());

        this.element.addEventListener('mouseover', () => this.showSlider(true));
        this.element.addEventListener('mouseleave', () => this.showSlider(false));

        this.sliderWrapper.addEventListener('mousedown', e => this.onDown(e));
        this.sliderWrapper.addEventListener('touchstart', e => this.onDown(e));

        this.onMove = e => {
            if (this.isDragging) {
                this.updateBar(e);
            }
        };

        this.onUp = e => {
            if (this.isDragging) {
                this.isDragging = false;

                if (e.target !== this.sliderWrapper) {
                    this.showSlider(false);
                }

                document.removeEventListener('mousemove', this.onMove);
                document.removeEventListener('mouseup', this.onUp);

                document.addEventListener('touchmove', this.onMove);
                document.addEventListener('touchend', this.onUp);
            }
        };
    }

    onDown(e) {
        // Prevents user from selecting the page.
        e.preventDefault();

        this.isDragging = true;

        if (window.TouchEvent && e instanceof window.TouchEvent) {
            this.pagedownX = e.touches[0].pageX;
            const rect = e.target.getBoundingClientRect();
            this.mousedownX = this.pagedownX - rect.left;
        } else {
            this.mousedownX = e.offsetX;
            this.pagedownX = e.pageX;
        }

        this.updateBar(e);

        document.addEventListener('mousemove', this.onMove);
        document.addEventListener('mouseup', this.onUp);

        document.addEventListener('touchmove', this.onMove);
        document.addEventListener('touchend', this.onUp);
    }

    showSlider(on) {
        if (this.isDragging) {
            return;
        }

        if (on) {
            this.classListAdd(this.volumeBar, 'open');
            this.classListRemove(this.volumeBar, 'close');
        } else {
            this.classListRemove(this.volumeBar, 'open');
            this.classListAdd(this.volumeBar, 'close');
        }
    }

    onClick() {
        this.meister.muted = !this.meister.muted;
        this.meister.trigger('playerVolumeChange');
    }

    onVolumeChange() {
        let normalizedProgress = this.meister.volume;

        if (this.meister.muted) {
            normalizedProgress = 0;
        }

        this.volumeBarFill.style.transform = `scaleX(${normalizedProgress})`;
        const leftPercentage = 100 * normalizedProgress;
        this.volumeBarFigure.style.left = `${leftPercentage}%`;

        this.updateIcon();
    }

    updateBar(e) {
        // Stop muting when the user changes the volume.
        this.meister.muted = false;

        let volume = this.normalizeEventPosition(e);

        if (volume > 1) {
            volume = 1;
        } else if (volume < 0) {
            volume = 0;
        }

        this.meister.volume = volume;
    }

    clearIcons() {
        for (let i = 0; i <= 3; i++) {
            this.classListRemove(this.volumeButton, `pf-icon_icVol${i}`);
        }
    }

    updateIcon() {
        this.clearIcons();

        const volume = this.meister.volume;
        let iconNum = 0;

        if (this.meister.muted) {
            iconNum = 0;
        } else if (volume <= 0.25 && volume >= 0.01) {
            iconNum = 1;
        } else if (volume >= 0.25 && volume <= 0.66) {
            iconNum = 2;
        } else if (volume >= 0.66 && volume <= 1) {
            iconNum = 3;
        }

        this.classListAdd(this.volumeButton, `pf-icon_icVol${iconNum}`);
    }

    normalizeEventPosition(e) {
        let pageX = 0;
        if (window.TouchEvent && e instanceof window.TouchEvent) {
            pageX = e.touches[e.touches.length - 1].pageX;
        } else {
            pageX = e.pageX;
        }

        let position = pageX;
        position = this.mousedownX + (pageX - this.pagedownX);

        let normalizedProgress = position / this.volumeBar.offsetWidth;

        // Stay within the boundaries
        if (normalizedProgress > 1.0) {
            normalizedProgress = 1.0;
        } else if (normalizedProgress < 0) {
            normalizedProgress = 0;
        }

        return normalizedProgress;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (VolumeSlider);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createStandardElement;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CaptionsButton__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FullscreenButton__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PlayButton__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PlaylistButtons__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__QualityButton__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SeekBar__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Spinner__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__StepBackButton__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__StepForwardButton__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__TimeDisplay__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__VolumeSlider__ = __webpack_require__(21);












function createStandardElement(meister, config, name) {
    switch (name) {
        case 'captionsbutton':
            return new __WEBPACK_IMPORTED_MODULE_0__CaptionsButton__["a" /* default */](meister, config);
        case 'fullscreenbutton':
            return new __WEBPACK_IMPORTED_MODULE_1__FullscreenButton__["a" /* default */](meister, config);
        case 'playbutton':
            return new __WEBPACK_IMPORTED_MODULE_2__PlayButton__["a" /* default */](meister, config);
        case 'playlistbuttons':
            return new __WEBPACK_IMPORTED_MODULE_3__PlaylistButtons__["a" /* default */](meister, config);
        case 'qualitybutton':
            return new __WEBPACK_IMPORTED_MODULE_4__QualityButton__["a" /* default */](meister, config);
        case 'seekbar':
            return new __WEBPACK_IMPORTED_MODULE_5__SeekBar__["a" /* default */](meister, config);
        case 'spinner':
            return new __WEBPACK_IMPORTED_MODULE_6__Spinner__["a" /* default */](meister, config);
        case 'stepbackbutton':
            return new __WEBPACK_IMPORTED_MODULE_7__StepBackButton__["a" /* default */](meister, config);
        case 'stepforwardbutton':
            return new __WEBPACK_IMPORTED_MODULE_8__StepForwardButton__["a" /* default */](meister, config);
        case 'timedisplay':
            return new __WEBPACK_IMPORTED_MODULE_9__TimeDisplay__["a" /* default */](meister, config);
        case 'volumeslider':
            return new __WEBPACK_IMPORTED_MODULE_10__VolumeSlider__["a" /* default */](meister, config);
        default:
            return null;
    }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ })
/******/ ]);
//# sourceMappingURL=CustomUi.js.map