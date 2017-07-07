/** @module HtmlUi */
import { extractEventNodes, createRegisterDataEvents } from './lib/event-node-functions';
import { extractStandardNodes, createLoadStandardElement  } from './lib/standard-node-functions';
import { extractDirectiveNodes, createAttachDirective } from './lib/directive-node-functions';
import packageJson from '../../package.json';
import defaultTheme from './defaultTheme';

let TIME_TILL_FADE = 3000;
/**
 * Plugin that can be used to supply your own HTMLElements that make up the ui. By specifying
 * data-attributes you can customize the functionality of the ui.
 * @memberof module:HtmlUi
 */
class HtmlUi extends Meister.Ui {
    /**
     * Create a new HtmlUi.
     * @memberof module:HtmlUi
     * @param {Object} config Configuration for the plugin.
     * @param {Meister} meister Meister instance which is instantiating a new HtmlUi.
     */
    constructor(config, meister) {
        super(config, meister);

        if (Number.isFinite(this.config.timeToFade)) {
            TIME_TILL_FADE = this.config.timeToFade * 1000;
        }

        if (!this.config.ui) {
            // use default, also triggered if the UI element is defined but not found
            this.insertStringTemplate(defaultTheme());
            return [];
        }
        if (this.meister.utils.isDOMNode(this.config.ui)) {
            this.element = this.config.ui;
            this.processTemplate();
        } else if (this.config.ui.indexOf('http://') > -1 ||
            this.config.ui.indexOf('https://') > -1) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', this.config.ui);
            xhr.responseType = 'document';
            xhr.addEventListener('load', this.onTemplateRequestSuccess.bind(this), false);
            xhr.addEventListener('error', this.onTemplateRequestError.bind(this), false);
            xhr.send();
        } else if (typeof this.config.ui === 'string') {
            // insert string template configured by user
            this.insertStringTemplate(this.config.ui);
        } else {
            console.warn(`Unable to render a UI template`);
            return [];
        }

        // Consistent return.
        return this;
    }

    /**
     * Name of the plugin that is used for registering it.
     * @return {String}
     */
    static get pluginName() {
        return 'HtmlUi';
    }

    static get pluginVersion() {
        return packageJson.version;
    }

    /**
     * Returns DOM Node that is inserted in the DOM
     * @return {DOMNode}
     */
    getTemplateWrapper() {
        const templateElementWrapper = document.createElement('div');
        templateElementWrapper.style.display = 'none';
        templateElementWrapper.style.visibility = 'hidden';

        const templateElement = document.createElement('div');
        templateElementWrapper.appendChild(templateElement);

        document.body.appendChild(templateElementWrapper);

        return templateElement;
    }

    /**
     * Inserts and handles a template defined as string
     * @param {String} template
     */
    insertStringTemplate(template) {
        this.element = this.getTemplateWrapper();
        this.element.innerHTML = template;
        this.processTemplate();
        this.draw();
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
        if (this.config.remoteTemplateReady) { this.config.remoteTemplateReady(); }
    }

    /**
     * Log the XMLHttpRequest to the console.
     * @param {ProgressEvent} loadEvent Event object from the XMLHttpRequest.
     */
    onTemplateRequestError(loadEvent) {
        console.error(`${HtmlUi.pluginName}: error loading the template. `, loadEvent.target);
    }

    /**
     * Replace marked nodes with their StandardUi equivalents, and register events on the specified nodes.
     */
    processTemplate() {
        extractStandardNodes(this.element).forEach(createLoadStandardElement(this.meister, this.config.standard));
        extractEventNodes(this.element).forEach(createRegisterDataEvents(this.meister, this.config.registeredCallback));
        extractDirectiveNodes(this.element).forEach(createAttachDirective(this.meister, this.config.registeredCallback));
    }

    /**
     * Insert the Ui into the DOM.
     */
    draw() {
        if (!this.element) { return; }

        this.controlsWrapper.appendChild(this.element);
    }

    onMouseDown() {
        this.dragging = true;
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('touchend', this.onMouseUp);
    }

    onMouseUp() {
        this.dragging = false;
        // Fake mouse movement
        this.onMouseMove();

        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('touchend', this.onMouseUp);
    }

    onMouseMove() {
        clearTimeout(this.mouseTimeout);
        clearTimeout(this.controlsTimeout);

        this.showControls();
        this.showCursor();

        this.mouseTimeout = setTimeout(this.hideCursor.bind(this), TIME_TILL_FADE);
        this.controlsTimeout = setTimeout(this.hideControls.bind(this), TIME_TILL_FADE);
    }

    onMouseLeave() {
        clearTimeout(this.mouseTimeout);
        clearTimeout(this.controlsTimeout);

        this.hideControls();
        this.showCursor();
    }

    hideControls() {
        if (this.dragging || !this.meister.playing) {
            return;
        }

        this.bottomBar.getNode().classList.add('hidden');
        if (!this.config.condensedUi) { this.topBar.getNode().classList.add('hidden'); }
        this.bottomBar.hide();

        if (this.isControlsShown) {
            this.meister.trigger('uiEvent:hideControls', {});
        }

        this.isControlsShown = false;
    }

    showControls() {
        this.bottomBar.getNode().classList.remove('hidden');
        if (!this.config.condensedUi) { this.topBar.getNode().classList.remove('hidden'); }

        if (!this.isControlsShown) {
            this.meister.trigger('uiEvent:showControls', {});
        }

        this.isControlsShown = true;
    }

}

Meister.registerPlugin(HtmlUi.pluginName, HtmlUi);
export default HtmlUi;
