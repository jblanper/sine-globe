export const options = {
    backgroundColor: "#000", 
    sphere: {
        radius: { x: 150, y: 200 },
        layersNum: 60,
        angleVel: 0.08
    },
    waves: [
        { type: "sin", A: 15, B: 7, C: 0, D: 0 },
        { type: "sin", A: 14, B: 6.5, C: 0, D: 0 },
        { type: "sin", A: 8, B: 3, C: 0, D: 0 }
    ],
    modifiers: {
        nsIncrements: [0.02, 0.025, 0.05],
        hue: 1
    },
    sliders: {
        layersNum: { max: 180, min: 8 },
        waveA: { max: 100, min: 0.1, step: 0.1 },
        waveB: { max: 50, min: 0.01, step: 0.01 },
        nIncr: { max: 0.2, min: 0.0000, step: 0.0001 },
        hue: { max: 360, min: 0, step: 1 }
    }
};
