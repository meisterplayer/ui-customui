/**
 * An event used as a callback arguments in custom ui events proxying DOM events.
 * @typedef {Object} module:CustomUi~CustomUiEvent
 * @property {Meister} meister - Meister instance from which the event originated.
 * @property {HTMLElement} domNode - Node from which the DOM event originated.
 * @property {String} eventName - The name of the event that originated from meister.
 * @property {String} eventType - The name of the DOM event.
 * @property {Event} domEvent - The original DOM event that was triggered.
 */
export class CustomUiEvent {
    /**
     * Create a CustomUiEvent.
     * @memberof module:CustomUi
     * @param {Meister} meister Meister instance from which the event originated.
     * @param {HTMLElement} domNode Node from which the DOM event originated.
     * @param {String} eventName The name of the event that originated from meister.
     * @param {String} eventType The name of the DOM event.
     * @param {Event} domEvent The original DOM event that was triggered.
     */
    constructor(meister, domNode, eventName, eventType, domEvent) {
        this.eventName = eventName;
        this.eventType = eventType;
        this.event = domEvent;
        this.meister = meister;
        this.element = domNode;
    }
}

/**
 * An event used as a callback argument when all listeners have been attached to a custom DOM element.
 * @typedef {Object} module:CustomUi~CustomUiElementRegisteredEvent
 * @property {Meister} meister - Meister instance from which the event originated.
 * @property {HTMLElement} domNode - Node on which the events were registered.
 * @property {String[]} events - Array with all the events that were registered on the HTMLElement.
 * @property {String} id - The id of the node on which the events were registered.
 */
export class CustomUiElementRegisteredEvent {
    /**
     * Create a CustomUiElementRegisteredEvent.
     * @memberof module:CustomUi
     * @param {Meister} meister Meister instance from which the event originated.
     * @param {HTMLElement} domNode Node on which the events were registered.
     * @param {String[]} events Array with all the events that were registered on the HTMLElement.
     */
    constructor(meister, domNode, events) {
        this.meister = meister;
        this.element = domNode;
        this.events = events;
        this.id = domNode.id;
    }
}
