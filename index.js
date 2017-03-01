/** @module CustomUi */
import { extractEventNodes, createRegisterDataEvents } from './utilities';

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

        if (this.meister.utils.isDOMNode(this.config.ui)) {
            this.element = this.config.ui;
        } else {
            // Treat it as a url and download the template.
        }

        extractEventNodes(this.element).forEach(createRegisterDataEvents(this.meister, this.config.registeredCallback));
    }

    draw() {
        this.controlsWrapper.appendChild(this.element);
    }
}

CustomUi.pluginName = 'customui';

Meister.registerPlugin(CustomUi.pluginName, CustomUi);
export default CustomUi;
