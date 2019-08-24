class UNIT_TYPE {
    constructor(lvl, unitInfo) {
        switch(lvl) {
            case 1:
                this.lvl = 1;
                this.hp = unitInfo.hp1;
                this.dmg = unitInfo.dmg1;
            break;
            case 2:
                this.lvl = 2;
                this.hp = unitInfo.hp2;
                this.dmg = unitInfo.dmg2;
            break;
            case 3:
                this.lvl = 3;
                this.hp = unitInfo.hp3;
                this.dmg = unitInfo.dmg3;
            break;
            default:
                throw "not a valid level";
        }
        this.range = unitInfo.range;
    }
}

export default UNIT_TYPE;