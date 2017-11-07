import BaseElement from '../BaseElement';
import globalStyles from '../global-styles.scss';
import qualityIcon from '../icons/quality';
import styles from './styles.scss';

import { prepareBitrateOption, selectBitrate, doesBitrateIndexExist } from './bitrate';
import { expandQualityMapping, prepareResolutionMapping, prepareResolutionOption, selectResolution } from './resolution';

const RESOLUTION = 0;
const BITRATE = 1;

const iconSVG = qualityIcon();

class QualityButton extends BaseElement {
    constructor(meister, config) {
        super(meister);

        this.config = config;
        this.isOpen = false;

        this.element = document.createElement('div');
        this.classListAdd(
            this.element,
            globalStyles.uiElement,
            globalStyles.uiElementActive,
            globalStyles.uiElementHidden,
            styles.element,
        );

        this.iconElement = document.createElement('div');
        this.iconElement.innerHTML = iconSVG;
        this.classListAdd(
            this.iconElement,
            globalStyles.icon,
            styles.iconElement,
        );
        this.element.appendChild(this.iconElement);

        this.qualitySelector = document.createElement('div');
        this.classListAdd(this.qualitySelector, styles.qualitySelector, styles.isClosed);

        this.element.appendChild(this.qualitySelector);

        this.qualitySelectorOptions = document.createElement('div');
        this.classListAdd(
            this.qualitySelectorOptions,
            styles.qualitySelectorOptions,
        );
        this.qualitySelector.appendChild(this.qualitySelectorOptions);

        this.bitrates = null;
        this.on('itemBitrates', info => this.onItemBitrates(info));

        if (Array.isArray(this.config.qualityMapping)) {
            this.qualityMappingMode = true;
            this.qualityMapping = this.config.qualityMapping.map(expandQualityMapping);
        }

        // set event listeners
        this.iconElement.addEventListener('click', () => this.toggleOpen());
        this.qualitySelectorOptions.addEventListener('click', e => this.onOptionClick(e));
    }

    onItemUnloaded() {
        // Clear any previous bitrates that were present.
        this.qualitySelectorOptions.innerHTML = '';
        this.bitrates = null;

        this.classListAdd(this.element, globalStyles.uiElementHidden);
    }

    setOpen() {
        this.classListAdd(this.qualitySelector, styles.isOpen);
        this.classListRemove(this.qualitySelector, styles.isClosed);

        this.isOpen = true;
    }

    setClose() {
        this.classListAdd(this.qualitySelector, styles.isClosed);
        this.classListRemove(this.qualitySelector, styles.isOpen);

        this.isOpen = false;
    }

    toggleOpen() {
        if (this.isOpen) {
            this.setClose();
        } else {
            this.setOpen();
        }
    }

    onOptionClick(e) {
        // TODO: Perhaps do this later?
        e.stopPropagation();

        // Show/hide menu when the button is clicked.
        if (!e.target.hasAttribute('index') && !e.target.mapping) {
            if (this.qualitySelector.classList.contains('hidden')) {
                this.setOpen();
            } else {
                this.setClose();
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

        this.setClose();
    }

    onItemBitrates(info) {
        info.bitrates.sort((a, b) => b.bitrate - a.bitrate);
        this.bitrates = info.bitrates;
        this.classListRemove(this.element, globalStyles.uiElementHidden);

        if (this.qualityMappingMode) {
            this.bitrates = prepareResolutionMapping(this.bitrates, this.qualityMapping);
            this.qualityMapping.forEach((mapping) => {
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
            this.bitrates.forEach((bitrateInfo) => {
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


        // parseInt with null will return NaN, just like string with not a numeric value.
        const savedBitrateIndex = parseInt(localStorage.getItem('meister_bitrateIndex'), 10);
        const bitrateIndexExists = doesBitrateIndexExist(this.bitrates, savedBitrateIndex);

        if (!Number.isNaN(savedBitrateIndex) && bitrateIndexExists) {
            this.selectOption(savedBitrateIndex, false);
        } else {
            this.selectOption(info.currentIndex, true);
        }
    }

    createOption(optionOpts) {
        const qualityOption = document.createElement('div');
        this.classListAdd(
            qualityOption,
            styles.qualitySelectorOption,
        );

        // When no index is passed we're dealing with resolution mapping.
        if (optionOpts.type === BITRATE) {
            const transform = this.config.bitrateToResolution ? this.config.bitrateToResolution : this.meister.utils.bitrateToResolution;

            prepareBitrateOption(qualityOption, optionOpts.bitrate, optionOpts.index, transform);
        } else if (optionOpts.type === RESOLUTION) {
            prepareResolutionOption(qualityOption, optionOpts.mapping);
        }

        this.qualitySelectorOptions.appendChild(qualityOption);

        return qualityOption;
    }

    selectOption(index, silent = false) {
        /** @type {number} */
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

            localStorage.setItem('meister_bitrateIndex', bitrateIndex.toString());
        }
    }
}

export default QualityButton;
