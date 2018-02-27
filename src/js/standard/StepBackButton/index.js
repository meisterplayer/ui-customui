import BaseElement from '../BaseElement';
import styles from './styles.scss';
import stepBackIcon from '../icons/stepback';
import globalStyles from '../global-styles.scss';

class StepBackButton extends BaseElement {
    constructor(meister, config) {
        super(meister);
        this.config = config;
        this.isLive = false;

        this.element = document.createElement('div');
        this.classListAdd(this.element, globalStyles.uiElement, globalStyles.uiElementActive);

        // Default
        this.classListAdd(this.element, styles.button);
        this.classListAdd(this.element, styles.backwardButton);
        const Icon = stepBackIcon(this.config.stepBack);
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
            timeOffset: -1 * this.config.stepBack,
        });
    }
}

export default StepBackButton;
