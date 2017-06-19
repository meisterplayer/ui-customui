import BaseElement from '../BaseElement';
import styles from './styles.scss';
import globalStyles from '../global-styles.scss';

const volumeIconMute = `
<svg class="${globalStyles.svg}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M18,10.7529107 L15.5073637,8.2602744 C15.1664641,7.91937486 14.6031064,7.914358 14.2587322,8.25873219 C13.9119571,8.6055073 13.9150485,9.16213774 14.2602744,9.50736367 L16.7529107,12 L14.2602744,14.4926363 C13.9193749,14.8335359 13.914358,15.3968936 14.2587322,15.7412678 C14.6055073,16.0880429 15.1621377,16.0849515 15.5073637,15.7397256 L18,13.2470893 L20.4926363,15.7397256 C20.8335359,16.0806251 21.3968936,16.085642 21.7412678,15.7412678 C22.0880429,15.3944927 22.0849515,14.8378623 21.7397256,14.4926363 L19.2470893,12 L21.7397256,9.50736367 C22.0806251,9.16646413 22.085642,8.60310639 21.7412678,8.25873219 C21.3944927,7.91195709 20.8378623,7.91504847 20.4926363,8.2602744 L18,10.7529107 Z"></path>
    <path fill="currentColor" d="M1.0093689,8.0749622 C0.451909848,8.0749622 0,8.51944308 0,9.06903369 L0,14.9298135 C0,15.478824 0.443353176,15.923885 1.0093689,15.923885 L4,15.923885 L9.37646484,19.6916936 C10.2772423,20.3229555 11,19.9530982 11,18.872049 L11,5.1267982 C11,4.0451514 10.2731186,3.67878158 9.37646484,4.30715352 L4,8.0749622 L1.0093689,8.0749622 Z"></path>
</svg>
`;
const volumeIconLow = `
<svg class="${globalStyles.svg}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M14.8284271,14.8284271 C16.3905243,13.26633 16.3905243,10.73367 14.8284271,9.17157288 C14.4379028,8.78104858 13.8047379,8.78104858 13.4142136,9.17157288 C13.0236893,9.56209717 13.0236893,10.1952621 13.4142136,10.5857864 C14.1952621,11.366835 14.1952621,12.633165 13.4142136,13.4142136 C13.0236893,13.8047379 13.0236893,14.4379028 13.4142136,14.8284271 C13.8047379,15.2189514 14.4379028,15.2189514 14.8284271,14.8284271 Z" fill-rule="nonzero"></path>
    <path fill="currentColor" d="M1.0093689,8.0749622 C0.451909848,8.0749622 0,8.51944308 0,9.06903369 L0,14.9298135 C0,15.478824 0.443353176,15.923885 1.0093689,15.923885 L4,15.923885 L9.37646484,19.6916936 C10.2772423,20.3229555 11,19.9530982 11,18.872049 L11,5.1267982 C11,4.0451514 10.2731186,3.67878158 9.37646484,4.30715352 L4,8.0749622 L1.0093689,8.0749622 Z"></path>
</svg>
`;
const volumeIconMedium = `
<svg class="${globalStyles.svg}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M14.8284271,14.8284271 C16.3905243,13.26633 16.3905243,10.73367 14.8284271,9.17157288 C14.4379028,8.78104858 13.8047379,8.78104858 13.4142136,9.17157288 C13.0236893,9.56209717 13.0236893,10.1952621 13.4142136,10.5857864 C14.1952621,11.366835 14.1952621,12.633165 13.4142136,13.4142136 C13.0236893,13.8047379 13.0236893,14.4379028 13.4142136,14.8284271 C13.8047379,15.2189514 14.4379028,15.2189514 14.8284271,14.8284271 Z" fill-rule="nonzero"></path>
    <path fill="currentColor" d="M17.6568542,17.6568542 C20.7810486,14.5326599 20.7810486,9.46734008 17.6568542,6.34314575 C17.26633,5.95262146 16.633165,5.95262146 16.2426407,6.34314575 C15.8521164,6.73367004 15.8521164,7.36683502 16.2426407,7.75735931 C18.5857864,10.1005051 18.5857864,13.8994949 16.2426407,16.2426407 C15.8521164,16.633165 15.8521164,17.26633 16.2426407,17.6568542 C16.633165,18.0473785 17.26633,18.0473785 17.6568542,17.6568542 Z" fill-rule="nonzero"></path>
    <path fill="currentColor" d="M1.0093689,8.0749622 C0.451909848,8.0749622 0,8.51944308 0,9.06903369 L0,14.9298135 C0,15.478824 0.443353176,15.923885 1.0093689,15.923885 L4,15.923885 L9.37646484,19.6916936 C10.2772423,20.3229555 11,19.9530982 11,18.872049 L11,5.1267982 C11,4.0451514 10.2731186,3.67878158 9.37646484,4.30715352 L4,8.0749622 L1.0093689,8.0749622 Z"></path>
</svg>
`;
const volumeIconHigh = `
<svg class="${globalStyles.svg}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M14.8284271,14.8284271 C16.3905243,13.26633 16.3905243,10.73367 14.8284271,9.17157288 C14.4379028,8.78104858 13.8047379,8.78104858 13.4142136,9.17157288 C13.0236893,9.56209717 13.0236893,10.1952621 13.4142136,10.5857864 C14.1952621,11.366835 14.1952621,12.633165 13.4142136,13.4142136 C13.0236893,13.8047379 13.0236893,14.4379028 13.4142136,14.8284271 C13.8047379,15.2189514 14.4379028,15.2189514 14.8284271,14.8284271 Z" fill-rule="nonzero"></path>
    <path fill="currentColor" d="M17.6568542,17.6568542 C20.7810486,14.5326599 20.7810486,9.46734008 17.6568542,6.34314575 C17.26633,5.95262146 16.633165,5.95262146 16.2426407,6.34314575 C15.8521164,6.73367004 15.8521164,7.36683502 16.2426407,7.75735931 C18.5857864,10.1005051 18.5857864,13.8994949 16.2426407,16.2426407 C15.8521164,16.633165 15.8521164,17.26633 16.2426407,17.6568542 C16.633165,18.0473785 17.26633,18.0473785 17.6568542,17.6568542 Z" fill-rule="nonzero"></path>
    <path fill="currentColor" d="M20.4852814,20.4852814 C25.1715729,15.7989899 25.1715729,8.20101013 20.4852814,3.51471863 C20.0947571,3.12419433 19.4615921,3.12419433 19.0710678,3.51471863 C18.6805435,3.90524292 18.6805435,4.5384079 19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C18.6805435,19.4615921 18.6805435,20.0947571 19.0710678,20.4852814 C19.4615921,20.8758057 20.0947571,20.8758057 20.4852814,20.4852814 Z" fill-rule="nonzero"></path>
    <path fill="currentColor" d="M1.0093689,8.0749622 C0.451909848,8.0749622 0,8.51944308 0,9.06903369 L0,14.9298135 C0,15.478824 0.443353176,15.923885 1.0093689,15.923885 L4,15.923885 L9.37646484,19.6916936 C10.2772423,20.3229555 11,19.9530982 11,18.872049 L11,5.1267982 C11,4.0451514 10.2731186,3.67878158 9.37646484,4.30715352 L4,8.0749622 L1.0093689,8.0749622 Z"></path>
</svg>
`;

