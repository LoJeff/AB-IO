import UNIT from '../combatLogic/unit.js';
import HASH from '../utils/hash.js'

const benchSpace = 10;

class UNIT_HOLDER {
    constructor() {
        this.bench = [];
        this.board = new HASH();
    }

    addUnit(type, id) {
        if (this.bench.length < benchSpace) {
            this.bench.push(new UNIT(type, id));
            return true;
        } else {
            return false;
        }
    }

    getUnit(index) {
        return this.bench[index];
    }
}

export default UNIT_HOLDER;