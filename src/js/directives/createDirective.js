import AutoHideShow from './AutoHideShow';
import TogglePlayPauseClick from './TogglePlayPauseClick';

export default function createDirective(meister, config, name, element) {
    switch (name) {
    case 'autohideshow':
        return AutoHideShow(meister, config, element);
    case 'toggleplaypauseclick':
        return new TogglePlayPauseClick(meister, config, element);
    default:
        return null;
    }
}
