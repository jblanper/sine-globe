import setAnimation from './animate.js';

export default class PlayButton {
    constructor ({playText, stopText, scope}) {
        this.playText = playText;
        this.stopText = stopText;

        this.animate = setAnimation( _ => {
            scope.draw();
            scope.update();
        });

        this.btn = Object.assign(
            document.createElement('button'),
            {textContent: playText, id: 'play'}
        );

        this.btn.classList.add('toggle');

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
        this.animate.toggle();

        this.btn.classList.toggle('deactivated');
        this.btn.textContent = (this.animate.animating) ? this.stopText : this.playText;

        event.stopPropagation();
    }
}

