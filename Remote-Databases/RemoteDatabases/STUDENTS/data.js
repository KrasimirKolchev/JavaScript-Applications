const root = "https://baas.kinvey.com/appdata/";
const user = {
    name: "guest",
    password: "guest"
};

const app = {
    appKey: "kid_ry8MiExhS",
    appSecret: "4ecb1ee5f3ee4a318b9303cf67123dbb"
};

function makeHeaders(method, data) {
    const headers = {
        method: method,
        headers: {
            'Authorization': `Basic ${btoa(`${user.name}:${user.password}`)}`,
            'Content-Type': 'application/json'
        }
    };

    if (method === 'POST' || method === 'PUT') {
        headers.body = JSON.stringify(data);
    }
    return headers;
}

function handleError(e) {
    if (!e.ok) {
        throw new Error(e.statusText);
    }
    return e;
}

function serializeData(x) {
    return x.json();
}

export function getData(endPoint) {
    const headers = makeHeaders('GET');
    const url = `${root}${app.appKey}/${endPoint}`;

    return fetch(url, headers)
        .then(handleError)
        .then(serializeData);
}

export function postData(endPoint, data) {
    const headers = makeHeaders('POST', data);
    const url = `${root}${app.appKey}/${endPoint}`;

    return fetch(url, headers)
        .then(handleError)
        .then(serializeData);
}
