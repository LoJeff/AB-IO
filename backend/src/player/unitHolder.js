import UNIT from '../combatLogic/unit.js';
import HASH from '../utils/hash.js'

const benchSpace = 10;

class UNIT_HOLDER {
    constructor() {
        this.bench = [];
        for (let i = 0; i < benchSpace; i++) {
            bench[i] = null;
        }
        this.board = new HASH();
    }

    addUnit(type, id) {
        var emptyIdx = this.bench.findIndex( (unit) => unit == null);
        if (emptyIdx != -1) {
            this.bench[emptyIdx] = new UNIT(type, id)
            return true;
        } else {
            return false;
        }
    }

    benchGet(index) {
        return this.bench[index];
    }

    benchMove(unit, index) {
        if (bench[index] == null) {
            this.board.del(unit.startPos);
            unit.startPos.nullXY();
            bench[index] = unit;
            unit.benchIdx = index;
            return true
        } else {
            return false
        }
    }

    benchRmv(index) {
        var unit = this.bench[index];
        this.bench[index] = null;
        unit.benchIdx = -1;
        return unit;
    }

    boardGet(pos) {
        return this.board.get(pos);
    }

    boardMove(unit, pos) {
        if (this.board.get(pos) == undefined) {
            this.board.push(pos, unit);
            unit.startPos = pos;
            bench[unit.benchIdx] = null;
            unit.benchIdx = -1;
            return true
        } else {
            return false
        }
    }

    boardRmv(pos) {
        var unit = this.board.get(pos);
        this.board.del(pos);
        unit.startPos.nullXY();
        return unit;
    }
}

export default UNIT_HOLDER;