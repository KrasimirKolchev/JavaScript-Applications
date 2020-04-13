function loadRepos() {
    let username = document.querySelector('#username').value;
    let url = "https://api.github.com/users/" + username + "/repos";

    function prepareHTMLTag(data) {
        return data.map(x => {
        	let li = document.createElement('li');
        	let a = document.createElement('a');
        	a.href = x[0];
        	a.textContent = x[1];
        	li.appendChild(a);
        	return li;
		});
    }

    function processData(data) {
        return data.map(x => [x.html_url, x.full_name]);
    }

    function drawHTML(data) {
    	let repos = document.querySelector('#repos');
    	repos.removeChild(repos.querySelector('li'));

    	for (const li of data) {
    		repos.appendChild(li);
		}
	}

    fetch(url)
        .then(x => x.json())
        .then(processData)
        .then(prepareHTMLTag)
        .then(drawHTML);

}

