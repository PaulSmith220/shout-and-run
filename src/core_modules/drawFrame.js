/**
 * Created by paul on 13.03.2017.
 */
import config from "../config";

let drawFrame = (canvasCtx, animationFrame, volumeMeter) => {
    // clear the background
    canvasCtx.clearRect(0, 0, config.frame.width, config.frame.height);


    let volume = volumeMeter.volume;
    drawVolume(canvasCtx, volumeMeter);

    if (window["world"]) {
        world.drawLevel(world.currentLevel, canvasCtx, world.cameraPos);
    }

    if (window["player"]) {
        window.player.speed[0] = volume*4;
        if (volume > config.audio.shoutLevel) {
            window.player.jump();
        }
        window.player.update(world.levels[world.currentLevel]);
        world.drawPlayer(window.player, canvasCtx);
        //world.cameraPos = player.pos[0] / config.world.blockSize;

    }





    // set up the next visual callback
    animationFrame = window.requestAnimationFrame( drawFrame.bind(this,  canvasCtx, animationFrame, volumeMeter) );
};

let drawVolume = (canvasCtx, volumeMeter) => {
    let volume = volumeMeter.volume;
// check if we're currently clipping
    if (volumeMeter.checkClipping) {
        canvasCtx.fillStyle = "red";
    }
    else {
        canvasCtx.fillStyle = "green";
    }

    if (volume > config.audio.shoutLevel) {
        canvasCtx.fillStyle = "purple";
    }

    // draw a bar based on the current volume
    //canvasCtx.fillRect(0, 0, volume * config.frame.width, config.frame.height);

    canvasCtx.beginPath();
    canvasCtx.arc(0, 0, volume * 60 , 0, Math.PI*2, true);
    canvasCtx.closePath();
    canvasCtx.fill();


    let shoutLevelX = config.audio.shoutLevel * 60;
    canvasCtx.strokeStyle = "#ddd";
    //canvasCtx.fillRect(shoutLevelX, 0, 2, config.frame.height);
    canvasCtx.beginPath();
    canvasCtx.arc(0, 0, shoutLevelX , 0, Math.PI*2, true);
    canvasCtx.closePath();
    canvasCtx.stroke();
};

export default drawFrame;