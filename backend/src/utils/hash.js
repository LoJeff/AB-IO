class HASH {
    constructor(hash = {}) {
        this.hash = hash;
    }

    push(x, y) {
        this.hash[JSON.stringify(x)] = y;
    }

    get(x) {
        return this.hash[JSON.stringify(x)];
    }

    del(x) {
        delete this.hash[JSON.stringify(x)];
    }
}

export default HASH;