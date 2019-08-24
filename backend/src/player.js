import { UNIT } from "./combatLogic/unit.js";

const benchSpace = 10;
const startMoney = 3;

class UNIT_HOLDER {
    constructor() {
        this.bench = [];
        this.board = [];
    }

    addUnit(type) {
        var bench = this.unitHolder.bench;
        if (bench.length < benchSpace) {
            this.unitHolder.bench.push(new UNIT(type));
            return true;
        } else {
            return false;
        }
    }
}

class PLAYER {
    constructor(id) {
        this.id = id;
        this.unitHolder = new UNIT_HOLDER();
        this.money = startMoney;
    }
}

module.exports = {
    PLAYER
}