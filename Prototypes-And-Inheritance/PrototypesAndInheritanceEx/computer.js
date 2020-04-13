function createComputerHierarchy() {
    class Keyboard {
        constructor(manufacturer, responseTime) {
            this.manufacturer = manufacturer;
            this.responseTime = responseTime;
        }
    }

    class Monitor {
        constructor(manufacturer, width, height) {
            this.manufacturer = manufacturer;
            this.width = width;
            this.height = height;
        }
    }

    class Battery {
        constructor(manufacturer, expectedLife) {
            this.manufacturer = manufacturer;
            this.expectedLife = expectedLife;
        }
    }

    class Computer {
        constructor(manufacturer, procSpeed, ram, HDD) {
            if (new.target === Computer) {
                throw new Error();
            }
            this.manufacturer = manufacturer;
            this.processorSpeed = procSpeed;
            this.ram = ram;
            this.hardDiskSpace = HDD;
        }
    }

    class Laptop extends Computer {
        constructor(m, p, r, h, weight, color, battery) {
            super(m, p, r, h);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }

        get battery() {
            return this._battery;
        }

        set battery(b) {
            if (!(b instanceof Battery)) {
                throw new TypeError("Not a valid battery");
            }
            this._battery = b;
        }
    }

    class Desktop extends Computer {
        constructor(m, p, r, h, keyboard, monitor) {
            super(m, p, r, h);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }

        get keyboard() {
            return this._keyboard;
        }

        set keyboard(k) {
            if (!(k instanceof Keyboard)) {
                throw new TypeError("Not a valid keyboard");
            }
            this._keyboard = k;
        }

        get monitor() {
            return this._monitor;
        }

        set monitor(m) {
            if (!(m instanceof Monitor)) {
                throw new TypeError('Not a valid monitor')
            }
            this._monitor = m;
        }
    }

    return {Battery, Keyboard, Monitor, Computer, Laptop, Desktop};
}

function createMixins() {

    function computerQualityMixin(classToExtend) {
        classToExtend.prototype.getQuality = function () {
            return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3;
        };
        classToExtend.prototype.isFast = function () {
            return this.processorSpeed > (this.ram / 4);
        };
        classToExtend.prototype.isRoomy = function () {
            return this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed);
        };
    }

    function styleMixin(classToExtend) {
        classToExtend.prototype.isFullSet = function () {
            return this.manufacturer === this.keyboard.manufacturer && this.manufacturer === this.monitor.manufacturer;
        };
        classToExtend.prototype.isClassy = function () {
            return (this.battery.expectedLife >= 3 && (this.color === "Silver" || this.color === 'Black')) && this.weight < 3;
        }
    }

    return {computerQualityMixin, styleMixin};
}

