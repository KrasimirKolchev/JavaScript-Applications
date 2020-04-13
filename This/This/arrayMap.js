function arrayMap(arr, func) {
    let arrOut = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
        arrOut[i] = func(arr[i]);
    }

    return arrOut;

    //return arr.reduce((acc, el) => acc.concat(func(el)), []);
}

let nums = [1,2,3,4,5];
console.log(arrayMap(nums,(item)=> item * 2));
