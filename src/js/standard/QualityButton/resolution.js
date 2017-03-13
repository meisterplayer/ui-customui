export function expandQualityMapping(qualityMapping, index) {
    return {
        index,
        bitrates: [],
        from: qualityMapping.from,
        to: qualityMapping.to,
        resolution: qualityMapping.resolution,
    };
}

function setResolution(bitrate, bitrateIndex, qualityMapping) {
    const targetMapping = qualityMapping.find(mapping => bitrate > mapping.from && bitrate <= mapping.to);
    if (!targetMapping) {
        console.warn(`No resolution found for bitrate: ${bitrate}`);
        return;
    }

    targetMapping.bitrates.push({
        bitrate,
        bitrateIndex,
    });
}

export function prepareResolutionMapping(bitrates, qualityMapping) {
    bitrates.forEach(bitrateInfo => setResolution(bitrateInfo.bitrate, bitrateInfo.index, qualityMapping));
    return bitrates;
}


export function prepareResolutionOption(element, mapping) {
    const qualityOption = element;

    if (!mapping.resolution) {
        console.error('Qualitymapping is missing a resolution-value', mapping);
    }

    qualityOption.textContent = mapping.resolution;
    qualityOption.mapping = mapping;
}

export function selectResolution(qualityMapping, index, silent = false) {
    qualityMapping.forEach(mapping => {
        if (!mapping.option) { return; }

        const hasBitrate = !!mapping.bitrates.find(bitrate => bitrate.bitrateIndex === index);
        if (hasBitrate) {
            mapping.option.selected.classList.add('icon_icCheck');
        } else {
            mapping.option.selected.classList.remove('icon_icCheck');
        }
    });

    return silent ? null : index;
}
