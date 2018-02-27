import BaseElement from '../BaseElement';

import styles from './styles.scss';
import stepForwardIcon from '../icons/stepforward';
import globalStyles from '../global-styles.scss';

class StepForwardButton extends BaseElement {
    constructor(meister, config) {
        super(meister);
        this.config = config;
        this.isLive = false;

        this.element = document.createElement('div');
        this.classListAdd(this.element, globalStyles.uiElement, globalStyles.uiElementActive);

        // Default
        this.classListAdd(this.element, styles.button);
        this.classListAdd(this.element, styles.forwardButton);
        const Icon = stepForwardIcon(this.config.stepForward);
        this.element.innerHTML = Icon;

        // Register event listeners
        this.element.addEventListener('click', () => this.onClick());

        this.on('itemTimeInfo', timeInfo => this.onItemTimeInfo(timeInfo));
    }

    onItemTimeInfo(timeInfo) {
        this.isLive = timeInfo.isLive;

        if (this.isLive && this.config.disablePauseWithLive) {
            // hide on live
            this.classListAdd(this.element, 'pf-ui-element-hidden');
        }
    }

    onClick() {
        this.meister.trigger('requestSeek', {
            timeOffset: this.config.stepForward,
        });
    }
}

export default StepForwardButton;
