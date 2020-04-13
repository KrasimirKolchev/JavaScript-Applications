function f() {

    const units = {
        m: 0.1,
        cm: 1,
        mm: 10
    };

    class Figure {
        constructor (u) {
            this.defaultUnits = (u || 'cm');
        }

        changeUnits(u) {
            this.defaultUnits = u;
        }

        get area() {
            return NaN;
        }

        toString() {
            return `Figures units: ${this.defaultUnits}`;
        }
    }

    class Circle extends Figure {
        constructor (r, u) {
            super(u);
            this.radius = r;
        }

        calcRadius() {
            return this.radius * units[this.defaultUnits];
        }

        get area() {
            return Math.PI * this.calcRadius() * this.calcRadius();
        }

        toString() {
            return super.toString() + ` Area: ${this.area} - radius: ${this.calcRadius()}`;
        }
    }

    class Rectangle extends Figure {
        constructor (w, h, u) {
            super(u);
            this.width = w;
            this.height = h;
        }

        calcWidth() {
            return this.width * units[this.defaultUnits];
        }

        calcHeight() {
            return this.height * units[this.defaultUnits];
        }

        get area() {
            return this.calcWidth() * this.calcHeight();
        }

        toString() {
            return super.toString() + ` Area: ${this.area} - width: ${this.calcWidth()}, height: ${this.calcHeight()}`;
        }
    }

    return {Figure, Circle, Rectangle};
}

let c = new Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new Rectangle(3, 4, 'mm');
console.log(r.area); // 1200
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits('cm');
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

c.changeUnits('mm');
console.log(c.area); // 7853.981633974483
console.log(c.toString()); // Figures units: mm Area: 7853.981633974483 - radius: 50
