import styles from './styles.scss';

export function prepareBitrateOption(element, bitrate, index, transform) {
    const qualityOption = element;

    if (bitrate === 'auto') {
        qualityOption.textContent = bitrate;
    } else {
        qualityOption.textContent = transform(bitrate);
    }

    qualityOption.setAttribute('index', index);
}

export function selectBitrate(bitrates, index, silent) {
    bitrates.forEach((bitrate) => {
        if (bitrate.index === index) {
            bitrate.option.classList.add(styles.isActive);
        } else {
            bitrate.option.classList.remove(styles.isActive);
        }
    });

    return silent ? null : index;
}
