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

/**
 * Checks if a given index exists in the bitrates list.
 *
 * @export
 * @param {Array.<{index: number, bitrate:number, option:HTMLElement}>} bitrates
 * @param {number} index
 * @returns {boolean}
 */
export function doesBitrateIndexExist(bitrates, index) {
    return !!bitrates.find(bitrate => bitrate.index === index);
}
