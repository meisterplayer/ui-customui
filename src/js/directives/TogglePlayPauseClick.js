import ProtoDirective from './ProtoDirective';

class TogglePlayPauseClick extends ProtoDirective {
    constructor(meister, config, element) {
        super(meister, config, element);

        this.isLive = false;

        // Taken from StandardUi
        this.meister.config.playPauseOnScreenClick = this.meister.config.playPauseOnScreenClick === undefined ? true : this.meister.config.playPauseOnScreenClick;

        this.onElementClick = this.onElementClick.bind(this);
        this.element = element;

        this.element.addEventListener('click', this.onElementClick);

        this.meister.on('itemTimeInfo', (timeInfo) => {
            this.isLive = timeInfo.isLive;
        });
    }

    onElementClick(e) {
        // Don't use this directive on mobile devices since these are annoying for users.
        if (this.meister.browser.isMobile) {
            return;
        }

        if (!this.meister.config.playPauseOnScreenClick) {
            return;
        }

        // Ignore clicks on child elements.
        if (e.target !== this.element) {
            return;
        }

        if (this.meister.playing) {
            this.meister.pause(true);
        } else {
            this.meister.play(true);
        }
    }

    unload() {
        this.element.removeEventListener(this.onElementClick);
    }
}

export default TogglePlayPauseClick;
