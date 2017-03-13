import BaseElement from './BaseElement';
import SeekbarPreview from './SeekBarPreview';

function updateBar(element, percentage) {
    element.style.webkitTransform = `scaleX(${percentage})`; //eslint-disable-line
    element.style.transform = `scaleX(${percentage})`; //eslint-disable-line
}

class SeekBar extends BaseElement {
    constructor(meister) {
        super(meister);

        this.isDragging = false;

        this.loadedMetadata = false;

        this.mousedownX = 0;
        this.pagedownX = 0;

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-seek-bar-wrapper');

        this.seekBarPadding = document.createElement('div');
        this.classListAdd(this.seekBarPadding, 'pf-seek-bar-padding');
        this.element.appendChild(this.seekBarPadding);

        this.seekBarDuration = document.createElement('div');
        this.classListAdd(this.seekBarDuration, 'pf-seek-bar', 'duration');
        this.element.appendChild(this.seekBarDuration);

        this.seekBarBuffered = document.createElement('div');
        this.classListAdd(this.seekBarBuffered, 'pf-seek-bar', 'buffered');
        this.element.appendChild(this.seekBarBuffered);
        this.seekBarBuffered.style.transform = 'scaleX(0)';

        this.seekBarFill = document.createElement('div');
        this.classListAdd(this.seekBarFill, 'pf-seek-bar', 'fill');
        this.element.appendChild(this.seekBarFill);
        this.seekBarFill.style.transform = 'scaleX(0)';

        this.seekBarHighlight = document.createElement('div');
        this.classListAdd(this.seekBarHighlight, 'pf-seek-bar', 'highlight');
        this.element.appendChild(this.seekBarHighlight);
        this.seekBarHighlight.style.transform = 'scaleX(0)';

        this.seekBarFigure = document.createElement('div');
        this.classListAdd(this.seekBarFigure, 'pf-seek-bar-figure');
        this.seekBarDuration.appendChild(this.seekBarFigure);
        this.seekBarFigure.style.left = '0%';

        this.preview = new SeekbarPreview(meister);
        this.seekBarDuration.appendChild(this.preview.getNode());

        this.on('itemTimeInfo', (timeInfo) => this.onItemTimeInfo(timeInfo));
        this.on('playerTimeUpdate', (e) => this.onTimeUpdate(e));
        this.on('playerSeek', (e) => this.onPlayerSeek(e));
        this.on('playerProgress', (e) => this.onPlayerProgress(e));
        this.on('playerLoadedMetadata', () => { this.loadedMetadata = true; });

        // Ad events.
        this.points = {};
        this.on('adCuePoints', (info) => this.onAdCuePoints(info));
        this.on('adEnded', (info) => this.onAdEnded(info));

        // Mouse hover events.
        this.seekBarPadding.addEventListener('mouseover', (e) => this.onMouseOver(e));
        this.seekBarPadding.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.seekBarPadding.addEventListener('mouseout', () => this.onMouseOut());

        // Seeking event listeners.
        this.seekBarPadding.addEventListener('mousedown', (e) => this.onSeekDown(e));
        this.seekBarPadding.addEventListener('touchstart', (e) => this.onSeekDown(e));

        this.onSeekMove = (e) => {
            // Prevent the page from moving while scrubbing
            e.preventDefault();

            // Get the location in the page, hacky for touch events...
            const normalizedProgress = this.normalizeEventPosition(e);

            if (this.isDragging) {
                updateBar(this.seekBarFill, normalizedProgress);
                updateBar(this.seekBarHighlight, normalizedProgress);
                this.updateFigure(normalizedProgress);
                this.preview.update(normalizedProgress);
                this.updateCurrentTime(normalizedProgress);
            }
        };

        this.onSeekUp = (e) => {
            // Do nothing when a second touch ends.
            if (window.TouchEvent && e instanceof window.TouchEvent && e.touches.length > 0) {
                return;
            }

            if (this.isDragging) {
                // Resume video
                if (this.wasPlaying) this.meister.play();

                this.isDragging = false;

                // Always hide the preview on mobile.
                if (window.TouchEvent && e instanceof window.TouchEvent) {
                    this.preview.hide();
                } else if (e.target !== this.seekBarPadding) {
                    this.preview.hide();
                }

                document.removeEventListener('mousemove', this.onSeekMove);
                document.removeEventListener('mouseup', this.onSeekUp);

                document.removeEventListener('touchmove', this.onSeekMove);
                document.removeEventListener('touchend', this.onSeekUp);
            }
        };
    }

    onItemUnloaded() {
        this.loadedMetadata = false;

        this.seekBarBuffered.style.transform = 'scaleX(0)';
        this.seekBarHighlight.style.transform = 'scaleX(0)';
        this.seekBarFill.style.transform = 'scaleX(0)';
        this.seekBarFigure.style.left = '0%';

        Object.keys(this.points).forEach((adID) => {
            if (this.points[adID] !== null) {
                this.points[adID].remove();
            }
        });

        this.points = {};
        this.classListAdd(this.element, 'pf-ui-element-hidden');
    }

    onItemTimeInfo(timeInfo) {
        if (timeInfo.isLive && !timeInfo.hasDVR) {
            this.classListAdd(this.element, 'pf-ui-element-hidden');
        } else {
            this.classListRemove(this.element, 'pf-ui-element-hidden');
        }
    }

