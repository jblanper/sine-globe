import Vector from './vector.js';
import Ellipse from './ellipse.js';

export default class Sphere {
    constructor ({center, radius, radiusOffset = 0, layersNum, angleVel, modifiers}) {
        this._radiusX = radius.x;
        this._radiusY = radius.y;
        this._radiusOffset = radiusOffset;
        this._center = center;
        this._layersNum = layersNum;
        this._angleVel = angleVel;
        this._modifiers = modifiers;

        this._sep = (this._radiusY * 2) / this._layersNum;

        this._initialLayersParams = this._setLayersParams();
        this._layers = this._setLayers();
    }

    // para sketch.clear, pero si los parametros son muy locos,
    // no vale
    getSphereRect () {
        return [
            this._center.x - this._radiusX - 250,
            this._center.y - this._radiusY - 250,
            this._radiusX * 2 + 500,
            this._radiusY * 2 + 500
        ];
    }

    _getLayerCenter (i) {
        return new Vector(
            this._center.x,
            this._center.y + this._radiusY - (i * this._sep)
        );
    }

    _getLayerRadius (i) {
        const angle = (Math.PI / this._layersNum) * i;

        const radius = Vector.fromPolar(angle, this._radiusY, this._radiusX)
            .sub(new Vector(this._radiusY - (i * this._sep), 0))
            .magnitude + this._radiusOffset;

        return this._modifiers.modifyLayerRadius(radius, angle, i);
    }

    _setLayersParams () {
        return Array.from(
            {length: this._layersNum},
            (_, i) => ({
                center: this._getLayerCenter(i),
                radius: this._getLayerRadius(i)
            })
        );
    }

    _setLayers () {
        return this._initialLayersParams.map((params, i) => {
            return  new Ellipse({
                angleVel: this._angleVel,
                center: params.center,
                radiusX: params.radius,
                radiusY: params.radius * this._modifiers.modifySmallRadius(i),
                layerNum: i,
                modifiers: this._modifiers
            });
        });
    }

    modifyLayers ({plotting = false, ctx, setColor, setLineWidth} = {}) {
        this._setLayersParams().forEach((params, i) => {
            this._layers[i].modifyParams({
                center: params.center,
                radiusX: params.radius,
                radiusY: params.radius * this._modifiers.modifySmallRadius(i),
            });

            if (plotting) this._layers[i].plot(ctx, i);
        });
    }
}
