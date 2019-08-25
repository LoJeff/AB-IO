import { UNIT } from "./unit.js";
import { POS, boardWidth, validXY } from "./unit.js";

Object.prototype.pushByRef = function(x, y) {
    this[JSON.stringify(x)] = y;
}

Object.prototype.getByRef = function(x) {
    return this[JSON.stringify(x)];
}

Object.prototype.delByRef = function(x) {
    delete this[JSON.stringify(x)];
}

class TILE {
    constructor(x, y) {
        this.pos = new POS(x, y);
        this.neighbours = [];
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
        console.log(entries);
    }
}

class GAME_BOARD {
    constructor() {
        this.tiles = new TILE_GRAPH();
        var stack = [];

        //push tile (0,0)
        this.tiles.push(new TILE(0, 0));
        stack.push(this.tiles.get(new POS(0, 0)));

        while (stack.length > 0) {
            let cur = stack.pop();
            //Iterate through all the directions of tiles 
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    //Check for valid tile
                    if (!(i == 0 && j == 0) && validXY(cur.pos.x + i, cur.pos.y + j)) {
                        let nbrPos = new POS(cur.pos.x + i, cur.pos.y + j);

                        //Creates the tile if it doesn't exist already then adds it as a neighbour
                        if (this.tiles.get(nbrPos) == undefined) {
                            this.tiles.push(new TILE(nbrPos.x, nbrPos.y));
                            stack.push(this.tiles.get(nbrPos));
                        }
                        cur.neighbours.push(this.tiles.get(nbrPos));
                    }
                }
            }
        }
        this.logTiles();
    }

    logTiles() {
        this.tiles.log();
    }

    nearestEnemy(src) {
        //Using Dijkstra
        var queue = [];
        queue.push(src);
        let prevMap = {};
        prevMap.pushByRef(src.pos, null);
        let found = null;
        while (queue.length > 0) {
            let cur = queue.shift();
            //Visit all neighbours of cur
            for (neighbour in cur.neighbours) {
                //Check if not visited
                if (prevMap.getByRef(neighbour.pos) == undefined) {
                    //Push previous tile if the neighbouring tile is empty or has an enemy
                    if (neighbour.unit == null || neighbour.unit.player != src.unit.player) {
                        prevMap.pushByRef(neighbour.pos, cur.pos);
                    }
                    //Check if the neighbouring tile has a unit on it
                    if (neighbour.unit != null) {
                        //Check if the unit is an enemy
                        if (neighbour.unit.player != src.unit.player) {
                            found = neighbour;
                        }
                        break;
                    } else {
                        queue.push(neighbour);
                    }
                }
            }
            if (found != null) break;
        }
        var path = [];
        if (found != null) {
            let cur = found.pos;
            while (cur != null) {
                path.unshift(cur);
                cur = prevMap.getByRef(cur);
            }
        }
        return path;
    }

    placeUnit(unit, pos) {
        if (this.tiles[pos.x][pos.y].unit == null) {
            this.tiles[pos.x][pos.y].unit = unit;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = {
    GAME_BOARD
}