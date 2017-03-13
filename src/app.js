/**
 * Created by paul on 13.03.2017.
 */

import initAudioContext from "./core_modules/initAudioContext";
import drawFrame from "./core_modules/drawFrame";
import config from "./config"

window.onload = () => {
    let canvasElem = document.getElementById("gameView");
    canvasElem.width = config.frame.width;
    canvasElem.height = config.frame.height;

    let canvasCtx = canvasElem.getContext("2d");
    let audioCtx = new (window.AudioContext || window.webkitAudioContext),
        animationFrame = null;

    let {volumeMeter, mediaStreamSource} = initAudioContext(audioCtx, drawFrame.bind(this, canvasCtx, animationFrame));


};