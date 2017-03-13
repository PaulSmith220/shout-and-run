/**
 * Created by paul on 13.03.2017.
 */

export default class {
    constructor(data) {
        if (!data.structure) {
            throw "No level structure";
        }
        this.name = data.name || "unnamed";
        this.spawnPoint = data.spawn || [1, 1];
        this.structure = data.structure;


    }
}