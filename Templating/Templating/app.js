import {contacts} from "./contacts.js";

function compile(template) {
    return function (data) {
        return data.map(x => {
            let res = template;
            Object.keys(x).forEach(c => {
                res = res.replace(`{{${c}}}`, x[c]);
            });
            return res;
        }).join("");
    };
}

async function showContacts() {
    const template = await fetch("./contactCards.html")
        .then(c => c.text());

    const templateFn = compile(template);
    document.getElementById('contacts').innerHTML = templateFn(contacts);
}

const btn = "detailsBtn";

document.addEventListener('click', function (ev) {
    let target = ev.target;
    if (target.className === btn) {
        let elem = target.nextElementSibling;

        if (elem.style.display === 'none') {
            elem.style.display = 'block';
        } else {
            elem.style.display = 'none';
        }
    }
});

showContacts();