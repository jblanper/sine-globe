import createSlider from './slider.js';

function runPlayer (animationObj) {
    // accepts and obj with animation related methods

    const playBtn = document.querySelector('#play');
    const canvas1 = document.querySelector('#canvas');

    const startFunc = _ => playBtn.value = '\u25FC'; // &#9724;
    const stopFunc = _ => playBtn.value = '\u25B6'; // &#9654; 

    playBtn.addEventListener('click', _ => animationObj.toggle(startFunc, stopFunc));
    canvas1.addEventListener('click', _ => animationObj.toggle(startFunc, stopFunc)); 
};

function updateDownload () {
    // create download link
    const canvas = document.querySelector('#canvas');
    const openBtn = document.querySelector("#open");
    const downloadBtn = document.querySelector("#download");

    return (_ => {
        // updates download link
        const dataURL = canvas.toDataURL('image/png');

        openBtn.href = dataURL;
        downloadBtn.href = dataURL;
    })();
};

function setupUploadOptions (sketch) {
    const fileBtn = document.querySelector('#addOptions');
    fileBtn.addEventListener('change', e => {
        fetch('conf.json')
            .then(res => res.json())
            .then(confObj => {
                sketch.setup(confObj);
                sketch.render();
        });
    });
};

function setupSliders (sketch, conf) {
    sketch.modifiers.waves.forEach((wave, i) => {
        createSlider({
            max: conf.waveA.max, min: conf.waveA.min,
            value: wave.orig.A,
            step: conf.waveA.step,
            label: `Wave ${i} A`,
            eventFunc: val => {
                sketch.modifiers.waves[i].orig.A = val;
                sketch.modifiers.waves[i].reset();
            }
        });
        createSlider({
            max: conf.waveB.max, min: conf.waveB.min,
            value: wave.orig.B,
            step: conf.waveB.step,
            label: `Wave ${i} B`,
            eventFunc: val => {
                sketch.modifiers.waves[i].orig.B = val;
                sketch.modifiers.waves[i].reset();
            }
        });
    });

    sketch.modifiers.nsIncr.forEach((nIncr, i) => {
        createSlider({
            max: conf.nIncr.max, min: conf.nIncr.min,
            value: nIncr,
            step: conf.nIncr.step,
            label: `N incr ${i}`,
            eventFunc: val => sketch.modifiers.nsIncr[i] = val
        });
    });

    createSlider({
        max: conf.hue.max, min: conf.hue.min,
        value: sketch.modifiers.hue,
        step: conf.hue.step,
        label: 'hue',
        eventFunc: val => sketch.modifiers.hue = val
    });

    const playBtn = document.querySelector('#play');
    document.querySelector('#sliders').addEventListener('input', e => {
        //It is playing
        if (playBtn.value === '\u25FC') {// &#9724;
            sketch.draw();
        } else {
            sketch.render();
        }
    });
}

export { runPlayer, updateDownload, setupUploadOptions, setupSliders };
