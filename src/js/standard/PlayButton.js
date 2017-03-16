import BaseElement from './BaseElement';

class PlayButton extends BaseElement {
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

        this.on('itemTimeInfo', (timeInfo) => this.onItemTimeInfo(timeInfo));
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

export default PlayButton;
