// helper functions
function createSVGElement (tagName, attributes) {
    const elem = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    Object.entries(attributes).forEach(attrib => {
        elem.setAttribute(attrib[0], attrib[1]);
    });

    return elem
}

export default class Menu {
    constructor ({scope, shouldDraw = true, shouldUpdate = true, hasMenuBtn = true}) {
        this.scope = scope;
        this.shouldUpdate = shouldUpdate;
        this.shouldDraw = shouldDraw;
        this.hasMenuBtn = hasMenuBtn;

        this.reset();

        this.menu = Object.assign(
            document.createElement('div'),
            {id: 'ui'}
        );


        this.render();
        this.eventListener();
    }

    reset () {
        const previousMenu = document.querySelector('#ui');
        if (previousMenu) previousMenu.parentNode.removeChild(previousMenu);

        if (this.hasMenuBtn) {
            const menuBtn = document.querySelector('#menu');
            if (menuBtn) menuBtn.parentNode.removeChild(menuBtn);
        }
    }

    addSeparator () {
        const hr = document.createElement('hr');
        this.menu.appendChild(hr);
    }

    addSignature () {
        const signature =  `<svg width="50" height="50" version="1.1" viewBox="0 0 13.229166 13.229167" xmlns="http://www.w3.org/2000/svg"><g><rect y="-7.7716e-16" width="13.229" height="13.229" fill="#aaa" style="paint-order:normal"/><g fill="#fff"><path d="m5.7496 1.641v6.8601c0 0.75774-0.61427 1.372-1.372 1.372-0.63771 0-1.174-0.43495-1.3278-1.0245l-1.2898 1.2898c0.54581 0.87079 1.514 1.4497 2.6176 1.4497 1.7049 0 3.087-1.3821 3.087-3.0871v-6.8601z"/><path d="m8.3907 5.4141v6.1741c1.701-5e-3 3.0785-1.385 3.0785-3.0871 0-1.7021-1.3775-3.0824-3.0785-3.087z"/><path d="m8.3907 1.641v3.43c0.94414-4e-3 1.7084-0.77004 1.7084-1.715s-0.76428-1.7115-1.7084-1.715z"/></g></g></svg`

        const linkGithub = Object.assign(
            document.createElement('a'),
            {href: 'https://github.com/jblanper', target: '_blank', id: 'signature'}
        );
        linkGithub.innerHTML = 'by' + signature;
        this.menu.appendChild(linkGithub);
    }

    render () {
        if (this.hasMenuBtn) {
            this.svg = createSVGElement('svg', {width: 45, height: 45, id: 'menu'});

            const rect1 = createSVGElement('rect',
                {x: 10, y: 10, width: 25, height: 5, fill: '#000'}
            );
            this.svg.appendChild(rect1);

            const rect2 = createSVGElement('rect',
                {x: 10, y: 20, width: 25, height: 5, fill: '#000'}
            );
            this.svg.appendChild(rect2);
        
            const rect3 = createSVGElement('rect',
                {x: 10, y: 30, width: 25, height: 5, fill: '#000'}
            );
            this.svg.appendChild(rect3);

            document.body.appendChild(this.svg);
            this.menu.classList.add('moverIzq');

            // close Btn
            this.closeBtn = Object.assign(
                document.createElement('button'),
                {textContent: '[ close ]', id: 'close'}
            );
            this.menu.appendChild(this.closeBtn);
        }

        document.body.appendChild(this.menu);

    }

    eventListener () {
        if (this.hasMenuBtn) {
            this.svg.addEventListener(
                'click', this.openEventHandler.bind(this), {once: true}
            );
        }

        this.menu.addEventListener('change', this.updateEventhandler.bind(this));
        this.menu.addEventListener('click', this.updateEventhandler.bind(this));
    }

    openEventHandler (event) {
        this.menu.classList.remove('moverIzq');

        this.closeBtn.addEventListener(
            'click', this.closeEventHandler.bind(this), {once: true}
        );
    }

    closeEventHandler (event) {
        this.menu.classList.add('moverIzq');
        event.stopPropagation();

        this.svg.addEventListener(
            'click', this.openEventHandler.bind(this), {once: true}
        );
    }

    updateEventhandler (event) {
        if (
            (event.type === 'change' && (
                event.target.type === 'range' || event.target.tagName === 'SELECT')
            ) || (event.type === 'click' && event.target.nodeName === 'BUTTON')
        ) {
            if (this.shouldUpdate) this.scope.update();
            if (this.shouldDraw) this.scope.draw();
       }
    }
}
