import WARRIOR from './unitTypes/warrior.js' ;

const boardWidth = 5;

const UNIT_TYPES = {
    "Warrior": new WARRIOR()
};

class POS {
    constructor(x = null, y = null) {
        this.x = x;
        this.y = y;
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

function validXY(x, y) {
    return (-boardWidth <= x && x <= boardWidth 
        && -boardWidth <= y && y <= boardWidth);
}

function validPos(pos) {
    return (-boardWidth <= pos.x && pos.x <= boardWidth 
        && -boardWidth <= pos.y && pos.y <= boardWidth);
}

class UNIT {
    constructor(type, player) {
        this.player = player;
        this.type = type;
        this.lvl = 1;
        this.pos = new POS();
        this.curHP = UNIT_TYPES[this.type].lvl[this.lvl].hp;
    }
}

module.exports = {
    UNIT,
    UNIT_TYPES,
    POS,
    boardWidth,
    validXY,
    validPos
}