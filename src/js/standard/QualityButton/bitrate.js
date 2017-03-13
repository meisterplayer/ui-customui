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
    bitrates.forEach(bitrate => {
        if (bitrate.index === index) {
            bitrate.option.selected.classList.add('icon_icCheck');
        } else {
            bitrate.option.selected.classList.remove('icon_icCheck');
        }
    });

    return silent ? null : index;
}
