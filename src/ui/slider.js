export default class Slider {
    constructor ({max, min, step = 1, scope, prop, label = undefined}) {
        this.scope = scope;
        this.prop = prop;
        this.label = (label) ? label : prop

        this.slider = Object.assign(
            document.createElement('input'), {
                type: 'range', id: this.label.replace(/\s/g, '-'),
                max: max, min: min, step: step
        });
        this.slider.value = scope[prop];

        this.output = document.createElement('output');
        this.output.textContent = scope[prop];

        this.render();
        this.eventListener();
    }

    render () {
        const ui = document.querySelector('#ui');

        const fragment = document.createDocumentFragment();
        const div = document.createElement('div');
        div.classList.add('slider');

        const labelTag = Object.assign(
            document.createElement('label'),
            {textContent: `${this.label} \u2014 `, for: this.slider.id}
        );

        const br = document.createElement('br');


        fragment.appendChild(div);
        div.appendChild(labelTag);
        div.appendChild(this.output);
        div.appendChild(br);
        div.appendChild(this.slider);
        ui.appendChild(fragment);
    }

    eventListener () {
        this.slider.addEventListener('input', this.eventHandler.bind(this));
    }

    eventHandler (event) {
        const value = this.slider.valueAsNumber;

        this.output.textContent = value;
        this.scope[this.prop] = value;
    }
}
