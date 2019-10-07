const SHOP_UNIT_STATUS = {
    INVENTORY: 0,
    PLAYERSHOP: 1,
    PURCHASED: 2
}

class SHOP_UNIT{
	constructor(type){
		this.status = INVENTORY;
		this.unitType = type;
	}
}