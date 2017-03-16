import BaseElement from './BaseElement';

class CaptionsButton extends BaseElement {
    constructor(meister) {
        super(meister);

        this.element = document.createElement('div');
        this.classListAdd(this.element, 'pf-ui-element', 'pf-ui-element-right', 'pf-ui-element-active');
        this.classListAdd(this.element, 'pf-icon', 'pf-icon_icCc');
        this.classListAdd(this.element, 'pf-ui-element-hidden');

        this.captionSelector = document.createElement('div');
        this.classListAdd(this.captionSelector, 'pf-quality-selector', 'hidden');

        this.meister.controlsWrapper.appendChild(this.captionSelector);

        this.element.addEventListener('click', this.onClick.bind(this));

        this.captions = null;
        this.on('itemLoaded', this.onItemLoaded.bind(this));

        // Store this eventfunction in the instance for easier removal.
        this.hide = () => {
            this.classListAdd(this.captionSelector, 'hidden');
            document.body.removeEventListener('click', this.hide);
        };
    }

    onItemUnloaded() {
        this.captionSelector.innerHTML = '';
        this.captions = null;

        this.classListAdd(this.element, 'pf-ui-element-hidden');
    }

    onClick(e) {
        // TODO: Perhaps do this later?
        e.stopPropagation();

        // Show/hide menu when the button is clicked.
        if (!e.target.hasAttribute('lang')) {
            if (this.captionSelector.classList.contains('hidden')) {
                this.show();
            } else {
                this.hide();
            }

            return;
        }

        // Element has attribute lang, must be a language option
        const newLang = e.target.getAttribute('lang');
        this.selectLang(newLang);
        this.hide();
    }

    show() {
        this.classListRemove(this.captionSelector, 'hidden');
        document.body.addEventListener('click', this.hide);
    }

    onItemLoaded(e) {
        if (!e.item || !e.item.captions) return;

        // Slice to make a copy of the array;
        if (!Array.isArray(e.item.captions)) {
            this.captions = [e.item.captions];
        } else {
            this.captions = e.item.captions.slice(0).sort((a, b) => {
                const titleA = a.title.toUpperCase();
                const titleB = b.title.toUpperCase();
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;

                return 0;
            });
        }

        // Add an option to turn cc off.
        this.captions.push({ title: this.meister.Localization.get('NONE'), lang: 'none' });

        this.classListRemove(this.element, 'pf-ui-element-hidden');

        this.captions.forEach((caption) => {
            const language = caption.title;
            const code = caption.lang;
            caption.option = this.createOption(language, code);
        });

        this.classListRemove(this.element, 'pf-ui-element-hidden');
    }

    createOption(language, code) {
        const languageOption = document.createElement('div');
        languageOption.classList.add('pf-quality-option');
        languageOption.classList.add('pf-ui-element-active');

        languageOption.textContent = language.charAt(0).toUpperCase() + language.toLowerCase().slice(1);

        languageOption.setAttribute('lang', code);

        languageOption.selected = document.createElement('div');
        languageOption.selected.classList.add('pf-quality-option-select');
        languageOption.selected.classList.add('pf-icon');
        // Check for mobile.
        if (this.isMobile) languageOption.selected.classList.add('pf-mobile');
        languageOption.appendChild(languageOption.selected);

        this.captionSelector.appendChild(languageOption);

        languageOption.addEventListener('click', (e) => this.onClick(e));

        return languageOption;
    }

    selectLang(languageCode) {
        this.captions.forEach((caption) => {
            caption.option.selected.classList.remove('pf-icon_icCheck');
        });

        if (languageCode === 'none') {
            this.meister.trigger('requestCaptions', { newLanguage: 'none' });
            return;
        }

        const newCaption = this.captions.find((caption) => caption.lang === languageCode);

        newCaption.option.selected.classList.add('pf-icon_icCheck');
        this.meister.trigger('requestCaptions', newCaption);
    }
}

export default CaptionsButton;
