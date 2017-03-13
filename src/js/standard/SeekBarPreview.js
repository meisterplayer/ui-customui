import BaseElement from './BaseElement';

class SeekbarPreview extends BaseElement {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-seek-bar-preview', 'no-preview');
        this.classListAdd(this.element, 'pf-ui-element-hidden');

        this.seekBarPreviewImage = document.createElement('img');
        this.classListAdd(this.seekBarPreviewImage, 'pf-seek-bar-preview-image');
        this.seekBarPreviewImage.src = '';
        this.element.appendChild(this.seekBarPreviewImage);

        this.seekBarPreviewTime = document.createElement('span');
        this.seekBarPreviewTime.textContent = '0:00';
        this.classListAdd(this.seekBarPreviewTime, 'pf-seek-bar-preview-time');
        this.element.appendChild(this.seekBarPreviewTime);

        this.images = [];

        this.on('itemTimeInfo', (timeInfo) => this.onItemTimeInfo(timeInfo));

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
        this.classListRemove(this.element, 'pf-ui-element-hidden');
    }

    hide() {
        this.classListAdd(this.element, 'pf-ui-element-hidden');
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
        this.seekBarPreviewImage.src = this.getImageByTime(time);

        if (this.modifiedDuration) {
            time = this.modifiedDuration - time;
            const timeString = this.meister.utils.timeToHMS(Math.round(time));
            this.seekBarPreviewTime.textContent = `-${timeString}`;
        } else {
            this.seekBarPreviewTime.textContent = this.meister.utils.timeToHMS(Math.round(time));
        }
    }

    getImageByTime(time) {
        if (this.images.length === 0) {
            return '';
        }

        for (let i = 0; i < this.images.length; i++) {
            const image = this.images[i];

            if (image.start <= time && image.end >= time) {
                return image.src;
            }
        }

        return this.images[this.images.length - 1].src;
    }
}

export default SeekbarPreview;
