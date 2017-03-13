import BaseElement from './BaseElement';

class StepForwardButton extends BaseElement {
    constructor(meister, config) {
        super(meister);
        this.config = config;

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-left', 'pf-ui-element-active');

        // Default
        this.classListAdd(this.element, 'icon');
        this.classListAdd(this.element, 'icon_icStepForward');

        // Register event listeners
        this.element.addEventListener('click', () => this.onClick());
    }

    onClick() {
        this.meister.trigger('requestSeek', {
            timeOffset: this.config.stepForward,
        });
    }
}

export default StepForwardButton;
