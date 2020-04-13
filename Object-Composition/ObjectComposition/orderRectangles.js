function solve(args) {
    const base = {
        width: 0,
        height: 0,
        area: function () {
            return this.width * this.height;
        },
        compareTo: function (oth) {
            return oth.area() - this.area() === 0 ? oth.width - this.width : oth.area() - this.area();
        }
    };


    return args.map(([width, height]) => Object.assign(Object.create(base), {width, height}))
        .sort((a, b) => a.compareTo(b));
}

//console.log(solve([[10, 5], [5, 12]]));
console.log(solve([[10, 5], [3, 20], [5, 12]]));
console.log(solve([[1, 20], [20, 1], [5, 3], [5, 3]]));