const html = {
    load: () => document.querySelector('button[class="load"]'),
    add: () => document.querySelector('#addForm button'),
    catches: () => document.getElementById('catches')
};

const root = "https://fisher-game.firebaseio.com/";
const makeUrl = x => `${root}${x}/.json`;

function attachEvents() {
    html.add().addEventListener('click', addData);

    html.load().addEventListener('click', loadCatches);

    function loadCatches() {
        fetch(makeUrl('catches'))
            .then(r => r.json())
            .then(loadCatch)
            .catch(e => {
                let div = document.createElement('div');
                div.textContent = "Error: There is no current data to display";
                html.catches().appendChild(div);
            });
    }

    function loadCatch(data) {
        html.catches().innerHTML = "";
        Object.keys(data).forEach(e => {
            let div = document.createElement('div');
            div.classList.add('catch');
            div.setAttribute('data-id', e);

            createBlock(div, 'Angler', 'input', 'text', 'angler', data[e].angler);
            createBlock(div, 'Weight', 'input', 'number', 'weight', data[e].weight);
            createBlock(div, 'Species', 'input', 'text', 'species', data[e].species);
            createBlock(div, 'Location', 'input', 'text', 'location', data[e].location);
            createBlock(div, 'Bait', 'input', 'text', 'bait', data[e].bait);
            createBlock(div, 'Capture Time', 'input', 'number', 'captureTime', data[e].captureTime);

            div.appendChild(document.createElement('hr'));

            let btnUpdate = document.createElement('button');
            btnUpdate.textContent = 'Update';
            btnUpdate.addEventListener('click', updateData);
            div.appendChild(btnUpdate);

            let btnDelete = document.createElement('button');
            btnDelete.textContent = 'Delete';
            btnDelete.addEventListener('click', deleteData);
            div.appendChild(btnDelete);

            html.catches().appendChild(div);
        });
    }

    function updateData() {
        let current = this.parentNode;

        const extrData = getInput(current);

        if (isValid(extrData)) {

            const headers = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    angler: extrData.angler().value,
                    weight: extrData.weight().value,
                    species: extrData.species().value,
                    location: extrData.location().value,
                    bait: extrData.bait().value,
                    captureTime: extrData.captureTime().value
                })
            };

            let catchId = current.getAttribute('data-id');

            fetch(makeUrl(`catches/${catchId}`), headers)
                .then(loadCatches)
                .catch(console.error);
        }
    }

    function deleteData() {
        let catchId = this.parentNode.getAttribute('data-id');

        const header = {
            method: 'DELETE'
        };

        fetch(makeUrl(`catches/${catchId}`), header)
            .then(() => {
                this.parentNode.remove();
            }).catch(console.error);
    }

    function addData() {
        const extrData = getInput(this.parentNode);

        if (isValid(extrData)) {

            const headers = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    angler: extrData.angler().value,
                    weight: extrData.weight().value,
                    species: extrData.species().value,
                    location: extrData.location().value,
                    bait: extrData.bait().value,
                    captureTime: extrData.captureTime().value
                })
            };

            fetch(makeUrl('catches'), headers)
                .then(() => {
                    extrData.angler().value = "";
                    extrData.weight().value = "";
                    extrData.species().value = "";
                    extrData.location().value = "";
                    extrData.bait().value = "";
                    extrData.captureTime().value = "";
                })
                .catch(console.error);
        } else {
            alert("Please fulfill all input lines");
        }
    }

    function isValid(data) {
        return (data.angler().value.trim() !== "" && data.weight().value > 0 && data.species().value.trim() !== ""
            && data.location().value.trim() !== "" && data.bait().value.trim() !== "" && data.captureTime().value > 0);
    }

    function getInput(x) {
        return {
            angler: () => x.querySelector('input[class="angler"]'),
            weight: () => x.querySelector('input[class="weight"]'),
            species: () => x.querySelector('input[class="species"]'),
            location: () => x.querySelector('input[class="location"]'),
            bait: () => x.querySelector('input[class="bait"]'),
            captureTime: () => x.querySelector('input[class="captureTime"]')
        };
    }

    function createBlock(div, text, inputType, type, clName, data) {
        div.appendChild(createLabel(text));
        div.appendChild(creator(inputType, type, clName, data));
        div.appendChild(document.createElement('hr'));
    }

    function createLabel(text) {
        let node = document.createElement("label");
        node.textContent = text;
        return node;
    }

    function creator(el, type, clName, value) {
        let node = document.createElement(el);
        node.setAttribute('type', type);
        node.classList = clName;
        node.value = value;
        return node;
    }
}

attachEvents();

