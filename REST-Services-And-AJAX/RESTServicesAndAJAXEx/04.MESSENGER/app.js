function attachEvents() {
    const url = 'https://rest-messanger.firebaseio.com/messanger.json';

    document.getElementById('submit').addEventListener('click', sendMsg);
    document.getElementById('refresh').addEventListener('click', refreshMessages);

    function refreshMessages() {
        let messageArea = document.querySelector('#messages');
        messageArea.textContent = "";

        fetch(url)
            .then(data => data.json())
            .then(data => {
                for (const msgData of Object.values(data)) {
                    messageArea.textContent += `${msgData.author}: ${msgData.content}\n`;
                }
            })
            .catch(err => {
                messageArea.textContent = "There are no current messages!"
            });
    }

    
    function sendMsg() {
        let author = document.getElementById('author').value;
        let content = document.getElementById('content').value;

        if (author.length > 0 && content.length > 0) {
            let headers = {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({author, content})
            };

            fetch(url, headers)
                .then(() => {
                    document.getElementById('author').value = "";
                    document.getElementById('content').value = "";
                }).then() // append the sended message
                .catch();
        }
    }
}

attachEvents();