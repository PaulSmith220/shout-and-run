/**
 * Created by paul on 13.03.2017.
 */
export default {
    frame: {
        width: 500,
        height: 250
    },

    audio: {
        shoutLevel: 0.5,
        whisperLevel: 0.06
    },

    world: {
        gravity: 0.5,
        blockSize: 50
    },

    player: {
        speedFactor: 1,
        jumpPower: 2,
        size: 30,
        speedLimit: {
            x: 2,
            y: 7
        }
    }
}