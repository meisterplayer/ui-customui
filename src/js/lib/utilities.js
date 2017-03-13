/**
 * Returns a list of all child nodes that match the passed selector.
 * @memberof module:CustomUi
 * @param  {HTMLElement} rootNode The root node from which to search for relevant nodes.
 * @return {HTMLElement[]}        Array with nodes that match the selector.
 */
export function extractNodesWithSelector(rootNode, selector) {
    return Array.prototype.slice.call(rootNode.querySelectorAll(selector));
}

/**
 * Replace one node with another node.
 * @memberof module:CustomUi
 * @param  {HTMLElement} oldNode Node to be replaced.
 * @param  {HTMLElement} newNode New node to insert.
 * @return {?HTMLElement}        Old node, or null if replacing was not possible.
 */
export function replaceNodeWith(oldNode, newNode) {
    if (!oldNode.parentNode) { return null; }

    return oldNode.parentNode.replaceChild(newNode, oldNode);
}
