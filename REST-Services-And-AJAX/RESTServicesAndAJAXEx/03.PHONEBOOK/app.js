function attachEvents() {
    let url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
    let contacts = document.querySelector('#phonebook');

    document.getElementById('btnLoad').addEventListener('click', showPhonebook);
    document.getElementById('btnCreate').addEventListener('click', createEntry);

    function showPhonebook() {
        contacts.innerHTML = "";
        fetch(url)
            .then(res => res.json())
            .then(data => {
                Object.entries(data).forEach(([pbID, pbData]) => {
                    const {person, phone} = pbData;
                    let li = document.createElement('li');
                    let deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.setAttribute('data-target', pbID);
                    deleteBtn.addEventListener('click', deleteEntries);
                    li.textContent = `${person}: ${phone} `;
                    li.appendChild(deleteBtn);
                    contacts.appendChild(li);
                });
            })
            .catch();
    }

    function createEntry() {
        let person = document.getElementById('person').value;
        let phone = document.getElementById('phone').value;

        if (person.length > 0 && Number(phone)) {
            const headers = {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({person, phone})
            };

            fetch(url, headers)
                .then(() => {
                    document.getElementById('person').value = "";
                    document.getElementById('phone').value = "";
                })
                .then(showPhonebook)
                .catch();
        }
    }

    function deleteEntries() {
        let pbID = this.getAttribute('data-target');

        const header = {
            method: 'DELETE'
        };
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${pbID}.json`, header)
            .then(() => {
                contacts.innerHTML = "";
                showPhonebook();
            })
            .catch();
    }
}

attachEvents();