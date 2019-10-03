import UNIT_HOLDER from "./unitHolder.js";

const startMoney = 3;
const xpToNextLvl = {
    1: 2, 
    2: 2,
    3: 6,
    4: 12,
    5: 20,
    6: 32,
    7: 50,
    8: 70
}
const maxLvl = Object.keys(xpToNextLvl).length;

class PLAYER {
    constructor(id, name) {
        this.id = id;
        this.xp = 0;
        this.lvl = 1;
        this.money = startMoney;
        this.name = name;
        this.unitHolder = new UNIT_HOLDER(this.lvl);
    }

    // unitHolder functions
    addUnit(type) {
        return this.unitHolder.addUnit(type, this.id);
    }

    benchGet(index) {
        return this.unitHolder.benchGet(index);
    }

    benchMove(unit, index) {
        return this.unitHolder.benchMove(unit, index);
    }

    benchRmv(index) {
        return this.unitHolder.benchRmv(index);
    }

    boardGet(pos) {
        return this.unitHolder.boardGet(pos);
    }

    boardMove(unit, pos) {
        return this.unitHolder.boardMove(unit, pos);
    }

    boardRmv(pos) {
        return this.unitHolder.boardRmv(pos);
    }

    addXP(xp) {
        if (this.lvl < maxLvl) {
            this.xp += xp;
        }
        while (this.xp >= xpToNextLvl[this.lvl] && this.lvl < maxLvl) {
            this.xp -= xpToNextLvl[this.lvl];
            this.lvl++;
        }
        this.unitHolder.maxUnits = this.lvl;
    }
}

export default PLAYER;