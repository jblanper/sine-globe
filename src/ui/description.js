export default class Description {
    constructor (title, text) {
        this.title = title;
        this.text = text

        this.render();
    }

    render () {
        const ui = document.querySelector('#ui');
        const div = document.createElement('div');
        div.id = 'description';

        const h1 = document.createElement('h1');
        h1.textContent = this.title;
        div.appendChild(h1);

        this.text.forEach(par => {
            const p = document.createElement('p');
            p.textContent = par;
            div.appendChild(p);
        });

        ui.appendChild(div);
    }
}
