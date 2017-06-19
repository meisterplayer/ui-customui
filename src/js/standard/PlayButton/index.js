import BaseElement from '../BaseElement';
import styles from './styles.scss';
import globalStyles from '../global-styles.scss';

const playButtonSvg = `
<svg class="${globalStyles.svg}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M17.5797546,11.3085619 C18.1433363,11.6897833 18.1368179,12.3122745 17.5797546,12.6890866 L7.02045486,19.8316732 C6.4568732,20.2128946 6,19.9252466 6,19.1843471 L6,4.81330147 C6,4.07457175 6.46339158,3.78916316 7.02045486,4.16597534 L17.5797546,11.3085619 Z" id="play"></path>
</svg>
`;

const pauseButtonSvg = `
<svg class="${globalStyles.svg}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M6,4.66712976 C6,4.29868417 6.44335318,4 7.0093689,4 L8.9906311,4 C9.54809015,4 10,4.29831281 10,4.66712976 L10,19.3328702 C10,19.7013158 9.55664682,20 8.9906311,20 L7.0093689,20 C6.45190985,20 6,19.7016872 6,19.3328702 L6,4.66712976 Z M14,4.66712976 C14,4.29868417 14.4433532,4 15.0093689,4 L16.9906311,4 C17.5480902,4 18,4.29831281 18,4.66712976 L18,19.3328702 C18,19.7013158 17.5566468,20 16.9906311,20 L15.0093689,20 C14.4519098,20 14,19.7016872 14,19.3328702 L14,4.66712976 Z" id="pause"></path>
</svg>
`;

class PlayButton extends BaseElement {
    constructor(meister, config, type = 'normal') {
        super(meister);

        this.config = config;
        this.type = type;

        this.element = document.createElement('div');
        this.classListAdd(this.element, globalStyles.uiElement, globalStyles.uiElementActive);

        this.isLive = false;

        // Default
        this.classListAdd(this.element, styles.button);
        this.classListAdd(this.element, styles.playButton);
        this.element.innerHTML = playButtonSvg;

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
            this.classListRemove(this.element, styles.playButton);
            this.classListRemove(this.element, styles.pauseButton);
            return;
        }

        if (this.meister.playing) {
            this.classListAdd(this.element, styles.pauseButton);
            this.classListRemove(this.element, styles.playButton);
            this.element.innerHTML = pauseButtonSvg;
        } else {
            this.classListRemove(this.element, styles.pauseButton);
            this.classListAdd(this.element, styles.playButton);
            this.element.innerHTML = playButtonSvg;
        }
    }
}

export default PlayButton;
