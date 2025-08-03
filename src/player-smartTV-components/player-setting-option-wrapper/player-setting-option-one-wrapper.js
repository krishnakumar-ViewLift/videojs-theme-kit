export class SettingsOptionOneWrapper {
    constructor(props) {
        if (!props || typeof props !== 'object') {
            throw new Error('SettingsOptionOneWrapper: props must be a valid object');
        }

        this.title = props.title || 'Option';
        this.klassname = props.klassname || 'default-option-wrapper';
        this.handleClick = props.callback || (() => {});
        this.focused = props.focused || false;

        if (typeof this.handleClick !== 'function') {
            throw new Error('SettingsOptionOneWrapper: callback must be a function');
        }

        this.handleClick = this.handleClick.bind(this);
    }

    mount(mountPoint) {
        if (!mountPoint || !(mountPoint instanceof HTMLElement)) {
            throw new Error('SettingsOptionOneWrapper: mountPoint must be a valid DOM element');
        }

        const optionWrapper = document.createElement('div');
        optionWrapper.className = this.klassname;
        optionWrapper.tabIndex = 0;

        const titleElement = document.createElement('p');
        titleElement.textContent = this.title;
        optionWrapper.appendChild(titleElement);

        const arrowElement = document.createElement('p');
        arrowElement.textContent = "›";
        arrowElement.style.fontSize = '24px';
        optionWrapper.appendChild(arrowElement);

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

        optionWrapper.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === 'OK') {
                this.handleClick();
            }
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
