import Sketch from './sketch.js';
import { options } from './conf.js';

function main () {
    // initialize canvas
    const canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const sketch = new Sketch(ctx);
    sketch.init(options)
}

main();
