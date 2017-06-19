import BaseElement from '../BaseElement';
import styles from './styles.scss';
import globalStyles from '../global-styles.scss';

const prevIconSVG = `
<svg class="${globalStyles.svg}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M8.42024541,11.3085619 C7.85666375,11.6897833 7.86318212,12.3122745 8.42024541,12.6890866 L18.9795451,19.8316732 C19.5431268,20.2128946 20,19.9252466 20,19.1843471 L20,4.81330147 C20,4.07457175 19.5366084,3.78916316 18.9795451,4.16597534 L8.42024541,11.3085619 Z M7,5.00087166 C7,4.4481055 6.55733967,4 6.00104344,4 L4.99895656,4 C4.44724809,4 4,4.44463086 4,5.00087166 L4,18.9991283 C4,19.5518945 4.44266033,20 4.99895656,20 L6.00104344,20 C6.55275191,20 7,19.5553691 7,18.9991283 L7,5.00087166 Z"></path>
</svg>
`;

const nextIconSVG = `
<svg class="${globalStyles.svg}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M15.5797546,11.3085619 C16.1433363,11.6897833 16.1368179,12.3122745 15.5797546,12.6890866 L5.02045486,19.8316732 C4.4568732,20.2128946 4,19.9252466 4,19.1843471 L4,4.81330147 C4,4.07457175 4.46339158,3.78916316 5.02045486,4.16597534 L15.5797546,11.3085619 Z M17,5.00087166 C17,4.4481055 17.4426603,4 17.9989566,4 L19.0010434,4 C19.5527519,4 20,4.44463086 20,5.00087166 L20,18.9991283 C20,19.5518945 19.5573397,20 19.0010434,20 L17.9989566,20 C17.4472481,20 17,19.5553691 17,18.9991283 L17,5.00087166 Z"></path>
</svg>
`;


class PlaylistPreviousButton extends BaseElement {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');
        this.classListAdd(
            this.element,
            globalStyles.uiElement,
            globalStyles.uiElementHidden,
            globalStyles.icon,
            styles.previousIcon,
        );
        this.element.innerHTML = prevIconSVG;

        this.element.addEventListener('click', () => this.meister.trigger('playlistPrevious'));

        this.on('playlistInfo', playlistInfo => this.onPlaylistInfo(playlistInfo));
    }

    onPlaylistInfo(playlistInfo) {
        // Reset the styles on the buttons.
        this.classListRemove(this.element, globalStyles.uiElementInactive);

        // Don't show playlist controls when there is no playlist.
        if (playlistInfo.length <= 1) {
            this.classListAdd(this.element, globalStyles.uiElementHidden);
            return;
        }

        // It's the first item, so can't go back.
        if (playlistInfo.currentIndex === 0) {
            this.classListAdd(this.element, globalStyles.uiElementInactive);
        }

        // It's the last item, so can't skip to the next item.
        if (playlistInfo.currentIndex >= playlistInfo.length - 1) {
            this.classListAdd(this.element, globalStyles.uiElementActive);
        }

        // Show the playlist buttons.
        this.classListRemove(this.element, globalStyles.uiElementHidden);
    }
}

class PlaylistNextButton extends BaseElement {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');
        this.classListAdd(
            this.element,
            globalStyles.uiElement,
            globalStyles.uiElementHidden,
            globalStyles.icon,
            styles.nextIcon,
        );
        this.element.innerHTML = nextIconSVG;


        this.element.addEventListener('click', () => this.meister.trigger('playlistNext'));

        this.on('playlistInfo', playlistInfo => this.onPlaylistInfo(playlistInfo));
    }

    onPlaylistInfo(playlistInfo) {
        // It's the first item, so can't go back.
        if (playlistInfo.currentIndex === 0) {
            this.classListAdd(this.element, globalStyles.uiElementActive);
        }

        // It's the last item, so can't skip to the next item.
        if (playlistInfo.currentIndex >= playlistInfo.length - 1) {
            this.classListAdd(this.element, globalStyles.uiElementInactive);
        }

        // Show the playlist buttons.
        this.classListRemove(this.element, globalStyles.uiElementHidden);
    }
}

export { PlaylistPreviousButton };
export { PlaylistNextButton };
