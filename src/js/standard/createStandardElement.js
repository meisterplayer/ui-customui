import CaptionsButton from './CaptionsButton';
import FullscreenButton from './FullscreenButton';
import PlayButton from './PlayButton';
import { PlaylistPreviousButton, PlaylistNextButton } from './PlaylistButtons';
import QualityButton from './QualityButton';
import SeekBar from './SeekBar';
import Spinner from './Spinner';
import StepBackButton from './StepBackButton';
import StepForwardButton from './StepForwardButton';
import TimeDisplay from './TimeDisplay';
import VolumeSlider from './VolumeSlider';

export default function createStandardElement(meister, config, name) {
    switch (name) {
    case 'captionsbutton':
        return new CaptionsButton(meister, config);
    case 'fullscreenbutton':
        return new FullscreenButton(meister, config);
    case 'playbutton':
        return new PlayButton(meister, config);
    case 'playlistpreviousbutton':
        return new PlaylistPreviousButton(meister, config);
    case 'playlistnextbutton':
        return new PlaylistNextButton(meister, config);
    case 'qualitybutton':
        return new QualityButton(meister, config);
    case 'seekbar':
        return new SeekBar(meister, config);
    case 'spinner':
        return new Spinner(meister, config);
    case 'stepbackbutton':
        return new StepBackButton(meister, config);
    case 'stepforwardbutton':
        return new StepForwardButton(meister, config);
    case 'timedisplay':
        return new TimeDisplay(meister, config);
    case 'volumeslider':
        return new VolumeSlider(meister, config);
    default:
        return null;
    }
}
