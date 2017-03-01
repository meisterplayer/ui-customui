import { CustomUiEvent, CustomUiElementRegisteredEvent } from './event-classes';

/**
 * @constant
 * @memberof module:CustomUi
 * @type {String}
 * @default
 */
export const MEISTER_DATA_EVENTS_ATTR = 'data-mstr-events';

/**
 * @constant
 * @memberof module:CustomUi
 * @type {String}
 * @default
 */
export const CUSTOM_UI_EVENT_PREFIX = 'ui';

/**
 * Returns a list of all child nodes that have meister event data properties. Also includes the root node
 * should it have the property.
 * @memberof module:CustomUi
 * @param  {HTMLElement} rootNode The root node from which to search for relevant nodes.
 * @return {HTMLElement[]}        Array with nodes that have the meister event data property.
 */
export function extractEventNodes(rootNode) {
    const nodeArray = Array.prototype.slice.call(rootNode.querySelectorAll(`[${MEISTER_DATA_EVENTS_ATTR}]`));

    if (rootNode.getAttribute(MEISTER_DATA_EVENTS_ATTR)) {
        return nodeArray.concat(rootNode);
    }

    return nodeArray;
}

/**
 * Extracts individual strings from a single comma separated string while trimming whitespace and
 * filtering just whitespace entries.
 * @memberof module:CustomUi
 * @param  {String} eventString Comma separated string of event names.
 * @return {String[]}           Array with event names.
 */
function extractEvents(eventString) {
    return eventString.split(',')
        .filter(eventName => !!eventName) // filter empty entries.
        .map(eventName => eventName.trim()) // remove leading/trailing whitespace.
        .filter(eventName => !!eventName); // remove entries that were only spaces.
}

/**
 * Callback that is called after all events are registered to an HTMLElement.
 * @callback module:CustomUi~onElementRegistered
 * @param {module:CustomUi~CustomUiElementRegisteredEvent} customUiElementRegisteredEvent
 */

/**
 * Create a function that can be used to map dom events to meister events for html nodes.
 * @memberof module:CustomUi
 * @param  {Meister} meister      Meister instance to be used in the event callbacks.
 * @param  {module:CustomUi~onElementRegistered} [onElementRegistered=()=>{}] Callback to be used when all events have been registered on an HTMLElement.
 * @return {module:CustomUi~registerDataEvents} Function that can be used to register events to an HTMLElement.
 */
export function createRegisterDataEvents(meister, onElementRegistered = () => {}) {
    /**
     * Map events in the MEISTER_DATA_EVENTS_ATTR data attribute to meister events and call a
     * callback when done.
     * @function module:CustomUi~registerDataEvents
     * @param  {HTMLElement} domNode Node with data-mstr-events that need to be mapped to meister
     *                               custom ui events.
     */
    return function registerDataEvents(domNode) {
        const rawAttributes = domNode.getAttribute(MEISTER_DATA_EVENTS_ATTR);
        if (!rawAttributes) { return; }

        const eventsArray = extractEvents(rawAttributes);
        if (eventsArray.length < 1) { return; }

        const domNodeId = domNode.id ? `${domNode.id}:` : '';
        const handleName = `${CUSTOM_UI_EVENT_PREFIX}:${domNodeId}`;

        eventsArray.forEach(eventName => {
            const meisterEventName = `${handleName}${eventName}`;
            domNode.addEventListener(eventName, (e) => {
                meister.trigger(meisterEventName, new CustomUiEvent(meister, domNode, meisterEventName, eventName, e));
            });
        });

        onElementRegistered(new CustomUiElementRegisteredEvent(meister, domNode, eventsArray));
    };
}
