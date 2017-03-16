import BaseElement from './BaseElement';

class StepBackButton extends BaseElement {
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
            timeOffset: -1 * this.config.stepBack,
        });
    }
}

export default StepBackButton;
