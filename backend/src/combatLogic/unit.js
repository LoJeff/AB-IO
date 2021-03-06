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
        this.target = null;
        this.tick = 0;

        let unitInfo = UNIT_TYPES[this.type].infoLvl[this.lvl];
        this.hp = unitInfo.hp;
        this.pDmg = unitInfo.pDmg;
        this.range = unitInfo.range;
        this.atkSpd = unitInfo.atkSpd;
    }

    lvlUp() {
        this.lvl += 1;
        
        let unitInfo = UNIT_TYPES[this.type].infoLvl[this.lvl];
        this.hp = unitInfo.hp;
        this.pDmg = unitInfo.pDmg;
        this.range = unitInfo.range;
        this.atkSpd = unitInfo.atkSpd;
    }

    reset() {
        // reset the stats
        let unitInfo = UNIT_TYPES[this.type].infoLvl[this.lvl];
        this.hp = unitInfo.hp;
        this.pDmg = unitInfo.pDmg;
        this.range = unitInfo.range;
        this.atkSpd = unitInfo.atkSpd;

        // reset unit combat states
        this.curPos.empty();
        this.nextPos.empty();
        this.target = null;
        this.tick = 0;
    }
}

export default UNIT;