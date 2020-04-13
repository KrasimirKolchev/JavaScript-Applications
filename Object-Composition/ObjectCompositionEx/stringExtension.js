(function () {
    String.prototype.ensureStart = function(s) {
        if (!this.startsWith(s)) {
            return `${s}${this}`;
        }
        return this.toString();
    };

    String.prototype.ensureEnd = function(s) {
        if (!this.endsWith(s)) {
            return `${this}${s}`;
        }
        return this.toString();
    };

    String.prototype.isEmpty = function() {
        return this.length === 0;
    };

    String.prototype.truncate = function(n) {
        if (n < 4) {
            return '.'.repeat(n);
        }

        if (n >= this.length) {
            return this.toString();
        } else {
            let index = this.substring(0, n - 2).lastIndexOf(' ');

            if (index !== -1) {
                return this.substring(0, index).toString() + '...';
            } else {
                return this.substring(0, n - 3).toString() + '...';
            }
        }
    };

    String.format = (string, ...params) => {
        params.forEach((e, i) => {
            string = string.replace(`{${i}}`, e);
        });
        return string;
    }
})();

let str = 'my string';
str = str.ensureStart('my');
str = str.ensureStart('hello ');
str = str.truncate(16);
str = str.truncate(14);
str = str.truncate(8);
str = str.truncate(4);
str = str.truncate(2);
str = String.format('The {0} {SkiInventory} fox', 'quick', 'brown');
str = String.format('jumps {0} {SkiInventory}', 'dog');
