import BaseElement from '../BaseElement';
import styles from './styles.scss';
import playIcon from '../icons/play';
import pauseIcon from '../icons/pause';
import globalStyles from '../global-styles.scss';

const playButtonSvg = playIcon();
const pauseButtonSvg = pauseIcon();

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
