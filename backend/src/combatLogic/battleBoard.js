import UNIT from "./unit.js";
import PLAYER from '../player/player.js';
import { POS, validBBoardPos, boardWidth } from '../utils/pos.js';
import { TILE, TILE_GRAPH } from '../utils/tile.js';
import HASH from '../utils/hash.js';
import RAND from '../utils/rand.js';

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
                    if (i != j && validBBoardPos(cur.pos.x + i, cur.pos.y + j)) {
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
    }

    logTiles() {
        this.tiles.log();
    }

    nearestEnemyPath(unit) {
        //Using Dijkstra
        var queue = [];
        let srcRoundedPos = unit.curPos.roundedPos();
        queue.push(this.tiles.get(srcRoundedPos));
        let prevMap = new HASH();
        prevMap.push(srcRoundedPos, null);
        let found = null;
        while (queue.length > 0) {
            let cur = queue.shift();
            //Visit all neighbours of cur
            for (var index in cur.neighbours) {
                let neighbour = cur.neighbours[index];
                //Check if not visited
                if (prevMap.get(neighbour.pos) == undefined) {
                    //Push previous tile if the neighbouring tile is empty 
                    //and not occupied or has an enemy on it
                    if (!neighbour.occupied || neighbour.unit != null && 
                        neighbour.unit.playerId != unit.playerId) {
                        prevMap.push(neighbour.pos, cur.pos);
                    }
                    //Check if the neighbouring tile has an enemy unit
                    if (neighbour.unit != null && neighbour.unit.playerId != unit.playerId) {
                        found = neighbour;
                        break;
                    } else if (!neighbour.occupied && prevMap.get(neighbour.pos) != undefined) {
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
                cur = prevMap.get(cur);
            }
        }
        return path;
    }

    moveUnit(unit) {
        var path = this.nearestEnemyPath(unit);
        console.log("PATH: ");
        for (var i in path) {
            console.log(path[i]);
        }
        // Checking if the unit is already in range
        if (path.length > unit.range + 1) {
            path[1].occupied = true;
            this.tiles.get(unit.curPos.roundedPos()).occupied = false;
            return path[1];
        } else {
            return null;
        }
    }

    enemyInRange(unit) {
        var queue = [];
        var srcTile = this.tiles.get(unit.curPos.roundedPos());
        queue.push({tile: srcTile, dist: 0});
        var found = new Set([srcTile]);
        let cur = null;
        while (queue.length > 0) {
            cur = queue.shift();
            //Visit all neighbours of cur
            for (var index in cur.tile.neighbours) {
                let neighbour = cur.tile.neighbours[index];
                if (neighbour.unit != null && neighbour.unit.playerId != unit.playerId) {
                    return neighbour.unit;
                } else if (cur.dist < unit.range && !found.has(neighbour)) {
                    queue.push({tile: neighbour, dist: cur.dist + 1});
                    found.add(neighbour);
                }
            }
        }
        return null;
    }

    placeUnit(unit, pos) {
        unit.curPos.setPos(pos);
        let tile = this.tiles.get(pos);
        console.log(unit);
        if (tile.unit == null) {
            tile.unit = unit;
            tile.occupied = true;
            return true;
        } else {
            return false;
        }
    }
    
    addPlayerUnits(players) {
        var idxs = [...Array(players.length - 1).keys()];
        RAND.aryShfl(idxs);
        for (i in players) {
            let units = players[i].unitHolder.board;
            for (j in units) {
                let initPos = new POS(unit.startPos.x, unit.startPos.y);
                initPos.rotateCw(idxs[i]);
                console.assert(this.placeUnit(units[j], initPos),
                    "placing a second unit in the same hex for initialization");
            }
        } 
    }

    cleanBoard() {
        for (i in this.tiles.graph) {
            this.tiles.graph[i].occupied = false;
            this.tiles.graph[i].unit = null;
        }
    }
}

module.exports = {
    GAME_BOARD,
    boardWidth
}