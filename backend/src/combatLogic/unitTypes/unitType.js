class UNIT_TYPE {
    constructor(unitInfo) {
        this.lvl = [];
        this.lvl[1] = {};
        this.lvl[1].hp = unitInfo.hp1;
        this.lvl[1].dmg = unitInfo.dmg1;
        this.lvl[2] = {};
        this.lvl[2].hp = unitInfo.hp2;
        this.lvl[2].dmg = unitInfo.dmg2;
        this.lvl[3] = {};
        this.lvl[3].hp = unitInfo.hp3;
        this.lvl[3].dmg = unitInfo.dmg3;
        this.range = unitInfo.range;
    }
}

export default UNIT_TYPE;