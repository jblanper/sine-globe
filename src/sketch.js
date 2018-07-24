import Vector from './vector.js';
import Sphere from './sphere.js';
import Modifiers from './modifiers.js';
import Menu from './ui/menu.js';
import DownloadButton from './ui/downloadButton.js';
import PlayButton from './ui/playButton.js';
import Slider from './ui/slider.js';
import Description from './ui/description.js';

export default class Sketch {
    constructor (ctx) {
        this._ctx = ctx;
    }

    init (options) {
        this._backgroundColor = options.backgroundColor;
        this.modifiers = new Modifiers(options);

        this._sphere = new Sphere({
            center: new Vector(this._ctx.canvas.width / 2, this._ctx.canvas.height / 2),
            radius: new Vector(options.sphere.radius.x, options.sphere.radius.y),
            radiusOffset: options.sphere.radiusOffset,
            layersNum: options.sphere.layersNum,
            angleVel: options.sphere.angleVel,
            modifiers: this.modifiers 
        });

        this.setBindings(options.sliders);
        this.draw();
    }

    setBindings (slidersOpt) {
        this.menu = new Menu({scope: this, shouldUpdate: false});

         this.description = new Description(
            'Sine-globe', [
            'Blob formed by ellipses made of sine waves.',
            `Press "play" to begin the animation. Every "wave" frequency and amplitude \
            can be tweaked. The last slider changes the hue. Enjoy!`
        ]);

        this.menu.addSeparator();

        this.playBtn = new PlayButton({
            playText: 'play', stopText: 'stop', scope: this}
        );

        this.getImgBtn = new DownloadButton({
            text: 'get IMG', scope: this, prop: 'png' 
        });

        this.menu.addSeparator();

        this.sliders = [];

        this.modifiers.waves.forEach((_, i) => {
            this.sliders.push(
                new Slider ({
                    label: `Wave ${i} amp`,
                    prop: 'A',
                    scope: this.modifiers.waves[i].orig,
                    max: slidersOpt.waveA.max,
                    min: slidersOpt.waveA.min,
                    step: slidersOpt.waveA.step
                })
            );

            this.sliders.push(
                new Slider ({
                    label: `Wave ${i} freq`,
                    prop: 'B',
                    scope: this.modifiers.waves[i].orig,
                    max: slidersOpt.waveB.max,
                    min: slidersOpt.waveB.min,
                    step: slidersOpt.waveB.step
                })
            );

            this.sliders.push(
                new Slider ({
                    label: `Wave ${i} N incr`,
                    prop: i,
                    scope: this.modifiers.nsIncr,
                    max: slidersOpt.nIncr.max,
                    min: slidersOpt.nIncr.min,
                    step: slidersOpt.nIncr.step
                })
            );

            this.menu.addSeparator();
        });

        this.sliders.push(
            new Slider ({
                prop: 'hue',
                scope: this.modifiers,
                max: slidersOpt.hue.max,
                min: slidersOpt.hue.min,
                step: slidersOpt.hue.step
            })
        );
    }

    get png () {
        const cachedCanvasCtx = Object.assign(
            document.createElement('canvas'),
            {width: this._ctx.canvas.width, height: this._ctx.canvas.height}
        ).getContext('2d');

        // draw both canvases into cacheCanvas
        cachedCanvasCtx.drawImage(this._ctx.canvas, 0, 0);

        return cachedCanvasCtx.canvas.toDataURL('image/png');
    }

    clear(options = [0, 0, this._ctx.canvas.width, this._ctx.canvas.height]) {
        this._ctx.fillStyle = this._backgroundColor;
        this._ctx.fillRect(...options);
    }

    draw () {
        this.clear()//this._sphere.getSphereRect());
        this._sphere.modifyLayers({plotting: true, ctx: this._ctx});
    }

    update () {
        this.modifiers.update();
    }
}
