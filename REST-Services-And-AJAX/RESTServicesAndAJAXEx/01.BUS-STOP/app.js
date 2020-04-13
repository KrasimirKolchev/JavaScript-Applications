function getInfo() {
    let stopId = document.getElementById('stopId').value;
    let url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;
    let stopName = document.getElementById('stopName');
    stopName.textContent = "";
    let busesList = document.getElementById('buses');
    document.querySelector('#buses').innerHTML = "";

    function displayTHMLElements(data) {
        stopName.textContent = data.name;
        let busInfo = data.buses;

        for (const bus in busInfo) {
            let li = document.createElement('li');
            li.textContent = `Bus ${bus} arrives in ${busInfo[bus]} minutes`;
            busesList.appendChild(li);
        }
    }

    fetch(url)
        .then(res => {
            if (!res.ok && res.status !== 200) {
                throw Error(`Error: ${res.status} | Error message: ${res.statusText}`);
            }
            return res.json();
        })
        .then(displayTHMLElements)
        .catch((error) => {
            stopName.textContent = 'Error'
        });
}