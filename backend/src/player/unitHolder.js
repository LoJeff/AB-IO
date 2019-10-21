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

    addUnit(type, playerId) {
        var lvlUpUnit = this.checkUpgrade(type);
        if (lvlUpUnit != null) {
            return lvlUpUnit;
        }
        var emptyIdx = this.bench.findIndex( (unit) => unit == null);
        if (emptyIdx != -1) {
            this.bench[emptyIdx] = new UNIT(type, playerId)
            this.bench[emptyIdx].benchIdx = emptyIdx;
            return this.bench[emptyIdx];
        } else {
            return null;
        }
    }

    checkUpgrade(type) {
        var numLvl = [[], [], []];
        var delUnits;
        // Finding all occurences of a specific type of unit that the player owns
        for (const unit in Object.values(this.board.hash)) {
            if (type == unit.type) {
                numLvl[unit.lvl - 1].push(unit);
            }
        }
        for (const unit of this.bench) {
            if (unit != null && type == unit.type) {
                numLvl[unit.lvl - 1].push(unit);
            }
        }

        var lvlUpUnit = null;
        // Checking if combining units is possible
        if (numLvl[0].length == 2 && numLvl[1].length == 2) { // Can make a lvl 3
            lvlUpUnit = numLvl[1].shift();
            delUnits = [...numLvl[0], ...numLvl[1]];
        } else if (numLvl[0].length == 2) { // Can make a lvl 2
            lvlUpUnit = numLvl[0].shift();
            delUnits = numLvl[0];
        }

        if (lvlUpUnit != null) {
            console.log(delUnits);
            for (const unit of delUnits) {
                console.assert(this.rmv(unit),
                    "Error: couldn't remove unit during upgrade\n Unit: %o\n UnitHolder: %o", unit, this);
            }
            lvlUpUnit.lvlUp();
        }
        return lvlUpUnit;
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
        if (this.board.get(pos) == undefined 
            && Object.keys(this.board.hash).length < this.maxUnits && pos.validPBoardPos()) {
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

    rmv(unit) {
        if (unit.benchIdx != -1) {
            console.assert(unit.startPos.isEmpty(), 
                "Error: unit on board and bench\nunit: %o", unit);
            this.bench[unit.benchIdx] = null;
            return true;
        } else if (!unit.startPos.isEmpty()) {
            this.board.del(unit.startPos);
            return true;
        }
        return false;
    }
}

export default UNIT_HOLDER;