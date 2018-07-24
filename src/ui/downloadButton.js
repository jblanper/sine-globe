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
        const data = this.scope[this.prop];
        const win = window.open();
        if (data.startsWith('data:image')) {
            win.document.write(`<img src="${data}" />`);
        } else {
            win.document.write(data);
        }
    }
}
