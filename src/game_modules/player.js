/**
 * Created by paul on 13.03.2017.
 */
import config from "../config";
export default class {
    constructor() {
        this.pos = [0, 0];
        this.speed = [0, 0];
        this.lives = 10;
    }

    update(level) {
        let gravity = config.world.gravity;

        let blocks = level.blocks;

        this.speed[1] = Math.max(this.speed[1] + gravity, config.player.speedLimit);

        let dy = this.speed[1] - config.player.size/2;

        let playerBlockCoords = [
            Math.floor(this.pos[0]/config.world.blockSize),
            Math.ceil((this.pos[1] + dy)/config.world.blockSize),
        ];

        let collisionPoint = playerBlockCoords[1];

        if (blocks[collisionPoint][playerBlockCoords[0]].type == "ground") {
            this.speed[1] = 0;
        }

        this.pos[1] += this.speed[1];

    }
}