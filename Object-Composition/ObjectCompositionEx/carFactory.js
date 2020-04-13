function solve(obj) {
    const engines = [
        {power: 90, volume: 1800},
        {power: 120, volume: 2400},
        {power: 200, volume: 3500},
    ];

    const carriage = {
        hatchback: (c) => {
            return {type: 'hatchback', color: `${c}`}
        },
        coupe: (c) => {
            return {type: 'coupe', color: `${c}`}
        },
    };

    let obj1 = {
        model: obj.model,
        engine: engines.find(e => obj.power <= e.power),
        carriage: obj.carriage === 'coupe' ? carriage.coupe(obj.color) : carriage.hatchback(obj.color),
        wheels: new Array(4).fill(obj.wheelsize % 2 === 0 ? obj.wheelsize - 1 : obj.wheelsize)
    };


    return obj1;
}


console.log(solve({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}));
console.log(solve({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
}));
