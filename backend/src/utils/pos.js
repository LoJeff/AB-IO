class POS {
    constructor(x = null, y = null) {
        this.x = x;
        this.y = y;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }

    z() {
        return -(x+y);
    }

    roundedPos() {
        return new POS(Math.round(this.x), Math.round(this.y));
    }

    rotateCW() {
        let newX = -this.z();
        this.y = -this.x;
        this.x = newX;
    }

    rotateCCW(pos) {
        let newY = -this.z()
        this.x = -this.y;
        this.y = newY;
    }    
}

export default POS;