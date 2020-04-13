function f() {
    const elements = ['Fire', 'Earth', 'Air', 'Water'];

    class Melon {
        constructor (weight, melonSort) {
            if (new.target === Melon) {
                throw new Error('Abstract class cannot be instantiated directly');
            }
            this.weight = weight;
            this.melonSort = melonSort;
        }
    }

    class Watermelon extends Melon {
        constructor (weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = (this.weight * this.melonSort.length);
            this.element = 'Water';
        }

        getElementIndex() {
            return this.elementIndex;
        }

        toString() {
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    class Firemelon extends Melon {
        constructor (weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = (this.weight * this.melonSort.length);
            this.element = 'Fire';
        }

        getElementIndex() {
            return this.elementIndex;
        }

        toString() {
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    class Earthmelon extends Melon {
        constructor (weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = (this.weight * this.melonSort.length);
            this.element = 'Earth';
        }

        getElementIndex() {
            return this.elementIndex;
        }

        toString() {
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    class Airmelon extends Melon {
        constructor (weight, melonSort) {
            super(weight, melonSort);
            this.elementIndex = (this.weight * this.melonSort.length);
            this.element = 'Air';
        }

        getElementIndex() {
            return this.elementIndex;
        }

        toString() {
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    class Melolemonmelon extends Watermelon {
        constructor (weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Water';
        }

        morph() {
            let elem = elements.shift();
            this.element = elem;
            elements.push(elem);
        }

        toString() {
            return super.toString();
        }
    }

    return {Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon};
}
