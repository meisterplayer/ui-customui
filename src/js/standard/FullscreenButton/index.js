import BaseElement from '../BaseElement';
import styles from './styles.scss';
import globalStyles from '../global-styles.scss';

const fullscreenIconSVG = `
<svg class="${globalStyles.svg}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M14.990778,4 L19.009222,4 C19.2777897,4 19.5243695,4.11070974 19.7117708,4.2928267 C19.8904143,4.4719102 20,4.71851976 20,4.99077797 L20,9.00922203 C20,9.54902482 19.5527519,10 19.0010434,10 L17.9989566,10 C17.4426603,10 17,9.55641359 17,9.00922203 L17,7 L14.990778,7 C14.4509752,7 14,6.55275191 14,6.00104344 L14,4.99895656 C14,4.44266033 14.4435864,4 14.990778,4 Z M14.990778,20 C14.4435864,20 14,19.5573397 14,19.0010434 L14,17.9989566 C14,17.4472481 14.4509752,17 14.990778,17 L17,17 L17,14.990778 C17,14.4435864 17.4426603,14 17.9989566,14 L19.0010434,14 C19.5527519,14 20,14.4509752 20,14.990778 L20,19.009222 C20,19.2814802 19.8904143,19.5280898 19.7117708,19.7071733 C19.5243695,19.8892903 19.2777897,20 19.009222,20 L14.990778,20 Z M9.00922203,4 C9.55641359,4 10,4.44266033 10,4.99895656 L10,6.00104344 C10,6.55275191 9.54902482,7 9.00922203,7 L7,7 L7,9.00922203 C7,9.55641359 6.55733967,10 6.00104344,10 L4.99895656,10 C4.44724809,10 4,9.54902482 4,9.00922203 L4,4.99077797 C4,4.71851976 4.10958568,4.4719102 4.28822924,4.2928267 C4.47563053,4.11070974 4.72221026,4 4.99077797,4 L9.00922203,4 Z M9.00922203,20 L4.99077797,20 C4.72221026,20 4.47563053,19.8892903 4.28822924,19.7071733 C4.10958568,19.5280898 4,19.2814802 4,19.009222 L4,14.990778 C4,14.4509752 4.44724809,14 4.99895656,14 L6.00104344,14 C6.55733967,14 7,14.4435864 7,14.990778 L7,17 L9.00922203,17 C9.54902482,17 10,17.4472481 10,17.9989566 L10,19.0010434 C10,19.5573397 9.55641359,20 9.00922203,20 Z"></path>
</svg>
`;

const fullscreenExitIconSVG = `
<svg class="${globalStyles.svg}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M19.009222,10 L14.990778,10 C14.7222103,10 14.4756305,9.88929026 14.2882292,9.7071733 C14.1095857,9.5280898 14,9.28148024 14,9.00922203 L14,4.99077797 C14,4.45097518 14.4472481,4 14.9989566,4 L16.0010434,4 C16.5573397,4 17,4.44358641 17,4.99077797 L17,7 L19.009222,7 C19.5490248,7 20,7.44724809 20,7.99895656 L20,9.00104344 C20,9.55733967 19.5564136,10 19.009222,10 Z M19.009222,14 C19.5564136,14 20,14.4426603 20,14.9989566 L20,16.0010434 C20,16.5527519 19.5490248,17 19.009222,17 L17,17 L17,19.009222 C17,19.5564136 16.5573397,20 16.0010434,20 L14.9989566,20 C14.4472481,20 14,19.5490248 14,19.009222 L14,14.990778 C14,14.7185198 14.1095857,14.4719102 14.2882292,14.2928267 C14.4756305,14.1107097 14.7222103,14 14.990778,14 L19.009222,14 Z M4.99077797,10 C4.44358641,10 4,9.55733967 4,9.00104344 L4,7.99895656 C4,7.44724809 4.45097518,7 4.99077797,7 L7,7 L7,4.99077797 C7,4.44358641 7.44266033,4 7.99895656,4 L9.00104344,4 C9.55275191,4 10,4.45097518 10,4.99077797 L10,9.00922203 C10,9.28148024 9.89041432,9.5280898 9.71177076,9.7071733 C9.52436947,9.88929026 9.27778974,10 9.00922203,10 L4.99077797,10 Z M4.99077797,14 L9.00922203,14 C9.27778974,14 9.52436947,14.1107097 9.71177076,14.2928267 C9.89041432,14.4719102 10,14.7185198 10,14.990778 L10,19.009222 C10,19.5490248 9.55275191,20 9.00104344,20 L7.99895656,20 C7.44266033,20 7,19.5564136 7,19.009222 L7,17 L4.99077797,17 C4.45097518,17 4,16.5527519 4,16.0010434 L4,14.9989566 C4,14.4426603 4.44358641,14 4.99077797,14 Z"></path>
</svg>
`;

class FullscreenButton extends BaseElement {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');

        this.classListAdd(this.element, globalStyles.uiElement);
        if (this.meister.config.audioOnly) {
            this.classListAdd(this.element, globalStyles.uiElementInactive);
        } else {
            this.classListAdd(this.element, globalStyles.uiElementActive);
        }

        // default
        this.classListAdd(this.element, globalStyles.icon, styles.fullscreenIcon);
        this.element.innerHTML = fullscreenIconSVG;

        this.element.addEventListener('click', () => this.toggleFullscreen());

        this.on('playerFullscreen', () => this.toggleIcon());
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
