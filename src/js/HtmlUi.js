/** @module HtmlUi */
import { extractEventNodes, createRegisterDataEvents } from './lib/event-node-functions';
import { extractStandardNodes, createLoadStandardElement  } from './lib/standard-node-functions';
import { extractDirectiveNodes, createAttachDirective } from './lib/directive-node-functions';
import packageJson from '../../package.json';
import defaultTheme from './defaultTheme';


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
        this.hiddenClassName = this.config.hiddenClassName || 'mstr-hide-controls';
        this.directives = [];
        if (!this.config.ui) {
            // use default, also triggered if the UI element is defined but not found
            this.insertStringTemplate(defaultTheme());
            return [];
        }
        if (this.meister.utils.isDOMNode(this.config.ui)) {
            this.element = this.config.ui;
            this.processTemplate();
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
     * Replace marked nodes with their StandardUi equivalents, and register events on the specified nodes.
     */
    processTemplate() {
        extractStandardNodes(this.element).forEach(createLoadStandardElement(this.meister, this.config.standard));
        extractEventNodes(this.element).forEach(createRegisterDataEvents(this.meister, this.config.registeredCallback));
        extractDirectiveNodes(this.element).forEach((element) => {
            const attachDirective = createAttachDirective(this.meister, this.config);
            this.directives.push(attachDirective(element));
        });
        // set events
        this.meister.on('uiEvent:hideControls', this.hideControls.bind(this));
        this.meister.on('uiEvent:showControls', this.showControls.bind(this));
        this.meister.on('uiEvent:hideCursor', this.hideCursor.bind(this));
        this.meister.on('uiEvent:showCursor', this.showCursor.bind(this));

    }

    /**
     * Insert the Ui into the DOM.
     */
    draw() {
        if (!this.element) { return; }

        this.controlsWrapper.appendChild(this.element);
    }

    hideControls() {
        if (this.element) this.element.classList.add(this.hiddenClassName);
    }

    showControls() {
        if (this.element) this.element.classList.remove(this.hiddenClassName);
    }

    hideCursor() {
        this.meister.container.style.cursor = 'none';
    }

    showCursor() {
        this.meister.container.style.cursor = 'auto';
    }

    unload() {
        super.unload();
        this.directives.forEach((directive) => {
            directive.unload();
        });
    }

}

Meister.registerPlugin(HtmlUi.pluginName, HtmlUi);
export default HtmlUi;
