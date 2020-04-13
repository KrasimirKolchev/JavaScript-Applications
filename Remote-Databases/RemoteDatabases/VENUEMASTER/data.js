

function makeHeaders(method, data) {
    const headers = {
        method: method,
        headers: {
            'Authorization': `Basic ${btoa(`${user.name}:${user.password}`)}`,
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

export function getVenuesData(endPoint) {
    const headers = makeHeaders('GET');
    const url = `${root}rpc/${appKey}/${endPoint}`;

    return fetch(url, headers)
        .then(console.log)
        //.then(serializeData);
}

export function postData(endPoint, data) {
    const headers = makeHeaders('POST', data);
    const url = `${root}${appKey}/${endPoint}`;

    return fetch(url, headers)
        .then(handleError)
        .then(serializeData);
}
