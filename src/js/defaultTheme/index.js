import styles from './styles.scss';

const defaultTheme = () => {
    return `<div class="mstr-container" data-mstr-directive="autoHideShow">
                <div class="mstr-centerbar">
                    <span data-mstr-standard="spinner"></span>
                </div>
                <div class="mstr-bottombar">
                    <div class="mstr-items">
                        <div class="mstr-item">
                            <span data-mstr-standard="playbutton"></span>
                        </div>
                        <div class="mstr-item">
                            <span data-mstr-standard="playlistpreviousbutton"></span>
                        </div>
                        <div class="mstr-item mstr-item--fill">
                            <span data-mstr-standard="seekbar"></span>
                        </div>
                        <div class="mstr-item">
                            <span data-mstr-standard="timedisplay"></span>
                        </div>
                        <div class="mstr-item">
                            <span data-mstr-standard="playlistnextbutton"></span>
                        </div>
                        <div class="mstr-item">
                            <span data-mstr-standard="fullscreenbutton"></span>
                        </div>
                        <div class="mstr-item">
                            <span data-mstr-standard="volumeslider"></span>
                        </div>
                        <div class="mstr-item">
                            <span data-mstr-standard="qualitybutton"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
}


export default defaultTheme;
