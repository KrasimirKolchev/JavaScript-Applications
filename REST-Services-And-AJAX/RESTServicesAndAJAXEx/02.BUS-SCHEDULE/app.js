function solve() {
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let stopName = document.querySelector('#info span');
    let data = {"next": "depot"};

    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/${data.next}.json`)
            .then(res => res.json())
            .then(res => {
                data = res;
                stopName.textContent = `Next stop ${data.name}`;
                departBtn.disabled = true;
                arriveBtn.disabled = false;
            })
            .catch((err) => {
                stopName.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            });
    }

    function arrive() {
        stopName.textContent = `Arriving at ${data.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return { depart, arrive };
}

let result = solve();