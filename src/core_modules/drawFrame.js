/**
 * Created by paul on 13.03.2017.
 */
import config from "../config";

let drawFrame = (canvasCtx, animationFrame, volumeMeter) => {
    // clear the background
    canvasCtx.clearRect(0, 0, config.frame.width, config.frame.height);

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
    canvasCtx.arc(config.frame.width/2, config.frame.height/2, volume * config.frame.width , 0, Math.PI*2, true);
    canvasCtx.closePath();
    canvasCtx.fill();


    let shoutLevelX = config.audio.shoutLevel * config.frame.width;
    canvasCtx.strokeStyle = "black";
    //canvasCtx.fillRect(shoutLevelX, 0, 2, config.frame.height);
    canvasCtx.beginPath();
    canvasCtx.arc(config.frame.width/2, config.frame.height/2, shoutLevelX , 0, Math.PI*2, true);
    canvasCtx.closePath();
    canvasCtx.stroke();


    // set up the next visual callback
    animationFrame = window.requestAnimationFrame( drawFrame.bind(this,  canvasCtx, animationFrame, volumeMeter) );
};

export default drawFrame;