    onTimeUpdate(e) {
        const normalizedProgress = e.currentTime / e.duration;

        updateBar(this.seekBarFill, normalizedProgress);
        this.updateFigure(normalizedProgress);
    }

    onPlayerProgress(e) {
        if (!e) return;

        const timeRanges = e.buffered;
        const currentTimeRangeIndex = this.findTimerange(timeRanges);

        // Should we not get an index don't bother updating.
        if (currentTimeRangeIndex === -1) {
            return;
        }

        let duration = this.meister.duration;
        let targetTime = timeRanges.end(currentTimeRangeIndex);

        if (this.playOffset) {
            targetTime -= this.playOffset;
            duration -= this.playOffset;
        }

        const normalizedProgress = targetTime / duration;
        updateBar(this.seekBarBuffered, normalizedProgress);
    }

    // Mouse hover events.
    onMouseOver(e) {
        if (window.TouchEvent && e instanceof window.TouchEvent) {
            this.pagedownX = e.touches[0].pageX;
            const rect = e.target.getBoundingClientRect();
            this.mousedownX = this.pagedownX - rect.left;
        } else {
            this.mousedownX = e.offsetX;
            this.pagedownX = e.pageX;
        }

        this.preview.show();
    }

    onMouseMove(e) {
        const normalizedProgress = this.normalizeEventPosition(e);

        updateBar(this.seekBarHighlight, normalizedProgress);
        this.preview.update(normalizedProgress);
    }

    onMouseOut() {
        // Reset the highlight bar.
        updateBar(this.seekBarHighlight, 0);

        if (!this.isDragging) {
            this.preview.hide();
        }
    }

    // Seeking event handles.
    onSeekDown(e) {
        // Prevents user from selecting the page.
        e.preventDefault();

        // Get the preview to show and update.
        this.onMouseOver(e);
        this.onMouseMove(e);

        // Pause video
        this.wasPlaying = this.meister.playing;
        this.meister.pause();

        this.isDragging = true;

        // Get the location in the page, hacky for touch events...
        const normalizedProgress = this.normalizeEventPosition(e);

        updateBar(this.seekBarFill, normalizedProgress);
        this.updateFigure(normalizedProgress);
        this.updateCurrentTime(normalizedProgress);

        document.addEventListener('mousemove', this.onSeekMove);
        document.addEventListener('mouseup', this.onSeekUp);

        document.addEventListener('touchmove', this.onSeekMove);
        document.addEventListener('touchend', this.onSeekUp);
    }

    // Player seeked, update the seekbar.
    onPlayerSeek(e) {
        const normalizedProgress = e.relativePosition;

        updateBar(this.seekBarFill, normalizedProgress);
        updateBar(this.seekBarHighlight, normalizedProgress);
        this.updateFigure(normalizedProgress);
    }

    // Ad event handles/
    onAdCuePoints(info) {
        for (let i = 0; i < info.points.length; i++) {
            this.setPoint(info.points[i]);
        }
    }

    setPoint(time) {
        const self = this;

        function createPoint(t) {
            const elem = document.createElement('div');
            let normalizedProgress = t / self.meister.duration;

            self.meister.elementUtils.classListAdd(elem, 'pf-seek-bar-point', 'pf-ad-point');
            elem.id = `adpoint-${t}`;

            if (t < 0) {
                normalizedProgress = 1;
            }

            const pointPosition = 100 * normalizedProgress;
            elem.style.left = `${pointPosition}%`;

            self.seekBarDuration.appendChild(elem);
            self.points[`adpoint-${t}`] = elem;
        }

        if (!this.loadedMetadata) {
            this.one('playerLoadedMetadata', () => {
                createPoint(time);
            });
        } else {
            createPoint(time);
        }
    }

    onAdEnded(info) {
        const adPodInfo = info.ad.getAdPodInfo();

        // Remove it on the end of the first ad in the break, because is simpler.
        const element = document.getElementById(`adpoint-${adPodInfo.getTimeOffset()}`);
        delete this.points[`adpoint-${adPodInfo.getTimeOffset()}`];

        if (element !== null) {
            element.remove();
        }
    }

    // 'Private' methods.
    normalizeEventPosition(e) {
        let pageX = 0;
        if (window.TouchEvent && e instanceof window.TouchEvent) {
            pageX = e.touches[e.touches.length - 1].pageX;
        } else {
            pageX = e.pageX;
        }

        let position = pageX;
        position = this.mousedownX + (pageX - this.pagedownX);

        let normalizedProgress = position / this.seekBarPadding.offsetWidth;

        // Stay within the boundaries
        if (normalizedProgress > 1.0) {
            normalizedProgress = 1.0;
        } else if (normalizedProgress < 0) {
            normalizedProgress = 0;
        }

        return normalizedProgress;
    }

    updateFigure(percentage) {
        const figureLeftPercentage = 100 * percentage;
        this.seekBarFigure.style.left = `${figureLeftPercentage}%`;
    }

    updateCurrentTime(percentage) {
        this.meister.trigger('requestSeek', {
            relativePosition: percentage,
        });
    }

    findTimerange(timeRanges) {
        for (let i = 0; i < timeRanges.length; i++) {
            if (this.meister.currentTime >= timeRanges.start(i)
                && this.meister.currentTime <= timeRanges.end(i)
            ) {
                return i;
            }
        }

        // No range was found
        return -1;
    }
}

export default SeekBar;
