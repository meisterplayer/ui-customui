import autoHideShow from './autoHideShow';

export default function createStandardElement(meister, config, name) {
    switch (name) {
    case 'autohideshow':
        return autoHideShow(meister, config);
    default:
        return null;
    }
}
