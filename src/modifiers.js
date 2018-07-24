import Wave from './wave.js';
import Vector from './vector.js';

export default class Modifiers {
    constructor(conf) {
        this.waves = conf.waves.map(obj =>
            new Wave(Object.assign(obj, {maxR: conf.sphere.radius.x}))
        );

        this.layersNum = conf.sphere.layersNum;
        this.hue = conf.modifiers.hue;

        this.nsIncr = conf.modifiers.nsIncrements;
        this.ns = [0, 0, 0]
    }

    update () {
        this.ns = this.ns.map((v, i) => v + this.nsIncr[i]);
        this.waves[0].C += this.nsIncr[0];
    }

    modifySmallRadius () {
        return 0.8;
    }

    modifyLayerRadius (r, a, i) {
        this.waves[1].reset();
        this.waves[1].scaleA(r);
        this.waves[1].C += a * Math.sin(this.ns[1]);
        //this.waves[1].D += (i * 0.1) * Math.sin(this.ns[1]);
        return r + this.waves[1].getPoint(a);
    }

    modifyEllipseRadius (r, a, i, y) {
        this.waves[0].reset('A', 'B');
        this.waves[0].scaleA(r);
        return r + this.waves[0].getPoint(a);
    }

    modifyOutlinePoint (p, r, a, i, y) {
        this.waves[2].reset();
        this.waves[2].scaleA(r);
        this.waves[2].C += (y * 0.01) * Math.sin(this.ns[2]);
        //this.waves[2].D += (i * 0.1) * Math.sin(this.ns[3]);
        return p.add(new Vector(
            this.waves[2].getPoint(a),
            this.waves[2].getPoint(i * 0.1)
        ));
    }

    setColor (i) {
        return `hsl(${this.hue + i}, 60%, 70%)`
    }

    setLineWidth (i) {
        return (i / this.layersNum);
    }
}
