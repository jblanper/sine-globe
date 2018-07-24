export default class DownloadButton {
    constructor ({text, scope, prop}) {
        this.scope = scope;
        this.prop = prop;

        this.btn = Object.assign(
            document.createElement('button'),
            {textContent: text}
        );

        this.render();
        this.eventListener();
    }

    render () {
        const ui = document.querySelector('#ui');

        ui.appendChild(this.btn);
    }

    eventListener () {
        this.btn.addEventListener('click', this.eventHandler.bind(this));
    }

    eventHandler (event) {
        const newTab = window.open(this.scope[this.prop], '_blank');
        newTab.focus();
    }
}
