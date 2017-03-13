class BaseElement {
    constructor(meister) {
        this.meister = meister;
        this.isMobile = this.meister.browser.isMobile;

        this.element = null;

        this.eventStore = [];

        if (this.onItemLoaded) {
            this.on('itemLoaded', this.onItemLoaded.bind(this));
        }

        if (this.onItemUnloaded) {
            this.on('itemUnloaded', this.onItemUnloaded.bind(this));
        }
    }

    on(hook, handler) {
        this.eventStore.push(...this.meister.on(hook, handler, this.constructor.name));
    }

    one(hook, block, handler) {
        this.eventStore.push(this.meister.one(hook, block, handler, this.constructor.name));
    }

    classListAdd(element, ...classNames) {
        classNames.forEach(className => { element.classList.add(className); });

        if (this.isMobile) {
            element.classList.add('pf-mobile');
        }
    }

    classListRemove(element, ...classNames) {
        classNames.forEach(className => { element.classList.remove(className); });
    }

    getNode() {
        return this.element;
    }
}

export default BaseElement;
