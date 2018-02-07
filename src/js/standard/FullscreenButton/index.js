import BaseElement from '../BaseElement';
import styles from './styles.scss';
import fullscreenIcon from '../icons/fullscreen';
import fullscreenExitIcon from '../icons/fullscreenExit';
import globalStyles from '../global-styles.scss';

const fullscreenIconSVG = fullscreenIcon();
const fullscreenExitIconSVG = fullscreenExitIcon();

class FullscreenButton extends BaseElement {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');

        this.classListAdd(this.element, globalStyles.uiElement);
        if (this.meister.config.audioOnly) {
            this.classListAdd(this.element, globalStyles.uiElementHidden);
        } else {
            this.classListAdd(this.element, globalStyles.uiElementActive);
        }

        // default
        this.classListAdd(this.element, globalStyles.icon, styles.fullscreenIcon);
        this.element.innerHTML = fullscreenIconSVG;

        this.element.addEventListener('click', () => this.toggleFullscreen());

        this.on('playerFullscreen', () => this.toggleIcon());
        this.on('playlistMetadata', this.onPlaylistMetadata.bind(this));
    }

    onPlaylistMetadata(item) {
        if (item.mediaType === 'audio') {
            this.classListAdd(this.element, globalStyles.uiElementHidden);
        }
    }

    toggleIcon() {
        const fullscreenElement = document.fullscreenElement
            || document.webkitFullscreenElement
            || document.mozFullScreenElement;

        if (fullscreenElement) {
            this.classListAdd(this.element, styles.fullscreenExitIcon);
            this.classListRemove(this.element, styles.fullscreenIcon);
            this.element.innerHTML = fullscreenExitIconSVG;
        } else {
            this.classListAdd(this.element, styles.fullscreenIcon);
            this.classListRemove(this.element, styles.fullscreenExitIcon);
            this.element.innerHTML = fullscreenIconSVG;
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