class VolumeSlider extends BaseElement {
    constructor(meister) {
        super(meister);

        this.isDragging = false;
        this.mousedownY = 0;
        this.pagedownY = 0;

        this.element = document.createElement('div');
        this.classListAdd(this.element, globalStyles.uiElement, styles.volume);
        // Can't control volume on iOS when it's not playing inline
        if (this.meister.browser.isiOS && !this.meister.config.iosPlaysInline) {
            this.classListAdd(this.element, globalStyles.uiElementInactive);
        } else {
            this.classListAdd(this.element, globalStyles.uiElementActive);
        }

        this.volumeButton = document.createElement('div');
        this.classListAdd(this.volumeButton, styles.volumeButton);
        this.classListAdd(this.volumeButton, globalStyles.svg, styles.volumeMute);
        this.volumeButton.innerHTML = volumeIconMute;
        this.element.appendChild(this.volumeButton);

        this.sliderContainer = document.createElement('div');
        this.classListAdd(this.sliderContainer, styles.container, styles.isClosed);
        this.element.appendChild(this.sliderContainer);

        this.sliderInner = document.createElement('div');
        this.classListAdd(this.sliderInner, styles.inner);
        this.sliderContainer.appendChild(this.sliderInner);

        this.volumeBar = document.createElement('div');
        this.classListAdd(this.volumeBar, styles.volumeBar);
        this.sliderInner.appendChild(this.volumeBar);

        this.volumeBarFill = document.createElement('div');
        this.classListAdd(this.volumeBarFill, styles.volumeBarFill);
        this.volumeBar.appendChild(this.volumeBarFill);

        this.volumeBarFigure = document.createElement('div');
        this.classListAdd(this.volumeBarFigure, styles.volumeBarFigure);
        this.volumeBar.appendChild(this.volumeBarFigure);

        // Add volume event listeners.
        this.on('playerVolumeChange', () => this.onVolumeChange());
        this.on('playerLoadedMetadata', () => this.onVolumeChange());

        // Add mouse event listeners
        this.volumeButton.addEventListener('click', () => this.onClick());

        this.element.addEventListener('mouseover', () => this.showSlider(true));
        this.element.addEventListener('mouseleave', () => this.showSlider(false));

        this.sliderInner.addEventListener('mousedown', e => this.onDown(e));
        this.sliderInner.addEventListener('touchstart', e => this.onDown(e));

        this.onMove = (e) => {
            if (this.isDragging) {
                this.updateBar(e);
            }
        };

        this.onUp = (e) => {
            if (this.isDragging) {
                this.isDragging = false;

                if (e.target !== this.sliderInner) {
                    this.showSlider(false);
                }

                document.removeEventListener('mousemove', this.onMove);
                document.removeEventListener('mouseup', this.onUp);

                document.addEventListener('touchmove', this.onMove);
                document.addEventListener('touchend', this.onUp);
            }
        };
    }

