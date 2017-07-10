import AutoHideShow from './AutoHideShow';

export default function createDirective(meister, config, name) {
    switch (name) {
    case 'autohideshow':
        return AutoHideShow(meister, config);
    default:
        return null;
    }
}
