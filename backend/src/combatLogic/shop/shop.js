import SHOP_UNIT from 'shopUnit.js'

// Library of converting unit types to the tier of that unit type.
const typeToTier = {
	"warriors": 1
}

// Library of converting Tier Levels to the Total Number of Units for that Unit in the Tier
const tierToNumbers = {
	1: 39
}

class SHOP{
	constructor(){
		// Make an array for each tier.
		this.tier1  = [];
		for (const type of Object.keys(typeToTier)){
			// Create new shop units. Create total number of units for that unit in the tier.
			for(var i = 0; i < tierToNumber[typeToTier[type]]; i++){
				tier1.push(new SHOP_UNIT(type));
			}
		}
		// Shuffle the array: TODO.
	}




}
