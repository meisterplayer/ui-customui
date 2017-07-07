/**
 * Directive used to autohide the UI.
 */

let TIME_TILL_FADE = 3000;

class AutoHideShowControls {

    constructor(meister, config) {
        this.config = config; // this is htmlUI config!
        this.meister = meister;

        if (Number.isFinite(this.config.timeToFade)) {
            TIME_TILL_FADE = this.config.timeToFade * 1000;
        }

        // Bind class methods to instance for easier event listener removal.
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

        this.mouseTimeout = null;
        this.controlsTimeout = null;
        this.isControlsShown = false;

        this.fixedControls = !!this.config.fixedControls;
        this.toggleFixedControls(this.fixedControls);
    }


    toggleFixedControls(on) {
        if (on) {
            this.meister.container.removeEventListener('mousedown', this.onMouseDown);
            this.meister.container.removeEventListener('touchstart', this.onMouseDown);

            this.meister.container.removeEventListener('mousemove', this.onMouseMove);
            this.meister.container.removeEventListener('touchmove', this.onMouseMove);
            this.meister.container.removeEventListener('mouseleave', this.onMouseLeave);

            this.showControls();
            this.showCursor();
        } else {
            this.meister.container.addEventListener('mousedown', this.onMouseDown);
            this.meister.container.addEventListener('touchstart', this.onMouseDown);

            this.meister.container.addEventListener('mousemove', this.onMouseMove);
            this.meister.container.addEventListener('touchmove', this.onMouseMove);
            this.meister.container.addEventListener('mouseleave', this.onMouseLeave);

            // Start hide countdown.
            this.mouseTimeout = setTimeout(this.hideCursor.bind(this), TIME_TILL_FADE);
            this.controlsTimeout = setTimeout(this.hideControls.bind(this), TIME_TILL_FADE);
        }
    }

    hideCursor() {
        if (this.dragging) {
            return;
        }
        this.meister.trigger('uiEvent:hideCursor', {});
    }

    showCursor() {
        this.meister.trigger('uiEvent:showCursor', {});
    }

    hideControls() {
        if (this.dragging || !this.meister.playing) {
            return;
        }
        this.meister.trigger('uiEvent:hideControls', {});
    }

    showControls() {
        this.meister.trigger('uiEvent:showControls', {});
    }

    /* Events */
    onMouseDown() {
        this.dragging = true;
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('touchend', this.onMouseUp);
    }

    onMouseUp() {
        this.dragging = false;
        // Fake mouse movement
        this.onMouseMove();

        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('touchend', this.onMouseUp);
    }

    onMouseMove() {
        clearTimeout(this.mouseTimeout);
        clearTimeout(this.controlsTimeout);

        this.showControls();
        this.showCursor();

        this.mouseTimeout = setTimeout(this.hideCursor.bind(this), TIME_TILL_FADE);
        this.controlsTimeout = setTimeout(this.hideControls.bind(this), TIME_TILL_FADE);
    }

    onMouseLeave() {
        clearTimeout(this.mouseTimeout);
        clearTimeout(this.controlsTimeout);

        this.hideControls();
        this.showCursor();
    }


}

const autoHideShow = (meister, config) => {
    new AutoHideShowControls(meister, config);
};

export default autoHideShow;
