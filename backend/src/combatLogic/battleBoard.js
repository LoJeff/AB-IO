import UNIT from "./unit.js";
import PLAYER from '../player/player.js';
import { POS, validBBoardPos, boardWidth } from '../utils/pos.js';
import { TILE, TILE_GRAPH } from '../utils/tile.js';
import HASH from '../utils/hash.js';
import RAND from '../utils/rand.js';

import UNITSTATE from './unitState.js';

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


    // Logging Functions //
    dumpTiles() {
        this.tiles.log();
    }

    logTiles() {
        console.log("START TILE LOG:");
        let graph = this.tiles.graph;
        for (let i in graph) {
            if (graph[i].unit != null) {
                console.log(graph[i]);
            }
        }
        console.log("END TILE LOG")
    }

    // Battle Start Functions //

    placeUnit(unit, pos) {
        let tile = this.tiles.get(pos);
        if (tile.unit == null && !tile.occupied) {
            unit.curPos.setPos(pos);
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
        for (let i in players) {
            let units = players[i].unitHolder.board.hash;
            for (let j in units) {
                let initPos = new POS(units[j].startPos.x, units[j].startPos.y);
                initPos.rotateCW(parseInt(idxs[i]));
                console.assert(this.placeUnit(units[j], initPos),
                    "Error: placing a second unit in the same hex for initialization");
            }
        } 
    }

    // Battle End Functions //

    cleanBoard() {
        for (i in this.tiles.graph) {
            this.tiles.graph[i].occupied = false;
            this.tiles.graph[i].unit = null;
        }
    }

    // Battle Update Functions //

    updateTile(unit) {
        console.assert(this.tiles.get(nextPos).unit == null,
            "Error: attempting to move into a tile with a unit\n%o", this.tiles.get(nextPos));
        var origPos = new POS();
        origPos.setPos(unit.nextPos);
        origPos.x += unit.nextPos.x - unit.curPos.x;
        origPos.y += unit.nextPos.y - unit.curPos.y;
        origPos = origPos.roundedPos();
        var origTile = this.tiles.get(origPos);
        console.assert(origTile.unit === unit,
            "Error: updating wrong tile for unit\nunit1: %o\nunit2:", origTile.unit, unit);
        this.tiles.get(nextPos).unit = origTile.unit;
        origTile.unit = null;
    }

    updateUnit(unit) {
        if (unit.hp <= 0) return UNITSTATE.dead;// Unit is dead

        if (!unit.nextPos.isEmpty()) {// Unit currently has a destination to move to
            unit.curPos.stepTowards(unit.nextPos, 0.1);
            if (unit.curPos.isHalfway()) {
                this.updateTile(unit);
            } else if (!unit.curPos.isFloat()) {// Unit is done moving
                unit.nextPos.empty();
            }
            return UNITSTATE.move;
        } else if (unit.target != null) {// Unit currently has a target to attack
            unit.tick--;
            if (unit.tick == 0) {
                unit.target.hp -= unit.pDmg;
                if (unit.target.hp < 0) unit.target.hp = 0;
                unit.target == null;
            }
            return UNITSTATE.atk;
        } else {// Unit is currently idle on a tile ready to make a next move
            let nextMove = this.moveAtkUnit(unit);
            console.assert(nextMove.state, "Error: unknown unit state");
            if (nextMove.state == UNITSTATE.atk) {
                unit.tick = 9;
            }
            return nextMove.state;
        }
    }

    // Attacking with Moving Functions //

    enemyInRange(unit, src = null) {
        var queue = [];
        var srcTile;
        if (src == null) {
            srcTile = this.tiles.get(unit.curPos.roundedPos());
        } else {
            srcTile = src;
        }
        queue.push({tile: srcTile, dist: 0});
        let found = new Set([]);
        found.add(srcTile);
        let cur = null;
        while (queue.length > 0) {
            cur = queue.shift();
            //Visit all neighbours of cur
            for (var index in cur.tile.neighbours) {
                let neighbour = cur.tile.neighbours[index];
                if (found.has(neighbour)) continue;
                if (neighbour.unit != null && neighbour.unit.playerId != unit.playerId) {
                    return neighbour.unit;
                } else if (cur.dist + 1 < unit.range) {
                    queue.push({tile: neighbour, dist: cur.dist + 1});
                    found.add(neighbour);
                }
            }
        }
        return null;
    }

    nearestEnemyMoveAtk(unit) {
        //Using Dijkstra
        var queue = [];
        let srcRoundedPos = unit.curPos.roundedPos();
        queue.push(this.tiles.get(srcRoundedPos));
        let prevMap = new HASH();
        prevMap.push(srcRoundedPos, null);
        let found = null;
        let enemy = null;
        while (queue.length > 0) {
            let cur = queue.shift();
            //check if enemy is in range
            enemy = this.enemyInRange(unit, cur);
            if (enemy != null) {
                found = cur;
                break;
            }
            //Visit all neighbours of cur
            for (var index in cur.neighbours) {
                let neighbour = cur.neighbours[index];
                //Check if not visited and not occupied
                if (prevMap.get(neighbour.pos) == undefined && !neighbour.occupied) {
                    //Push previous tile if the neighbouring tile is not occupied
                    prevMap.push(neighbour.pos, cur.pos);
                    queue.push(neighbour);
                }
            }
        }
        var path = [];
        if (found != null && found != this.tiles.get(srcRoundedPos)) {
            let cur = found.pos;
            while (cur != null) {
                path.unshift(cur);
                cur = prevMap.get(cur);
            }
        }
        return {path: path, enemy: enemy};
    }

    moveAtkUnit(unit) {
        // Check if already moving
        if (unit.moving()) return null;

        var result = this.nearestEnemyMoveAtk(unit);
        console.log("PATH: ");
        for (var i in result.path) {
            console.log(result.path[i]);
        }
        // Checking if the unit is already in range
        if (result.path.length != 0) {
            this.tiles.get(result.path[1]).occupied = true;
            this.tiles.get(unit.curPos.roundedPos()).occupied = false;
            unit.nextPos.setPos(result.path[1]);
            return {state: UNITSTATE.move, target: result.path[1]};
        } else if (result.enemy != null) {
            unit.target = result.enemy;
            return {state: UNITSTATE.atk, target: result.enemy};
        } else {
            return {state: UNITSTATE.idle, target: null};
        }
    }
    
    // Moving Only Functions //

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
        // Check if already moving
        if (unit.moving()) return null;
        var path = this.nearestEnemyPath(unit);
        console.log("PATH: ");
        for (var i in path) {
            console.log(path[i]);
        }
        this.tiles.get(path[1]).occupied = true;
        this.tiles.get(unit.curPos.roundedPos()).occupied = false;
        unit.nextPos.setPos(path[1]);
        return path[1];
    }
}

module.exports = {
    GAME_BOARD,
    boardWidth
}