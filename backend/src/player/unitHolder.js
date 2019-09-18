import UNIT from '../combatLogic/unit.js';

const benchSpace = 10;

class UNIT_HOLDER {
    constructor() {
        this.bench = [];
        this.board = [];
    }

    addUnit(type, id) {
        if (this.bench.length < benchSpace) {
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

    getUnit(index) {
        if (index < this.bench.length) {
            return this.bench[index];
        } else {
            return null;
        }
    }
}

export default UNIT_HOLDER;