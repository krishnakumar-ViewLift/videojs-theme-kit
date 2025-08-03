export class TextContent {
    constructor(props) {
        if (!props || typeof props !== 'object') {
            throw new Error('TextContent: props must be a valid object');
        }

        this.text = props.text || '';
        this.fontSize = props.fontSize || '16px';
        this.fontFamily = props.fontFamily || 'Arial, sans-serif';
        this.fontWeight = props.fontWeight || 'normal';
        this.textAlign = props.textAlign || 'left';
        this.textDecoration = props.textDecoration || 'none';
        this.textTransform = props.textTransform || 'none';
        this.lineHeight = props.lineHeight || 'normal';
        this.letterSpacing = props.letterSpacing || 'normal';
        this.color = props.color || '#000';
        this.backgroundColor = props.backgroundColor || 'transparent';
        this.klassname = props.klassname || 'default-text-content';
        this.width = props.width || 100;
        this.height = props.height || 50;
        this.focused = props.focused || false;
    }

    setText(text) {
        if (typeof text !== 'string') {
            throw new Error('TextContent: text must be a string');
        }
        this.text = text;
        if (this.container) {
            this.container.textContent = text;
        }
    }

    mount(mountPoint) {
        if (!mountPoint || !(mountPoint instanceof HTMLElement)) {
            throw new Error('TextContent: mountPoint must be a valid DOM element');
        }

        const text = document.createElement('div');
        text.className = this.klassname;
        text.style.fontSize = this.fontSize;
        text.style.color = this.color;
        text.style.backgroundColor = this.backgroundColor;
        text.style.fontWeight = this.fontWeight;
        text.innerText = this.text;
        mountPoint.appendChild(text);
        this.container = text;
    }

    unmount() {
        if (this.container) {
            this.container.remove();
            this.container = undefined;
        }
    }
}