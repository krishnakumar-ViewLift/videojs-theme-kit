import { SettingsOptionOneWrapper } from '../player-setting-option-wrapper/player-setting-option-one-wrapper.js';
import { SettingsOptionTwoWrapper } from '../player-setting-option-wrapper/player-setting-option-two-wrapper.js';
import { parseSvgString } from '../../../utils/helper'

export class Sidebar {
    constructor(props) {
        if (!props || typeof props !== 'object') {
            throw new Error('Sidebar: props must be a valid object');
        }

        this.title = props.title || 'Settings';
        this.items = props.items || [
            {text: 'Video Quality', isSelected: true, callback: () => {}}, 
            {text: 'Audio Language', isSelected: false, callback: () => {}}, 
            {text: 'Subtitles', isSelected: false, callback: () => {}}
        ];
        this.klassname = props.klassname || 'default-sidebar';
        this.currentFocusedOption = null;
        this.lastFocusedElement = props.lastFocusedElement || null;
        this.type = props.type || 'navigation';
        this.focused = props.focused || false;
        this.callback = props.callback || (() => {});
        this.onselect = props.onselect || (() => {});

        if (typeof this.callback !== 'function') {
            throw new Error('Sidebar: callback must be a function');
        }

        if (!['navigation', 'selection'].includes(this.type)) {
            throw new Error('Sidebar: type must be either "navigation" or "selection"');
        }
    }

    mount(mountPoint) {
        if (!mountPoint || !(mountPoint instanceof HTMLElement)) {
            throw new Error('Sidebar: mountPoint must be a valid DOM element');
        }

        const sidebar = document.createElement('div');
        sidebar.className = this.klassname;

        const titleElement = document.createElement('div');
        titleElement.textContent = this.title;
        titleElement.className = 'settingsHeading';
        sidebar.appendChild(titleElement);

        const list = document.createElement('div');
        if (this.type === 'navigation') {
            this.items.forEach((item, idx) => {
                const listItem = new SettingsOptionOneWrapper({
                    title: item.text,
                    klassname: 'default-option-wrapper',
                    focused: idx === 0,
                    callback: item.callback
                });
                item.instance = listItem; // Store the listItem instance in the item
                if (idx === 0) {
                    this.currentFocusedOption = listItem;
                }
                listItem.mount(list);
            });
        } else if (this.type === 'selection') {
            this.items.forEach((item, idx) => {
                const listItem = new SettingsOptionTwoWrapper({
                    title: item.text,
                    klassname: 'default-option-wrapper',
                    focused: idx === 0,
                    selected: item.isSelected,
                    id: item.id,
                });
                item.instance = listItem; // Store the listItem instance in the item
                if (idx === 0) {
                    this.currentFocusedOption = listItem;
                }
                listItem.mount(list);
            });
        }

        sidebar.appendChild(list);
        this.sidebarElement = sidebar;
        mountPoint.appendChild(sidebar);

        this.addEventListeners();
        this.focus();
    }

    addEventListeners() {
        if (!this.sidebarElement) {
            throw new Error('Sidebar: sidebarElement is not initialized');
        }

        this.sidebarElement.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                event.stopPropagation();
                this.focusNext();
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                event.stopPropagation();
                this.focusPrevious();
            } else if (event.key === 'Backspace' || event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                this.unfocus();
                this.unmount();
            } else if (event.key === 'Enter' || event.key === 'OK') {
                event.preventDefault();
                event.stopPropagation();
                if (this.type === 'selection') {
                    this.selectionTypeAction();
                }
            }
        });
    }

    selectionTypeAction() {
        if (this.currentFocusedOption) {
            // Deselect all options
            this.items.forEach(item => {
                if (item.instance) {
                    item.instance.optionWrapper.classList.remove('selected');
                    item.instance.selected = false;
                    // Remove image if present
                     const img = item.instance.optionWrapper.querySelector('span');
                    if (img) {
                        img.remove();
                    }
                     const img1 = item.instance.optionWrapper.querySelector('svg');
                    if (img1) {
                        img1.remove();
                    }
                }
            });
            // Select the current option
            this.currentFocusedOption.optionWrapper.classList.add('selected');
            this.currentFocusedOption.selected = true;
            // Add image to the selected option
            const img = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                        </svg>`;
            
            this.currentFocusedOption.optionWrapper.appendChild(parseSvgString(img));
            this.onselect(this.currentFocusedOption);
        }
    }

    focusNext() {
        if (this.sidebarElement && this.currentFocusedOption) {
            const nextSibling = this.currentFocusedOption.optionWrapper.nextElementSibling;
            if (nextSibling) {
                this.currentFocusedOption.blur();
                this.currentFocusedOption = nextSibling.instance;
                this.currentFocusedOption.focus();
            }
        }
    }

    focusPrevious() {
        if (this.sidebarElement && this.currentFocusedOption) {
            const previousSibling = this.currentFocusedOption.optionWrapper.previousElementSibling;
            if (previousSibling) {
                this.currentFocusedOption.blur();
                this.currentFocusedOption = previousSibling.instance;
                this.currentFocusedOption.focus();
            }
        }
    }

    focus() {
        if (this.sidebarElement && this.currentFocusedOption) {
            this.currentFocusedOption.focus();
        }
    }

    unfocus() {
        if (this.sidebarElement && this.currentFocusedOption) {
            this.currentFocusedOption.blur();
        }
    }

    unmount() {
        if (this.sidebarElement) {
            this.sidebarElement.remove();
            this.sidebarElement = undefined;
            if (this.lastFocusedElement) {
                this.callback();
                this.lastFocusedElement.focus();
            }
            this.currentFocusedOption = null;
        }
    }
}
