import Vector from './vector.js';

export default class Ellipse {
    constructor ({angleVel, center, radiusX, radiusY, layerNum, modifiers}) {
        this._angleVel = angleVel;
        this._center = center;
        this._radiusX = radiusX;
        this._radiusY = radiusY;
        this._layerNum = layerNum
        this._modifiers = modifiers;

        this._outlinePointsNum = Math.floor((Math.PI * 2) / angleVel);

        this._outline = this._getOutline();
    }

    modifyParams ({center, radiusX, radiusY}) {
        this._center = center;
        this._radiusX = radiusX;
        this._radiusY = radiusY;

        this._getOutline();
    }

    _getOutlinePoint (i) {
        const angle = this._angleVel * i;
        const newRadiusX = this._modifiers.modifyEllipseRadius(this._radiusX, angle, i, this._layerNum);
        const newRadiusY = this._modifiers.modifyEllipseRadius(this._radiusY, angle, i, this._layerNum);

        const point = Vector.fromPolar(angle, newRadiusX, newRadiusY)
            .add(this._center)

        return this._modifiers.modifyOutlinePoint(point, this._radiusX, angle, i, this._layerNum);
    }

    _getOutline () {
        this._outline = Array.from(
            {length: this._outlinePointsNum},
            (_, i) => this._getOutlinePoint(i)
        );
    }

    plot (ctx, i = 0) {
        //setup
        ctx.strokeStyle = this._modifiers.setColor(i);
        ctx.lineWidth = this._modifiers.setLineWidth(i);

        //draw
        ctx.beginPath();
        ctx.moveTo(this._outline[0].x, this._outline[0].y);
        this._outline.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.lineTo(this._outline[0].x, this._outline[0].y);
        ctx.stroke();
    }
}

