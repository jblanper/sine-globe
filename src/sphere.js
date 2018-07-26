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

        this.initialLayersParams = this.setLayersParams();
        this.layers = this.setLayers();
    }

    getLayerCenter (i) {
        return new Vector(
            this.center.x,
            this.center.y + this.radiusY - (i * this.sep)
        );
    }

    getLayerRadius (i) {
        const angle = (Math.PI / this.layersNum) * i;

        const radius = Vector.fromPolar(angle, this.radiusY, this.radiusX)
            .sub(new Vector(this.radiusY - (i * this.sep), 0))
            .magnitude;

        return this.modifiers.modifyLayerRadius(radius, angle, i);
    }

    setLayersParams () {
        return Array.from(
            {length: this.layersNum},
            (_, i) => ({
                center: this.getLayerCenter(i),
                radius: this.getLayerRadius(i)
            })
        );
    }

    setLayers () {
        return this.initialLayersParams.map((params, i) => {
            return  new Ellipse({
                angleVel: this.angleVel,
                center: params.center,
                radiusX: params.radius,
                radiusY: params.radius * this.modifiers.modifySmallRadius(i),
                layerNum: i,
                modifiers: this.modifiers
            });
        });
    }

    recalculateParams () {
        this.sep = (this.radiusY * 2) / this.layersNum;
        this.initialLayersParams = this.setLayersParams();
        this.layers = this.setLayers();

        // bindings
        // update the layerNum in modifiers too for strokeWidth
        this.modifiers.layersNum = this.layersNum;
    }

    modifyLayers ({plotting = false, ctx, setColor, setLineWidth} = {}) {
        // number of layers has been changed by the user
        if (this.layerNum !== this.origLayerNum) this.recalculateParams();

        this.setLayersParams().forEach((params, i) => {
            this.layers[i].modifyParams({
                center: params.center,
                radiusX: params.radius,
                radiusY: params.radius * this.modifiers.modifySmallRadius(i),
            });

            if (plotting) this.layers[i].plot(ctx, i);
        });
    }
}
