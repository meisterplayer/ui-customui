import AutoHideShow from './AutoHideShow';

export default function createDirective(meister, config, name, element) {
    switch (name) {
    case 'autohideshow':
        return AutoHideShow(meister, config, element);
    default:
        return null;
    }
}
