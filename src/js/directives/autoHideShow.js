/** @module AutoHideShowControls
* Directive used to autohide the UI. Can be instantiated by setting data-mstr-directive="autoHideShow" on an element.
*/

let TIME_TILL_FADE = 3000;

class AutoHideShowControls {

    /**
     * Create a new AutoHideShowControls.
     * @memberof module:HtmlUi
     * @param {Meister} meister Meister instance which is instantiating a new HtmlUi.
     * @param {Object} config Configuration of the HtmlUI Plugin.
     */
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

    /**
     * Set's the events on the meister-container
     * @param {Boolean} on whether the UI should autohide, can be set by the config-option `fixedControls`
     * @return {null}
     */
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

    /**
     * Callback for hideCursor-Event, triggers a Meister-event
     * @return {null}
     */
    hideCursor() {
        if (this.dragging) {
            return;
        }
        this.meister.trigger('uiEvent:hideCursor', {});
    }

    /**
     * Callback for showCursor-Event, triggers a Meister-event
     * @return {null}
     */
    showCursor() {
        this.meister.trigger('uiEvent:showCursor', {});
    }

    /**
     * Callback for hideControls-Event, triggers a Meister-event
     * @return {null}
     */
    hideControls() {
        if (this.dragging || !this.meister.playing) {
            return;
        }
        this.meister.trigger('uiEvent:hideControls', {});
    }

    /**
     * Callback for showControls-Event, triggers a Meister-event
     * @return {null}
     */
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
