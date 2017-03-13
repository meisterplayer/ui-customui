import BaseElement from './BaseElement';

class VolumeSlider extends BaseElement {
    constructor(meister) {
        super(meister);

        this.isDragging = false;
        this.mousedownX = 0;
        this.pagedownX = 0;

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-left');
        // Can't control volume on iOS when it's not playing inline
        if (this.meister.browser.isiOS && !this.meister.config.iosPlaysInline) {
            this.classListAdd(this.element, 'pf-ui-element-inactive');
        } else {
            this.classListAdd(this.element, 'pf-ui-element-active');
        }

        this.volumeButton = document.createElement('div');
        this.classListAdd(this.volumeButton, 'pf-volume-button');
        this.classListAdd(this.volumeButton, 'icon', 'icon_icVol0');
        this.element.appendChild(this.volumeButton);

        this.sliderWrapper = document.createElement('div');
        this.classListAdd(this.sliderWrapper, 'pf-volume-slider-wrapper');
        this.element.appendChild(this.sliderWrapper);

        this.volumeBar = document.createElement('div');
        this.classListAdd(this.volumeBar, 'pf-volume-slider', 'close');
        this.sliderWrapper.appendChild(this.volumeBar);

        this.volumeBarFill = document.createElement('div');
        this.classListAdd(this.volumeBarFill, 'pf-volume-slider-fill');
        this.volumeBar.appendChild(this.volumeBarFill);

        this.volumeBarFigure = document.createElement('div');
        this.classListAdd(this.volumeBarFigure, 'pf-volume-slider-figure');
        this.volumeBar.appendChild(this.volumeBarFigure);

        // Add volume event listeners.
        this.on('playerVolumeChange', () => this.onVolumeChange());
        this.on('playerLoadedMetadata', () => this.onVolumeChange());

        // Add mouse event listeners
        this.volumeButton.addEventListener('click', () => this.onClick());

        this.element.addEventListener('mouseover', () => this.showSlider(true));
        this.element.addEventListener('mouseleave', () => this.showSlider(false));

        this.sliderWrapper.addEventListener('mousedown', (e) => this.onDown(e));
        this.sliderWrapper.addEventListener('touchstart', (e) => this.onDown(e));

        this.onMove = (e) => {
            if (this.isDragging) {
                this.updateBar(e);
            }
        };

        this.onUp = (e) => {
            if (this.isDragging) {
                this.isDragging = false;

                if (e.target !== this.sliderWrapper) {
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
            this.pagedownX = e.touches[0].pageX;
            const rect = e.target.getBoundingClientRect();
            this.mousedownX = this.pagedownX - rect.left;
        } else {
            this.mousedownX = e.offsetX;
            this.pagedownX = e.pageX;
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
            this.classListAdd(this.volumeBar, 'open');
            this.classListRemove(this.volumeBar, 'close');
        } else {
            this.classListRemove(this.volumeBar, 'open');
            this.classListAdd(this.volumeBar, 'close');
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

        this.volumeBarFill.style.transform = `scaleX(${normalizedProgress})`;
        const leftPercentage = 100 * normalizedProgress;
        this.volumeBarFigure.style.left = `${leftPercentage}%`;

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

    clearIcons() {
        for (let i = 0; i <= 3; i++) {
            this.classListRemove(this.volumeButton, `icon_icVol${i}`);
        }
    }

    updateIcon() {
        this.clearIcons();

        const volume = this.meister.volume;
        let iconNum = 0;

        if (this.meister.muted) {
            iconNum = 0;
        } else if (volume <= 0.25 && volume >= 0.01) {
            iconNum = 1;
        } else if (volume >= 0.25 && volume <= 0.66) {
            iconNum = 2;
        } else if (volume >= 0.66 && volume <= 1) {
            iconNum = 3;
        }

        this.classListAdd(this.volumeButton, `icon_icVol${iconNum}`);
    }

    normalizeEventPosition(e) {
        let pageX = 0;
        if (window.TouchEvent && e instanceof window.TouchEvent) {
            pageX = e.touches[e.touches.length - 1].pageX;
        } else {
            pageX = e.pageX;
        }

        let position = pageX;
        position = this.mousedownX + (pageX - this.pagedownX);

        let normalizedProgress = position / this.volumeBar.offsetWidth;

        // Stay within the boundaries
        if (normalizedProgress > 1.0) {
            normalizedProgress = 1.0;
        } else if (normalizedProgress < 0) {
            normalizedProgress = 0;
        }

        return normalizedProgress;
    }
}

export default VolumeSlider;
