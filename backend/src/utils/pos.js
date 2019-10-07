const boardWidth = 5;

class POS {
    constructor(x = null, y = null) {
        this.x = x;
        this.y = y;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }

    setPos(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }

    empty() {
        this.x = null;
        this.y = null;
    }

    z() {
        return -(this.x+this.y);
    }

    isEmpty() {
        return (this.x == null && this.y == null);
    }

    isFloat() {
        return (this.x % 1 != 0 || this.y % 1 != 0);
    }

    isHalfway() {
        return (Math.abs(this.x % 1) == 0.5 || Math.abs(this.y % 1) == 0.5);
    }

    roundedPos() {
        return new POS(Math.round(this.x), Math.round(this.y));
    }

    stepTowards(dest, stepSize) {
        this.x += stepSize * Math.sign(dest.x - this.x);
        this.y += stepSize * Math.sign(dest.y - this.y);
        this.x = Math.round(this.x * 10) / 10;
        this.y = Math.round(this.y * 10) / 10;
    }

    rotateCW(i = 0) {
        i %= 6;
        let newX;
        switch(i) {
            case 1:
                newX = -this.z();
                this.y = -this.x;
                this.x = newX;
            break;
            case 2:
                newX = this.y;
                this.y = this.z();
                this.x = newX;
            break;
            case 3:
                this.y *= -1;
                this.x *= -1;
            break;
            case 4:
                newX = this.z();
                this.y = this.x;
                this.x = newX;
            break;
            case 5:
                newX = -this.y;
                this.y = -this.z();
                this.x = newX;
            break;
            default:
        }
    }
    
    validPBoardPos() {
        return (-5 <= this.y && this.y <= -3
            && 0 <= this.x && this.x <= 4
            && this.x + this.y <= -1);     
    }

    validBBoardPos() {
        return (-boardWidth <= this.x && this.x <= boardWidth 
            && -boardWidth <= this.y && this.y <= boardWidth
            && Math.abs(this.x + this.y) <= boardWidth);
    }
}

function validPBoardPos(x, y) {
    return (-5 <= y && y <= -3
        && 0 <= x && x <= 4
        && x + y <= -1);
}

function validBBoardPos(x, y) {
    return (-boardWidth <= x && x <= boardWidth 
        && -boardWidth <= y && y <= boardWidth
        && Math.abs(x + y) <= boardWidth);
}

module.exports = {
    POS,
    validPBoardPos,
    validBBoardPos,
    boardWidth
}