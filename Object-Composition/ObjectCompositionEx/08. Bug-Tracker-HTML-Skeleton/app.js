function solve() {
    let obj = (() => {
        let bugContainer = [];
        let counter = 0;
        let selector = undefined;

        let report = function(author, description, reproducible, severity) {
            bugContainer[counter] = {
                ID: counter,
                author: author,
                description: description,
                reproducible: reproducible,
                severity: severity,
                status: 'Open'
            };
            counter++;

            if (selector) {
                create();
            }
        };

        let setStatus = function(id, newStatus) {
            if (id >= 0 && id <= counter) {
                bugContainer[id].status = newStatus;
            }

            if (selector) {
                create();
            }
        };

        let remove = function(id) {
            if (id >= 0 && id <= counter) {
                bugContainer = bugContainer.filter(b => b.ID !== id);
            }

            if (selector) {
                create();
            }
        };

        let sort = function(method) {
            switch (method) {
                case 'author' :
                    bugContainer.sort((f, s) => f.author.localeCompare(s.author));
                    break;
                case 'severity' :
                    bugContainer.sort((f, s) => f.severity - s.severity);
                    break;
                case 'ID' :
                    bugContainer.sort((f, s) => f.ID - s.ID);
                    break;
            }

            if (selector) {
                create();
            }
        };

        let output = function(select) {
            selector = select;
        };

        let create = function () {
            $(selector).html("");
            for (let bug of bugContainer) {
                let divReport = creator('div');
                divReport.attr(id, `report_${bug.ID}`);
                divReport.classList = 'report';
                let divBody = creator('div').classList.add('body');
                let pDesc = creator('p');
                pDesc.textContent = `${bug.description}`;
                divReport.appendChild(divBody.appendChild(pDesc));
                let divTitle = creator('div');
                divTitle.classList = 'title';
                let spanAuth = creator('span');
                spanAuth.classList = 'author';
                spanAuth.textContent = `Submitted by: ${bug.author}`;
                divTitle.appendChild(spanAuth);
                let spanStat = creator('span');
                spanStat.classList = 'status';
                spanStat.textContent = `${bug.status} | ${bug.severity}`;
                divTitle.appendChild(spanStat);
                divReport.appendChild(divTitle);
                $(selector).appendChild(divReport);
            }

            function creator(el) {
                return document.createElement(el);
            }
        };

        return {report, setStatus, remove, sort, output};

    })();

    return obj;
}