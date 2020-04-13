function extensibleObject() {

    let obj = {
        extend: function (tempObj) {
            for (const method of Object.keys(tempObj)) {
                if (typeof tempObj[method] == "function") {
                    Object.getPrototypeOf(tempObj)[method] = tempObj[method];
                } else {
                    obj[method] = tempObj[method]
                }
            }
        }
    };

    return obj;
}