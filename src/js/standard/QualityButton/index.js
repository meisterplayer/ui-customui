import BaseElement from '../BaseElement';

import { prepareBitrateOption, selectBitrate } from './bitrate';
import { expandQualityMapping, prepareResolutionMapping, prepareResolutionOption, selectResolution } from './resolution';

const RESOLUTION = 0;
const BITRATE = 1;

class QualityButton extends BaseElement {
    constructor(meister, config) {
        super(meister);

        this.config = config;
        this.element = document.createElement('div');

        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-right', 'pf-ui-element-active');
        this.classListAdd(this.element, 'pf-icon', 'pf-icon_icHd');
        this.classListAdd(this.element, 'pf-ui-element-hidden');

        this.qualitySelector = document.createElement('div');
        this.classListAdd(this.qualitySelector, 'pf-quality-selector', 'hidden');

        this.meister.controlsWrapper.appendChild(this.qualitySelector);

        this.element.addEventListener('click', (e) => this.onClick(e));

        this.bitrates = null;
        this.on('itemBitrates', (info) => this.onItemBitrates(info));

        if (Array.isArray(this.config.qualityMapping)) {
            this.qualityMappingMode = true;
            this.qualityMapping = this.config.qualityMapping.map(expandQualityMapping);
        }

        // Store this eventfunction in the instance for easier removal.
        this.hide = () => {
            this.classListAdd(this.qualitySelector, 'hidden');
            document.body.removeEventListener('click', this.hide);
        };
    }

    onItemUnloaded() {
        // Clear any previous bitrates that were present.
        this.qualitySelector.innerHTML = '';
        this.bitrates = null;

        this.classListAdd(this.element, 'pf-ui-element-hidden');
    }

    onClick(e) {
        // TODO: Perhaps do this later?
        e.stopPropagation();

        // Show/hide menu when the button is clicked.
        if (!e.target.hasAttribute('index') && !e.target.mapping) {
            if (this.qualitySelector.classList.contains('hidden')) {
                this.show();
            } else {
                this.hide();
            }

            return;
        }

        // Element has attribute index, must be a bitrate option
        if (e.target.hasAttribute('index')) {
            const newBitrateIndex = parseInt(e.target.getAttribute('index'), 10);
            this.selectOption(newBitrateIndex);
        }

        if (e.target.mapping) {
            const newBitrateIndex = parseInt(e.target.mapping.bitrates[0].bitrateIndex, 10);
            this.selectOption(newBitrateIndex);
        }

        this.hide();
    }

    show() {
        this.classListRemove(this.qualitySelector, 'hidden');
        document.body.addEventListener('click', this.hide);
    }

    onItemBitrates(info) {
        info.bitrates.sort((a, b) => b.bitrate - a.bitrate);
        this.bitrates = info.bitrates;
        this.classListRemove(this.element, 'pf-ui-element-hidden');

        if (this.qualityMappingMode) {
            this.bitrates = prepareResolutionMapping(this.bitrates, this.qualityMapping);
            this.qualityMapping.forEach(mapping => {
                if (mapping.bitrates.length < 1) {
                    if (this.meister.config.debug) console.error('No bitrates available for this mapping', mapping);
                } else {
                    // eslint-disable-next-line
                    mapping.option = this.createOption({
                        type: RESOLUTION,
                        mapping,
                    });
                }
            });
        } else {
            this.bitrates.forEach(bitrateInfo => {
                // A bitrate of 0 means auto quality.
                const bitrate = bitrateInfo.bitrate === 0 ? 'auto' : bitrateInfo.bitrate;
                // eslint-disable-next-line
                bitrateInfo.option = this.createOption({
                    type: BITRATE,
                    bitrate,
                    index: bitrateInfo.index,
                });
            });
        }
        this.selectOption(info.currentIndex, true);
    }

    createOption(optionOpts) {
        const qualityOption = document.createElement('div');
        qualityOption.classList.add('pf-quality-option');
        qualityOption.classList.add('pf-ui-element-active');

        // When no index is passed we're dealing with resolution mapping.
        if (optionOpts.type === BITRATE) {
            const transform = this.config.bitrateToResolution ? this.config.bitrateToResolution : this.meister.utils.bitrateToResolution;

            prepareBitrateOption(qualityOption, optionOpts.bitrate, optionOpts.index, transform);
        } else if (optionOpts.type === RESOLUTION) {
            prepareResolutionOption(qualityOption, optionOpts.mapping);
        }

        qualityOption.selected = document.createElement('div');
        qualityOption.selected.classList.add('pf-quality-option-select');
        qualityOption.selected.classList.add('pf-icon');
        // Check for mobile.
        if (this.isMobile) qualityOption.selected.classList.add('pf-mobile');
        qualityOption.appendChild(qualityOption.selected);

        this.qualitySelector.appendChild(qualityOption);

        qualityOption.addEventListener('click', (e) => this.onClick(e));

        return qualityOption;
    }

    selectOption(index, silent = false) {
        let bitrateIndex = null;

        if (this.qualityMappingMode) {
            bitrateIndex = selectResolution(this.qualityMapping, index, silent);
        } else {
            bitrateIndex = selectBitrate(this.bitrates, index, silent);
        }

        if (Number.isFinite(bitrateIndex)) {
            this.meister.trigger('requestBitrate', {
                bitrateIndex,
            });
        }
    }
}

export default QualityButton;
