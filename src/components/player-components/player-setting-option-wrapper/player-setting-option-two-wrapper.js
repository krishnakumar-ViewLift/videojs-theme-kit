let  checkIcon ="";

export class SettingsOptionTwoWrapper {
    constructor(props) {
        if (!props || typeof props !== 'object') {
            throw new Error('SettingsOptionTwoWrapper: props must be a valid object');
        }

        this.title = props.title || 'Option';
        this.klassname = props.klassname || 'default-option-wrapper';
        this.selected = props.selected || false;
        this.focused = props.focused || false;
        this.imgSrc = props.imgSrc || checkIcon;
        this.id = props.id;

        if (typeof this.title !== 'string') {
            throw new Error('SettingsOptionTwoWrapper: title must be a string');
        }
    }

    mount(mountPoint) {
        if (!mountPoint || !(mountPoint instanceof HTMLElement)) {
            throw new Error('SettingsOptionTwoWrapper: mountPoint must be a valid DOM element');
        }

        const optionWrapper = document.createElement('div');
        optionWrapper.className = this.klassname;
        optionWrapper.tabIndex = 0;

        const titleElement = document.createElement('p');
        titleElement.textContent = this.title;
        optionWrapper.appendChild(titleElement);

        if (this.selected) {
            optionWrapper.classList.add('selected');
            const selectedElement = document.createElement('span');
            const img = document.createElement('img');
            img.src = this.imgSrc;
            img.alt = this.imgAltText || 'Selected';
            selectedElement.appendChild(img);
            optionWrapper.appendChild(selectedElement);
        }

        if (this.focused) {
            optionWrapper.classList.add('focused');
        }

        optionWrapper.addEventListener('focus', () => {
            this.focused = true;
            optionWrapper.classList.add('focused');
        });
        optionWrapper.addEventListener('blur', () => {
            this.focused = false;
            optionWrapper.classList.remove('focused');
        });

        this.optionWrapper = optionWrapper;
        optionWrapper.instance = this; // Set the instance property
        mountPoint.appendChild(optionWrapper);
    }

    unmount() {
        if (this.optionWrapper) {
            this.optionWrapper.remove();
            this.optionWrapper = undefined;
        }
    }

    focus() {
        if (this.optionWrapper) {
            this.optionWrapper.focus();
            this.optionWrapper.classList.add('focused');
            this.focused = true;
        }
    }

    blur() {
        if (this.optionWrapper) {
            this.optionWrapper.blur();
            this.optionWrapper.classList.remove('focused');
            this.focused = false;
        }
    }
}       
