/**
 * Created by paul on 13.03.2017.
 */
import groundBlock from "./blocks/ground";
import airBlock from "./blocks/air";

let getBlock = (type) => {
    switch (type) {
        case "H": {
            return groundBlock();
        }

        default: return airBlock();

    }
};


export default class {
    static getBlock (type) {
        getBlock(type);
    };

    static getLevelBlocks(structure) {
        let level = [];
        for (let i = 0; i < structure.length; i++) {
            let line = [];
            for (let n = 0; n < structure[i].length; n++) {
                line.push(getBlock(structure[i][n]));
            }
            level.push(line);
        }

        return level;
    }
}