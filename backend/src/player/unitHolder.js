import UNIT from '../combatLogic/unit.js';
import HASH from '../utils/hash.js'

const benchSpace = 10;

class UNIT_HOLDER {
    constructor(maxUnits = 1) {
        this.bench = [];
        for (let i = 0; i < benchSpace; i++) {
            this.bench[i] = null;
        }
        this.board = new HASH();
        this.maxUnits = maxUnits;
    }

    addUnit(type, id) {
        var emptyIdx = this.bench.findIndex( (unit) => unit == null);
        if (emptyIdx != -1) {
            this.bench[emptyIdx] = new UNIT(type, id)
            this.bench[emptyIdx].benchIdx = emptyIdx;
            return this.bench[emptyIdx];
        } else {
            return null;
        }
    }

    benchGet(index) {
        return this.bench[index];
    }

    benchMove(unit, index) {
        if (this.bench[index] == null) {
            this.board.del(unit.startPos);
            unit.startPos.empty();
            this.bench[index] = unit;
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
        if (this.board.get(pos) == undefined && Object.keys(this.board.hash).length < this.maxUnits
            && pos.validPBoardPos()) {
            this.board.push(pos, unit);
            unit.startPos = pos;
            if (unit.benchIdx != -1) {
                this.bench[unit.benchIdx] = null;
                unit.benchIdx = -1;
            } 
            return true
        } else {
            return false
        }
    }

    boardRmv(pos) {
        var unit = this.board.get(pos);
        this.board.del(pos);
        unit.startPos.empty();
        return unit;
    }
}

export default UNIT_HOLDER;