import AdWrapperController from './AdWrapperController';

/**
 * Run all controllers that need to be run regardless of
 * what the UI looks like.
 *
 * @export
 * @param {Meister} meister
 */
export default function runControllers(meister) {
    const adWrapperController = new AdWrapperController(meister);
    adWrapperController.run();
}
