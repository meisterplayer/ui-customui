import BaseElement from '../BaseElement';
import styles from './styles.scss';
import { volumeMuteIcon, volumeLowIcon, volumeMediumIcon, volumeHighIcon } from '../icons/volume';
import globalStyles from '../global-styles.scss';

const volumeIconMute = volumeMuteIcon();
const volumeIconLow = volumeLowIcon();
const volumeIconMedium = volumeMediumIcon();
const volumeIconHigh = volumeHighIcon();

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

        if (this.meister.browser.isiOS) {
            this.classListAdd(this.sliderContainer, styles.container, styles.isClosed, globalStyles.uiElementHidden);
        } else {
            this.classListAdd(this.sliderContainer, styles.container, styles.isClosed);
        }

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
