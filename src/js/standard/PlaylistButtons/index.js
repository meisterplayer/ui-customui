import BaseElement from '../BaseElement';
import styles from './styles.scss';
import prevIcon from '../icons/prev';
import nextIcon from '../icons/next';
import globalStyles from '../global-styles.scss';

const prevIconSVG = prevIcon();
const nextIconSVG = nextIcon();


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
