const WARRIOR = require('./unitTypes/warrior.js')

const UNIT_TYPES = {
    "Warrior": WARRIOR
};

class POS {
    constructor() {
        this.x = null;
        this.y = null;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }

    z() {
        return -(x+y);
    }
}

class UNIT_BATTLE_INFO {
    constructor() {
        this.pos = new POS();
    }
}

class UNIT_STATIC_INFO {
    constructor(type) {
        this.type = type;
        this.lvl = 1;
        this.pos = new POS();
        this.curHP = UNIT_TYPES[this.type][1].hp;
    }
}

class UNIT {
    constructor(id, type) {
        this.id = id;
        this.battle = new UNIT_BATTLE_INFO();
        this.static = new UNIT_STATIC_INFO(type);
    }
}

module.exports = {
    UNIT,
    UNIT_STATIC_INFO,
    UNIT_BATTLE_INFO,
    POS
}