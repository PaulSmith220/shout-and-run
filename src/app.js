/**
 * Created by paul on 13.03.2017.
 */

import initAudioContext from "./core_modules/initAudioContext";
import drawFrame from "./core_modules/drawFrame";
import config from "./config";
import World from "./game_modules/world";
import Player from "./game_modules/player";

window.world = null;
window.canvasCtx = null;
window.player = null;

window.onload = () => {
    let canvasElem = document.getElementById("gameView");
    canvasElem.width = config.frame.width;
    canvasElem.height = config.frame.height;
    canvasCtx = canvasElem.getContext("2d");


    world = World;
    world.currentLevel = 0;
    world.prepareLevel(0);
    world.cameraPos = 0;

    window.player = new Player();
    player.pos = world.levels[0].spawn;



    let audioCtx = new (window.AudioContext || window.webkitAudioContext),
        animationFrame = null;

    let {volumeMeter, mediaStreamSource} = initAudioContext(audioCtx, drawFrame.bind(this, canvasCtx, animationFrame));


};