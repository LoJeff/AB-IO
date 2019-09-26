var RAND = {
    rndInt: function(a, b) {
        return Math.floor(Math.random() * (b - a)) + a;
    },

    rndFlt: function(a, b, c) {
        return Math.floor(Math.random() * (b - a) / c) * c + a;
    },

    aryShfl: function(array) {
        console.assert(Array.isArray(array), "expected array");
        for (var i = array.length - 1; i > 0; i--) {
            let j = this.rndInt(0, i);
            let temp = array[j];
            array[j] = array[i];
            array[i] = temp;
        }
    }
}

export default RAND;