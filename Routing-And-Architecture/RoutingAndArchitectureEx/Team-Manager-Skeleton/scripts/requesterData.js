const root = "https://baas.kinvey.com/";
const appKey = "kid_ry8MiExhS";
const appSecret = "4ecb1ee5f3ee4a318b9303cf67123dbb";

function createAuth(type) {
    return type === "Basic" ? `Basic ${btoa(`${appKey}:${appSecret}`)}`
                    : `Kinvey ${sessionStorage.getItem('authtoken')}`
}

function createHeader(type, method, data) {
    const headers = {
        method: method,
        headers: {
            'Authorization': createAuth(type),
            'Content-Type': 'application/json'
        }
    };
    if (method === "POST" || method === "PUT") {
        headers.body = JSON.stringify(data);
    }
    return headers;
}

function handleErr(e) {
    if (!e.ok) {
        throw new Error(e.statusText);
    }
    return e;
}

function deserializeData(e) {
    if (e.status === 204) {
        return e;
    }
    return e.json();
}

function fetchData(appModule, route, headers) {
    const url = `${root}${appModule}/${appKey}/${route}`;
    return fetch(url, headers)
        .then(handleErr)
        .then(deserializeData);
}

export function getData(appModule, route, type) {
    const header = createHeader(type, 'GET');
    return fetchData(appModule, route, header);
}

export function postData(appModule, route, data, type) {
    const header = createHeader(type, 'POST', data);
    return fetchData(appModule, route, header);
}

export function putData(appModule, route, data, type) {
    const header = createHeader(type, 'PUT', data);
    return fetchData(appModule, route, header)
}

export function deleteData(appModule, route, type) {
    const header = createHeader(type, 'DELETE');
    return fetchData(appModule, route, header)
}