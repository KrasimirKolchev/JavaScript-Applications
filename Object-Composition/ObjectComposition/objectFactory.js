function solve(args) {
    let obj = {};
    JSON.parse(args).forEach(e => Object.assign(obj, e));
    return obj;
}

console.log(solve(`[{"canMove": true},{"canMove":true, "doors": 4},{"capacity": 5}]`));
console.log(solve(`[{"canFly": true},{"canMove":true, "doors": 4},{"capacity": 255},{"canFly":true, "canLand": true}]`));