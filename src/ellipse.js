import Vector from './vector.js';

export default class Ellipse {
    constructor ({angleVel, center, radiusX, radiusY, layerNum, modifiers}) {
        this.angleVel = angleVel;
        this.center = center;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.layerNum = layerNum
        this.modifiers = modifiers;

        this.outlinePointsNum = Math.floor((Math.PI * 2) / angleVel);

        this.outline;
        this.setOutline();
    }

    setOutline () {
        this.outline = Array.from({length: this.outlinePointsNum} , (_, i) => {
            const angle = this.angleVel * i;
            const newRadiusX = this.modifiers.modifyEllipseRadius(
                this.radiusX, angle, i, this.layerNum
            );
            const newRadiusY = this.modifiers.modifyEllipseRadius(
                this.radiusY, angle, i, this.layerNum
            );

            const point = Vector.fromPolar(angle, newRadiusX, newRadiusY)
                .add(this.center)

            return this.modifiers.modifyOutlinePoint(
                point, this.radiusX, angle, i, this.layerNum
            );
        });
    }
    update ({radiusX, radiusY}) {
        this.radiusX = radiusX;
        this.radiusY = radiusY;

        this.setOutline();
    }

    plot (ctx, i = 0) {
        //setup
        ctx.strokeStyle = this.modifiers.setColor(i);
        ctx.lineWidth = this.modifiers.setLineWidth(i);

        //draw
        ctx.beginPath();
        ctx.moveTo(this.outline[0].x, this.outline[0].y);
        this.outline.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.lineTo(this.outline[0].x, this.outline[0].y);
        ctx.stroke();
    }
}

