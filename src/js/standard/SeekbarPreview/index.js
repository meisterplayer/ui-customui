import BaseElement from '../BaseElement';
import styles from './styles.scss';

class SeekbarPreview extends BaseElement {
    constructor(meister) {
        super(meister);

        // preview element
        this.element = document.createElement('div');
        this.classListAdd(
            this.element,
            styles.container,
            styles.isHidden,
        );

        // seekbar preview image
        this.seekbarPreviewImage = document.createElement('img');
        this.classListAdd(this.seekbarPreviewImage, 'pf-seek-bar-preview-image');
        this.element.appendChild(this.seekbarPreviewImage);

        // seekbar preview time
        this.seekbarPreviewTime = document.createElement('span');
        this.seekbarPreviewTime.textContent = '0:00';
        this.classListAdd(this.seekbarPreviewTime, styles.previewTime);
        this.element.appendChild(this.seekbarPreviewTime);

        this.images = [];

        this.on('itemTimeInfo', timeInfo => this.onItemTimeInfo(timeInfo));

        this.on('itemImagestream', (info) => {
            this.images = info.images;
            this.classListRemove(this.element, 'no-preview');
        });
    }

    onItemUnloaded() {
        this.isLive = false;
        this.modifiedDuration = null;
        // Reset filmstrip
        this.images = [];
        this.classListAdd(this.element, 'no-preview');
    }

    onItemTimeInfo(timeInfo) {
        // Special case for DASH dvr
        if (timeInfo.isLive) {
            this.isLive = true;
            this.modifiedDuration = timeInfo.duration;
        }
    }

    show() {
        this.classListRemove(this.element, styles.isHidden);
    }

    hide() {
        this.classListAdd(this.element, styles.isHidden);
    }

    update(percentage) {
        const offsetWidth = this.element.offsetWidth;
        const offsetParentWidth = this.element.offsetParent.offsetWidth;
        const rightBoundary = offsetParentWidth - offsetWidth;

        // Calculate how much the preview needs to move to the right.
        let pixelsRight = (offsetParentWidth * percentage) - (offsetWidth / 2);

        // Make it stay within the player.
        if (pixelsRight < 0) {
            pixelsRight = 0;
        } else if (pixelsRight > rightBoundary) {
            pixelsRight = rightBoundary;
        }

        this.element.style.transform = `translate(${pixelsRight}px)`;

        let time = (this.modifiedDuration || this.meister.duration) * percentage;
        const image = this.getImageByTime(time);

        if (image) {
            this.seekbarPreviewImage.src = image;
        }

        if (this.modifiedDuration) {
            time = this.modifiedDuration - time;
            const timeString = this.meister.utils.timeToHMS(Math.round(time));
            this.seekbarPreviewTime.textContent = `-${timeString}`;
        } else {
            this.seekbarPreviewTime.textContent = this.meister.utils.timeToHMS(Math.round(time));
        }
    }

    /**
     * Find the image src for a particular timestamp. Defaults to the last
     * image if no matching image is found.
     * @param {Number} time
     * @returns {String}
     */
    getImageByTime(time) {
        if (this.images.length === 0) {
            return '';
        }

        const imageForTime = this.images.find(image => image.start <= time && image.end >= time);

        if (imageForTime) {
            return imageForTime.src;
        }

        return this.images[this.images.length - 1].src;
    }
}

export default SeekbarPreview;
