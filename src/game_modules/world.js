/**
 * Created by paul on 13.03.2017.
 */
import blocksGenerator from "./blocksGenerator";
import config from "../config.js";
let levels = [
    {
        name: "Test",
        spawn: [1 * config.world.blockSize,1 * config.world.blockSize],
        structure: [
            'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
            'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
            'OOOOOOOOOOHHOHHHHOHHOOOOOOOOOO',
            'OOOOOOOHHOOOOOOOOOOOOOOOOOOOOO',
            'HHHHOHHHHOHHOHHHOHHOHHHHOHHHHH',
        ]}
];

let prepareLevel = (number) => {
    levels[number].blocks = blocksGenerator.getLevelBlocks(levels[number].structure);
};

let drawLevel = (num, ctx, _cameraPos) => {

    let cameraPos = Math.ceil(_cameraPos);

    let level = window.world.levels[num].blocks;

    let endPoint = Math.min(level[0].length, cameraPos + Math.floor(config.frame.width / config.world.blockSize));

    for (let y = 0; y < level.length; y++) {
        for (let x = cameraPos; x < endPoint; x++) {
            let block = level[y][x];
            if (block.type != "air") {
                ctx.fillStyle = block.color;
                ctx.fillRect(
                    x * config.world.blockSize - _cameraPos * config.world.blockSize,
                    y * config.world.blockSize,
                    block.size.width * config.world.blockSize,
                    block.size.height * config.world.blockSize
                );
            }
        }
    }
};

let drawPlayer = (player, ctx) => {
    ctx.fillStyle = "#444";

    ctx.beginPath();
    ctx.arc(player.pos[0], player.pos[1], config.player.size/2, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();

    //ctx.fillRect(player.pos[0], player.pos[1], config.player.size,  config.player.size);

};

export default {
    levels: levels,
    cameraPos: 0,
    prepareLevel: prepareLevel,

    drawLevel: drawLevel,
    drawPlayer: drawPlayer
}