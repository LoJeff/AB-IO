import { POS } from '../utils/pos.js';
import UNIT_TYPES from './unitTypes/unitType.js';

class UNIT {
    constructor(type, id) {
        this.playerId = id;
        this.type = type;
        this.lvl = 1;
        this.benchIdx = -1;
        this.startPos = new POS();
        this.curPos = new POS();
        this.nextPos = new POS();

        let unitInfo = UNIT_TYPES[this.type].infoLvl[this.lvl];
        this.hp = unitInfo.hp;
        this.pDmg = unitInfo.pDmg;
        this.range = unitInfo.range;
    }

    moving() {
        if (this.nextPos.x == null || this.nextPos.y == null) {
            return false;
        } else {
            return true;
        }
    }
}

export default UNIT;