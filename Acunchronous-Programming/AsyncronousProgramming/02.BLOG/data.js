function handleErr(e) {
    if (!e.ok) {
        throw new Error(e.statusText);
    }
    return e;
}

function deserializeData(e) {
    return e.json();
}

export async function fetchData(hErr = handleErr, dData = deserializeData, url) {
    return fetch(url)
        .then(hErr)
        .then(dData)
        .catch(console.error);
}
