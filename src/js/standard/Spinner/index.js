import BaseElement from '../BaseElement';
import styles from './styles.scss';

class Spinner extends BaseElement {
    constructor(meister) {
        super(meister);

        this.meister = meister;

        this.element = document.createElement('div');
        this.classListAdd(this.element, styles.container);

        this.spinner = document.createElement('div');
        this.classListAdd(this.spinner, styles.spinner);
        this.element.appendChild(this.spinner);

        this.spinnerMessage = document.createElement('div');
        this.classListAdd(this.spinnerMessage, styles.message);
        this.element.appendChild(this.spinnerMessage);

        // Register events.
        this.on('playerBufferedEnough', () => this.hideSpinner(true));
        this.on('playerPause', () => this.hideSpinner());
        this.on('itemUnloaded', () => this.hideSpinner());
        this.on('playerPlay', () => this.hideSpinner());
        this.on('showLoading', e => this.showSpinner(e));
        this.on('hideLoading', () => this.hideSpinner());
    }

    showSpinner(e) {
        this.classListRemove(this.element, styles.hidden);
        this.classListRemove(this.spinner, styles.hidden);

        if (e && e.message) {
            this.spinnerMessage.innerHTML = e.message;
            this.classListRemove(this.spinnerMessage, styles.hidden);
        } else if (e && e.code) {
            this.spinnerMessage.innerHTML = this.meister.Localization.get(e.code);
            this.classListRemove(this.spinnerMessage, styles.hidden);
        }
    }

    hideSpinner(fromBuffering) {
        // HACK quick fix so other hides don't hide buffering indicator
        if (this.spinnerMessage.innerHTML === 'Buffering...' && !fromBuffering) {
            return;
        }

        this.classListAdd(this.element, styles.hidden);
        this.classListAdd(this.spinner, styles.hidden);
        this.classListAdd(this.spinnerMessage, styles.hidden);
    }
}

export default Spinner;
