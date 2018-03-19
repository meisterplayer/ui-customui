class AdWrapperController {
    constructor(meister) {
        this.meister = meister;
    }

    onAdBreakStarted() {
        this.meister.adWrapper.classList.remove('pf-ui-element-hidden');

        // iOS cannot handle visibility:hidden very well.
        // So we make an exception for that and use display instead on this element.
        if (this.meister.browser.isiOS) {
            this.meister.adWrapper.style.display = 'block';
        }
    }

    onAdBreakEnded() {
        this.meister.adWrapper.classList.add('pf-ui-element-hidden');

        // iOS cannot handle visibility:hidden very well.
        // So we make an exception for that and use display instead on this element.
        if (this.meister.browser.isiOS) {
            this.meister.adWrapper.style.display = 'none';
        }
    }

    run() {
        this.meister.on(['adBreakEnded', 'itemUnloaded'], () => this.onAdBreakEnded());
        this.meister.on('adBreakStarted', () => this.onAdBreakStarted());
    }
}

export default AdWrapperController;
