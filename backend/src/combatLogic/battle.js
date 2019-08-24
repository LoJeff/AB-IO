import { UNIT, UNIT_STATIC_INFO, UNIT_BATTLE_INFO } from "./unit.js";
import { POS } from "./unit.js";

class TILE {
    constructor(x, y) {
        this.pos = new POS();
        this.pos.setXY(x, y);
        this.neighbour = [];
        this.unit = null;
    }
}

const boardWidth = 5;

class GAME_BOARD {
    constructor() {
        this.teams = [];
        this.tiles = {};
        var stack = [];

        //push tile (0,0)
        this.tiles[0] = { 0: new TILE(0, 0)};
        stack.push(this.tiles[0][0]);

        while (stack.length > 0) {
            let cur = stack.pop();
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (!(i == 0 && j == 0) && this.validXY(cur.pos.x + i, cur.pos.y + j)) {
                        let x = cur.pos.x + i;
                        let y = cur.pos.y + j;
                        if (this.tiles[x] == undefined) this.tiles[x] = {};
                        if (this.tiles[x][y] == undefined) {
                            this.tiles[x][y] = new TILE(x, y);
                            stack.push(this.tiles[x][y]);
                        }
                        cur.neighbour.push(this.tiles[x][y]);
                    }
                }
            }
        }
    }

    validXY(x, y) {
        return (-boardWidth <= x && x <= boardWidth 
            && -boardWidth <= y && y <= boardWidth);
    }

    logTiles() {
        for (let i = -boardWidth; i <= boardWidth; i++) {
            console.log(i + ":");
            for (let j = -boardWidth; j <= boardWidth; j++) {
                console.log("   " + j + ":" + "{");
                console.log(this.tiles[i, j]);
                console.log("   }");
            }
        }
    }
}

module.exports = {
    GAME_BOARD
}