function loadCommits() {
    document.getElementById('loadCommits').addEventListener('click', async function () {
        let html = {
            uName: document.getElementById('username').value,
            repo: document.getElementById('repo').value,
            commits: document.getElementById('commits')
        };
        const baseUrl = 'https://api.github.com/repos/';
        const url = createUrl(baseUrl, html.uName, html.repo);

        function createUrl(base, name, repo) {
            return base + `${name}/${repo}/commits`;
        }

        fetch(url)
            .then(e => {
                if (!e.ok) {
                    console.log(e.statusText);
                }
                return e;
            })
            .then(e => e.json())
            .then(showHTMLElements)
            .catch(e => {
                let li = document.createElement('li');
                li.textContent = `${e.commit.author.name}: ${e.commit.message}`;
                html.commits.appendChild(li);
            });

        let fragment = document.createDocumentFragment();

        function showHTMLElements(fetchedData) {
            fetchedData.forEach(e => {
                let li = document.createElement('li');
                li.textContent = `${e.commit.author.name}: ${e.commit.message}`;
                fragment.appendChild(li);
            });

            html.commits.innerHTML = "";
            html.commits.appendChild(fragment);
        }
    });
}

loadCommits();