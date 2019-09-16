import UNIT from "./unit.js";
import PLAYER from '../player/player.js';
import POS from '../utils/pos.js';
import { TILE, TILE_GRAPH } from '../utils/tile.js';

const boardWidth = 5;

Object.prototype.pushByRef = function(x, y) {
    this[JSON.stringify(x)] = y;
}

Object.prototype.getByRef = function(x) {
    return this[JSON.stringify(x)];
}

Object.prototype.delByRef = function(x) {
    delete this[JSON.stringify(x)];
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
                    if (!(i == 0 && j == 0) && this.validXY(cur.pos.x + i, cur.pos.y + j)) {
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

    validXY(x, y) {
        return (-boardWidth <= x && x <= boardWidth 
            && -boardWidth <= y && y <= boardWidth);
    }

    logTiles() {
        this.tiles.log();
    }

    nearestEnemyPath(src) {
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
                    if (neighbour.unit == null || neighbour.unit.player.id != src.unit.player.id) {
                        prevMap.pushByRef(neighbour.pos, cur.pos);
                    }
                    //Check if the neighbouring tile has a unit on it
                    if (neighbour.unit != null) {
                        //Check if the unit is an enemy
                        if (neighbour.unit.player.id != src.unit.player.id) {
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
        let tile = this.tiles.get(pos);
        if (tile.unit == null) {
            tile.unit = unit;
            return true;
        } else {
            return false;
        }
    }

    updateUnitPos(unit) {
        let path = this.nearestEnemyPath(unit);
        if (path.length > 0) {
            unit.move(path[0]);
        }
    }
}

module.exports = {
    GAME_BOARD,
    boardWidth
}