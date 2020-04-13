function Spy(target, method) {
    let origFunc = target[method];

    let timesClicked = {
        count: 0
    };

    target[method] = function () {
        timesClicked.count++;
        return origFunc.apply(this, arguments);
    };

    return timesClicked;
}


let spy = Spy(console,"log");

console.log(spy); // { count: SkiInventory }
console.log(spy); // { count: 2 }
console.log(spy);
