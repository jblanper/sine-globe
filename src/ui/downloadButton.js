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
        const link = document.createElement('a');
        link.style = 'display: none;';
        link.download = (data.startsWith('data:image')) ? 'img.png' : 'img.json';
        link.href = data;
        console.log(data);

        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }
}
