import initAudioContext from "./core_modules/initAudioContext";
import config from "./config";
import Boot from "./game_modules/boot";
import Preload from "./game_modules/preload";
import Game from "./game_modules/game";
import Init from "./game_modules/init";

require("./assets/tilemaps/level1.json");
require("./assets/tilemaps/level1.tmx");
require("./assets/tilemaps/level1_my.json");
require("./assets/tilemaps/level1_my.tmx");
require.context('./assets/images', true, /\.png$/);
require.context('./assets/audio', true, /\.(mp3|ogg|wav)$/);

require("./js/gamecontroller.min.js");
require("./js/phaser.min.js");

window.canvasCtx = null;
window.volumeMeter = null;

window.onload = () => {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext),
        animationFrame = null;

    let {volumeMeter, mediaStreamSource} = initAudioContext(audioCtx, (meter => {
        Boot();
        Preload();
        Game(meter);
        Init();
    }));

    document.getElementById("shoutLevel").value = config.audio.shoutLevel * 100;
    document.getElementById("whisperLevel").value = config.audio.whisperLevel * 100;


};