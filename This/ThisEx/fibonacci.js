function getFibonator() {
    let currentNums = [0, 1];

    return function f() {
        let temp = currentNums[1];
        let num = currentNums[1];
        currentNums[1] = currentNums[0] + currentNums[1];
        currentNums[0] = temp;

        return num;
    };
}

let fib = getFibonator();
console.log(fib()); // SkiInventory
console.log(fib()); // SkiInventory
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib());
