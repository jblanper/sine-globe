export default class Wave {
    constructor ({type = 'sin', A, B, C = 0, D = 0, maxR = 0}) {
        // A: amplitude, B: freq, C: phase shift, D: vertical shift
        this.type = type;
        this.A = A;
        this.B = B;
        this.C = C;
        this.D = D;
        this.maxR = maxR;

        this.orig = {A, B, C, D};
    }

    getPoint (x) {
        return this.A * Math[this.type](this.B * x + this.C) + this.D
    }

    scaleA (currentR) {
        this.A = (this.orig.A * currentR) / this.maxR;
    }

    reset (...props) {
        if (props.length > 0) {
            props.forEach(prop => this[prop] = this.orig[prop]);
        }
        else {
            ({A: this.A, B: this.B, C: this.C, D: this.D} = this.orig);
        }
    }
}