    onDown(e) {
        // Prevents user from selecting the page.
        e.preventDefault();

        this.isDragging = true;

        if (window.TouchEvent && e instanceof window.TouchEvent) {
            this.pagedownY = e.touches[0].pageY;
            const rect = e.target.getBoundingClientRect();
            this.mousedownY = this.pagedownY - rect.top;
        } else {
            this.mousedownY = e.offsetY;
            this.pagedownY = e.pageY;
        }

        this.updateBar(e);

        document.addEventListener('mousemove', this.onMove);
        document.addEventListener('mouseup', this.onUp);

        document.addEventListener('touchmove', this.onMove);
        document.addEventListener('touchend', this.onUp);
    }

    showSlider(on) {
        if (this.isDragging) {
            return;
        }

        if (on) {
            this.classListAdd(this.sliderContainer, styles.isOpen);
            this.classListRemove(this.sliderContainer, styles.isClosed);
        } else {
            this.classListRemove(this.sliderContainer, styles.isOpen);
            this.classListAdd(this.sliderContainer, styles.isClosed);
        }
    }

    onClick() {
        this.meister.muted = !this.meister.muted;
        this.meister.trigger('playerVolumeChange');
    }

    onVolumeChange() {
        let normalizedProgress = this.meister.volume;

        if (this.meister.muted) {
            normalizedProgress = 0;
        }

        this.volumeBarFill.style.transform = `scaleY(${normalizedProgress})`;
        const bottomPercentage = 100 * normalizedProgress;
        this.volumeBarFigure.style.bottom = `${bottomPercentage}%`;

        this.updateIcon();
    }

    updateBar(e) {
        // Stop muting when the user changes the volume.
        this.meister.muted = false;

        let volume = this.normalizeEventPosition(e);

        if (volume > 1) {
            volume = 1;
        } else if (volume < 0) {
            volume = 0;
        }

        this.meister.volume = volume;
    }

    updateIcon() {
        const volume = this.meister.volume;
        let iconClass = styles.volumeMute;
        let iconSVG = volumeIconMute;

        if (this.meister.muted) {
            iconClass = styles.volumeMute;
            iconSVG = volumeIconMute;
        } else if (volume <= 0.33 && volume >= 0.01) {
            iconClass = styles.volumeLow;
            iconSVG = volumeIconLow;
        } else if (volume >= 0.33 && volume <= 0.66) {
            iconClass = styles.volumeMedium;
            iconSVG = volumeIconMedium;
        } else if (volume >= 0.66 && volume <= 1) {
            iconClass = styles.volumeHigh;
            iconSVG = volumeIconHigh;
        }

        this.classListRemove(
            this.volumeButton,
            styles.volumeMute,
            styles.volumeLow,
            styles.volumeMedium,
            styles.volumeHigh,
        );
        this.classListAdd(this.volumeButton, iconClass);
        this.volumeButton.innerHTML = iconSVG;
    }

    normalizeEventPosition(e) {
        let pageY = 0;
        if (window.TouchEvent && e instanceof window.TouchEvent) {
            pageY = e.touches[e.touches.length - 1].pageY;
        } else {
            pageY = e.pageY;
        }

        let position = pageY;
        position = this.mousedownY + (pageY - this.pagedownY);

        const progressCalculation = 1 - (position / this.volumeBar.offsetHeight);
        const normalizedProgress = Math.max(Math.min(progressCalculation, 1), 0);

        return normalizedProgress;
    }
}

export default VolumeSlider;
