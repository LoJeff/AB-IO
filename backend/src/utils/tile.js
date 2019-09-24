import { POS } from './pos.js';

class TILE {
    constructor(x, y) {
        this.pos = new POS(x, y);
        this.neighbours = [];
        this.occupied = false;
        this.unit = null;
    }
}

class TILE_GRAPH {
    constructor() {
        this.tiles = {};
    }

    push(tile) {
        this.tiles[tile.pos.x + "," + tile.pos.y] = tile;
    }

    get(pos) {
        return this.tiles[pos.x + "," + pos.y];
    }

    del(pos) {
        delete this.tiles[pos.x + "," + pos.y];
    }

    log() {
        const entries = Object.entries(this.tiles);
        // console.log(entries);
    }
}

module.exports = {
    TILE,
    TILE_GRAPH
} 