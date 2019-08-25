import { UNIT, POS, validPos } from "./combatLogic/unit.js";

const benchSpace = 10;
const startMoney = 3;

class UNIT_HOLDER {
    constructor() {
        this.bench = [];
        this.board = [];
    }

    addUnit(type, id) {
        var bench = this.bench;
        if (bench.length < benchSpace) {
            this.bench.push(new UNIT(type, id));
            return true;
        } else {
            return false;
        }
    }

    placeOnBoard(newPos) {
        if (validPos(newPos)) {
            console.log("VALID");
        }
    }
}

class PLAYER {
    constructor(id) {
        this.id = id;
        this.unitHolder = new UNIT_HOLDER();
        this.money = startMoney;
    }

    addUnit(type) {
        this.unitHolder.addUnit(type, this.id);
    }
}

module.exports = {
    PLAYER
}