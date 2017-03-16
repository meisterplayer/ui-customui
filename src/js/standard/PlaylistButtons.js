import BaseElement from './BaseElement';

class PlaylistButtons extends BaseElement {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-ui-wrapper-left');
        this.classListAdd(this.element, 'pf-ui-element-hidden');

        this.prevButton = document.createElement('div');
        this.classListAdd(this.prevButton, 'pf-ui-element');
        this.classListAdd(this.prevButton, 'pf-icon', 'pf-icon_icPrev');

        this.nextButton = document.createElement('div');
        this.classListAdd(this.nextButton, 'pf-ui-element');
        this.classListAdd(this.nextButton, 'pf-icon', 'pf-icon_icNext');

        this.prevButton.addEventListener('click', () => this.meister.trigger('playlistPrevious'));
        this.nextButton.addEventListener('click', () => this.meister.trigger('playlistNext'));

        this.element.appendChild(this.prevButton);
        this.element.appendChild(this.nextButton);

        this.on('playlistInfo', (playlistInfo) => this.onPlaylistInfo(playlistInfo));
    }

    onPlaylistInfo(playlistInfo) {
        // Reset the styles on the buttons.
        this.classListRemove(this.prevButton, 'pf-ui-element-inactive');
        this.classListRemove(this.nextButton, 'pf-ui-element-inactive');

        // Don't show playlist controls when there is no playlist.
        if (playlistInfo.length <= 1) {
            this.classListAdd(this.element, 'pf-ui-element-hidden');
            return;
        }

        // It's the first item, so can't go back.
        if (playlistInfo.currentIndex === 0) {
            this.classListAdd(this.prevButton, 'pf-ui-element-inactive');
            this.classListAdd(this.nextButton, 'pf-ui-element-active');
        }

        // It's the last item, so can't skip to the next item.
        if (playlistInfo.currentIndex >= playlistInfo.length - 1) {
            this.classListAdd(this.prevButton, 'pf-ui-element-active');
            this.classListAdd(this.nextButton, 'pf-ui-element-inactive');
        }

        // Show the playlist buttons.
        this.classListRemove(this.element, 'pf-ui-element-hidden');
    }
}

export default PlaylistButtons;
