import { MEISTER_DATA_STANDARD_ATTR } from './constants';
import { extractNodesWithSelector, replaceNodeWith } from './utilities';
import createStandardElement from '../standard/createStandardElement';

/**
 * Returns a list of all child nodes that have meister standard data properties.
 * @memberof module:CustomUi
 * @param  {HTMLElement} rootNode The root node from which to search for relevant nodes.
 * @return {HTMLElement[]}        Array with nodes that have the meister standard data property.
 */
export function extractStandardNodes(rootNode) {
    return extractNodesWithSelector(rootNode, `[${MEISTER_DATA_STANDARD_ATTR}]`);
}

/**
 * Removes trailing/leading whitespace from the element name and makes it lowercase.
 * @memberof module:CustomUi
 * @param  {String} [elementName=''] Name of the standard element from the HTML element.
 * @return {String}             Formatted elementName.
 */
function formatElementName(elementName = '') {
    return elementName.trim().toLowerCase();
}

/**
 * Create a function that can be used to replace nodes with Standard Ui elements.
 * @memberof module:CustomUi
 * @param  {Meister} meister     [description]
 * @param  {Object} [config={}] [description]
 * @return {module:CustomUi~loadStandardElement} Function that can be used to replace nodes with Standard Ui elements.
 */
export function createLoadStandardElement(meister, config = {}) {
    /**
     * Replace nodes with the Standard Ui element specified in MEISTER_DATA_STANDARD_ATTR.
     * @function module:CustomUi~loadStandardElement
     * @param  {HTMLElement} domNode Node with data-mstr-standard that should be replaced with a Standard Ui element.
     */
    return function loadStandardElement(domNode) {
        const elementName = formatElementName(domNode.getAttribute(MEISTER_DATA_STANDARD_ATTR));
        if (!elementName) { return; }

        const standardElement = createStandardElement(meister, config, elementName);
        if (!standardElement) {
            console.error(`No standard element with name '${elementName}'`);
        }

        replaceNodeWith(domNode, standardElement.getNode());
    };
}
