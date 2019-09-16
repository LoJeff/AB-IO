import UNIT_HOLDER from "./unitHolder.js";

const startMoney = 3;

class PLAYER {
    constructor(id, name) {
        this.id = id;
        this.unitHolder = new UNIT_HOLDER();
        this.money = startMoney;
        this.name = name;
    }

    addUnit(type) {
        this.unitHolder.addUnit(type, this.id);
    }
}

export default PLAYER;