import BaseElement from '../BaseElement';
import styles from './styles.scss';
import globalStyles from '../global-styles.scss';

const LIVE_THRESHOLD = 35;

class TimeDisplay extends BaseElement {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');
        this.classListAdd(this.element, globalStyles.uiElement, styles.container);
        // HACK: dirty microsoft
        if (this.meister.browser.isIE || this.meister.browser.isEdge) {
            this.classListAdd(this.element, 'microsoft-hack');
        }

        this.currentTime = document.createElement('span');
        this.currentTime.innerHTML = '0:00';
        this.classListAdd(this.currentTime, styles.currentTime);

        this.seperator = document.createElement('span');
        this.seperator.innerHTML = '/';
        this.classListAdd(this.seperator, styles.seperator);

        this.duration = document.createElement('span');
        this.duration.innerHTML = '0:00';
        this.classListAdd(this.duration, styles.duration);
        this.duration.addEventListener('click', () => this.meister.trigger('requestGoLive'));

        this.element.appendChild(this.currentTime);
        this.element.appendChild(this.seperator);
        this.element.appendChild(this.duration);

        this.isLive = false;

        this.on('itemTimeInfo', timeInfo => this.onItemTimeInfo(timeInfo));
        this.on('playerTimeUpdate', e => this.onTimeUpdate(e));
        this.on('playerSeek', e => this.onPlayerSeek(e));

        // Ad variables.
        this.adTimer = null;
        this.adDuration = 0;
    }

    onItemUnloaded() {
        this.isLive = false;
        this.classListRemove(this.duration, 'go-live', globalStyles.uiElementActive);

        this.currentTime.innerHTML = '-';
        this.duration.innerHTML = '-';
    }

    onItemTimeInfo(timeInfo) {
        if (timeInfo.isLive) {
            this.isLive = true;
            this.duration.innerHTML = 'LIVE';

            if (!timeInfo.hasDVR) this.currentTime.innerHTML = '-';
        } else {
            this.duration.innerHTML = this.createTimeString(timeInfo.duration);
        }
    }

    onTimeUpdate(e) {
        // Set the duration and current time for VODs
        if (!this.isLive) {
            this.currentTime.innerHTML = this.createTimeString(e.currentTime);
            this.duration.innerHTML = this.createTimeString(e.duration);
            return;
        }

        // If a livestream is close enough to the edge display no time.
        const behindLive = e.duration - e.currentTime;

        if (behindLive < LIVE_THRESHOLD) {
            this.currentTime.innerHTML = '-';
            this.classListRemove(this.duration, 'go-live', globalStyles.uiElementActive);
        }
    }

    onPlayerSeek(e) {
        // Set the duration and current time for VODs
        if (!this.isLive) {
            this.currentTime.innerHTML = this.createTimeString(e.currentTime);
            this.duration.innerHTML = this.createTimeString(e.duration);
            return;
        }

        const behindLive = e.duration - e.currentTime;
        if (behindLive < LIVE_THRESHOLD) {
            this.currentTime.innerHTML = '-';
            this.classListRemove(this.duration, 'go-live', globalStyles.uiElementActive);
            return;
        }

        // Display the amount of time the player is behind live.
        const timeString = this.createTimeString(behindLive);
        this.currentTime.innerHTML = `-${timeString}`;

        // Activate the go live button.
        this.classListAdd(this.duration, 'go-live', globalStyles.uiElementActive);
    }

    createTimeString(time) {
        let roundTime = Math.round(time);
        if (roundTime < 0) {
            roundTime = 0;
        }

        return this.meister.utils.timeToHMS(roundTime);
    }
}

export default TimeDisplay;
