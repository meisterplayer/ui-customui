import BaseElement from '../BaseElement';
import globalStyles from '../global-styles.scss';
import styles from './styles.scss';

import { prepareBitrateOption, selectBitrate } from './bitrate';
import { expandQualityMapping, prepareResolutionMapping, prepareResolutionOption, selectResolution } from './resolution';

const RESOLUTION = 0;
const BITRATE = 1;

const iconSVG = `
<svg class="${globalStyles.svg}" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M0,5.99406028 C0,4.8927712 0.897026226,4 2.00494659,4 L21.9950534,4 C23.1023548,4 24,4.89451376 24,5.99406028 L24,18.0059397 C24,19.1072288 23.1029738,20 21.9950534,20 L2.00494659,20 C0.897645164,20 0,19.1054862 0,18.0059397 L0,5.99406028 Z M9,11 L6,11 L6,8 L4,8 L4,16 L6,16 L6,13 L9,13 L9,16 L11,16 L11,8 L9,8 L9,11 Z M16,16 C18.209139,16 20,14.209139 20,12 C20,9.790861 18.209139,8 16,8 L13,8 L13,16 L16,16 Z M15,14 L15,10 L16,10 C17.1045695,10 18,10.8954305 18,12 C18,13.1045695 17.1045695,14 16,14 L15,14 Z"></path>
</svg>
`;

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
        this.selectOption(info.currentIndex, true);
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
