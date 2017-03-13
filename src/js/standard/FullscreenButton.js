import BaseElement from './BaseElement';

class FullscreenButton extends BaseElement {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');

        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-right');
        if (this.meister.config.audioOnly) {
            this.classListAdd(this.element, 'pf-ui-element-inactive');
        } else {
            this.classListAdd(this.element, 'pf-ui-element-active');
        }

        this.classListAdd(this.element, 'icon', 'icon_icFullscreen');

        this.element.addEventListener('click', () => this.toggleFullscreen());

        this.on('playerFullscreen', () => this.toggleIcon());
    }

    toggleIcon() {
        const fullscreenElement = document.fullscreenElement
            || document.webkitFullscreenElement
            || document.mozFullScreenElement;

        if (fullscreenElement) {
            this.classListAdd(this.element, 'icon_icFullscreenExit');
            this.classListRemove(this.element, 'icon_icFullscreen');
        } else {
            this.classListAdd(this.element, 'icon_icFullscreen');
            this.classListRemove(this.element, 'icon_icFullscreenExit');
        }
    }

    toggleFullscreen() {
        if (this.meister.isFullscreen) {
            this.meister.cancelFullscreen();
        } else {
            this.meister.requestFullscreen();
        }
    }
}

export default FullscreenButton;
