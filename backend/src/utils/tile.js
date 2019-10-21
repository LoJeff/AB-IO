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
        this.graph = {};
    }

    push(tile) {
        this.graph[tile.pos.x + "," + tile.pos.y] = tile;
    }

    get(pos) {
        return this.graph[pos.x + "," + pos.y];
    }

    del(pos) {
        delete this.graph[pos.x + "," + pos.y];
    }

    clear(pos) {
        let posString = pos.x + "," + pos.y
        this.graph[posString].occupied = false;
        this.graph[posString].unit = null;
    }

    log() {
        const entries = Object.entries(this.graph);
        console.log(entries);
    }
}

module.exports = {
    TILE,
    TILE_GRAPH
} 