import WARRIOR from './unitTypes/warrior.js';
import POS from '../utils/pos.js';

const UNIT_TYPES = {
    "Warrior": new WARRIOR()
};

class UNIT {
    constructor(type, player) {
        this.player = player;
        this.type = type;
        this.lvl = 1;
        this.curPos = new POS();
        this.pos = new POS();
        this.curHP = UNIT_TYPES[this.type].lvl[this.lvl].hp;
    }

    move(x, y) {
        this.pos.setXY(x, y);
    }
}

module.exports = {
    UNIT,
    UNIT_TYPES
}