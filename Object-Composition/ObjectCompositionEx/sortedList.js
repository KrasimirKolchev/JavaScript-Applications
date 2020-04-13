function solve() {
    return {
        items: [],
        size: 0,
        add: function (el) {
            this.items.push(el);
            this.sort(this.items);
            this.size++;
        },
        remove: function (i) {
            if (i < 0 || i >= this.size) {
                throw new Error(`Index ${i} out of bounds!`);
            }
            this.items.splice(i, 1);
            this.size--;
        },
        get: function (i) {
            if (i < 0 || i >= this.size) {
                throw new Error(`Index ${i} out of bounds!`);
            }
            return this.items[i];
        },

        sort: function (arr) {
            return arr.sort((f, s) => f - s);
        }
    }
}

let arr = solve();
arr.add(7);
arr.add(5);
arr.add(3);
console.log(arr.get(0));
console.log(arr.get(1));
console.log(arr.get(3));