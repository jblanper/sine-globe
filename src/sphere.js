import Vector from './vector.js';
import Ellipse from './ellipse.js';

export default class Sphere {
    constructor ({center, radius, layersNum, angleVel, modifiers}) {
        this.radiusX = radius.x;
        this.radiusY = radius.y;
        this.center = center;
        this.angleVel = angleVel;
        this.modifiers = modifiers;

        this.layersNum = layersNum;
        //to keep track for changes
        this.origLayerNum = layersNum;
        this.sep = (this.radiusY * 2) / this.layersNum;

        this.layers = this.setLayers();
    }

    setLayers () {
        return Array.from({length: this.layersNum}, (_, i) => {
            const radius = this.getLayerRadius(i);

            return  new Ellipse({
                angleVel: this.angleVel,
                center: new Vector(
                    this.center.x,
                    this.center.y + this.radiusY - (i * this.sep)
                ),
                radiusX: radius,
                radiusY: radius * this.modifiers.modifySmallRadius(i),
                layerNum: i,
                modifiers: this.modifiers
            });
        });
    }

    getLayerRadius (i) {
        const angle = (Math.PI / this.layersNum) * i;

        const radius = Vector.fromPolar(angle, this.radiusY, this.radiusX)
            .sub(new Vector(this.radiusY - (i * this.sep), 0))
            .magnitude;

        return this.modifiers.modifyLayerRadius(radius, angle, i);
    }

    recalculateParams () {
        this.sep = (this.radiusY * 2) / this.layersNum;
        this.layers = this.setLayers();

        // update the layerNum in modifiers too for strokeWidth
        this.modifiers.layersNum = this.layersNum;
    }

    update ({plotting = false, ctx, setColor, setLineWidth} = {}) {
        // number of layers has been changed by the user
        if (this.layerNum !== this.origLayerNum) this.recalculateParams();

        this.layers.forEach((layer, i) => {
            const radius = this.getLayerRadius(i);

            layer.update({
                radiusX: radius,
                radiusY: radius * this.modifiers.modifySmallRadius(i),
            });

            // for drawing
            if (plotting) layer.plot(ctx, i);
        });
    }
}
