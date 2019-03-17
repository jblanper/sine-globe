// helper functions
function createSVGElement (tagName, attributes) {
    const elem = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    Object.entries(attributes).forEach(attrib => {
        elem.setAttribute(attrib[0], attrib[1]);
    });

    return elem
}

export default class Menu {
    constructor ({
        scope, shouldDraw = true, shouldUpdate = true, hasMenuBtn = true,
        githubUrl
    }) {
        this.scope = scope;
        this.shouldUpdate = shouldUpdate;
        this.shouldDraw = shouldDraw;
        this.hasMenuBtn = hasMenuBtn;
        this.githubUrl = githubUrl;

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
        const signature = `<svg width="50" height="50" version="1.1" viewBox="0 0 13.229166 13.229167" xmlns="http://www.w3.org/2000/svg"><g id="logo-body" fill="#800000"><path d="m6.6152 0.023438c-3.6369 0-6.5918 2.9548-6.5918 6.5918 0 3.6369 2.9548 6.5898 6.5918 6.5898 3.6369 0 6.5898-2.9529 6.5898-6.5898 0-3.6369-2.9529-6.5918-6.5898-6.5918zm0 0.50781c3.363 0 6.084 2.721 6.084 6.084s-2.721 6.084-6.084 6.084-6.084-2.721-6.084-6.084 2.721-6.084 6.084-6.084z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" shape-rendering="auto" solid-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;isolation:auto;mix-blend-mode:normal;paint-order:normal;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/><g transform="translate(-.19844 .19844)"><path d="m8.1166 5.4546v5.6823c1.5655-0.0045 2.8332-1.2747 2.8332-2.8411 0-1.5665-1.2678-2.8369-2.8332-2.8411z"/><path d="m8.1204 1.6954v3.2544c0.89579-0.00377 1.6209-0.7306 1.6209-1.6272 0-0.89658-0.72514-1.6238-1.6209-1.6272z"/><path d="m5.8204 1.6958v6.996a0.81365 0.81365 0 0 1 -0.8137 0.8137 0.81365 0.81365 0 0 1 -0.8137 -0.8137l-1.5168 0.72437a2.4409 2.4409 0 0 0 2.3305 1.7167 2.4409 2.4409 0 0 0 2.4411 -2.4411v-6.996z" style="paint-order:normal"/></g></g></svg>`;

        const link = Object.assign(
            document.createElement('a'),
            {href: '//joseblancoperales.com', target: '_blank', id: 'signature'}
        );

        link.innerHTML = 'by' + signature;

        const githubLink = Object.assign(
            document.createElement('a'),
            {href: this.githubUrl, target: '_blank', id: 'github-link'}
        );
        githubLink.textContent = 'github';

        this.menu.appendChild(link);
        this.menu.appendChild(githubLink);
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
