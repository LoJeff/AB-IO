import UNIT_TYPE from './unitType.js';

class WARRIOR extends UNIT_TYPE {
    constructor(lvl) {
        let unitInfo = {};
        unitInfo.hp1 = 100;
        unitInfo.dmg1 = 30;
        unitInfo.hp2 = 200;
        unitInfo.dmg2 = 50;
        unitInfo.hp3 = 400;
        unitInfo.dmg3 = 100;
        unitInfo.range = 1;
        super(lvl, unitInfo);
    }
}

export default WARRIOR;