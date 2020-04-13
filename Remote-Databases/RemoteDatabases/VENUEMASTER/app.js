let html = {
    venueInfo: () => document.getElementById("venue-info"),
    venueDate: () => document.getElementById("venueDate"),
    btnGetVenues: () => document.getElementById("getVenues"),
};

const uriList = {
    venueUri: "./venueTemplate.html",
    confUri: "./confirmationTemplate.html",
    root: "https://baas.kinvey.com/"
};

const user = {
    name: "guest",
    password: "pass"
};

function venueMaster() {
    const appKey = "kid_BJ_Ke8hZg";

    html.btnGetVenues().addEventListener('click', listAllVenues);

    function listAllVenues() {
        let date = html.venueDate().value;

        if (/(\d+-\d+)/.test(date)) {
            let url = `${uriList.root}rpc/${appKey}/custom/calendar?query=${date}`;
            let header = {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${btoa(`${user.name}:${user.password}`)}`
                }
            };

            fetch(url, header)
                .then(e => e.json())
                .then(e => getVenuesInfo(e))
        }
    }

    async function getVenuesInfo(e) {
        for (let venueId of e) {

            let url = `${uriList.root}appdata/${appKey}/venues/${venueId}`;
            let headers = {
                method: "GET",
                headers: {
                    "Authorization": `Basic ${btoa(`${user.name}:${user.password}`)}`
                }
            };

            await fetch(url, headers)
                .then(e => e.json())
                .then(e => {
                    listData(e, uriList.venueUri)
                });
        }
    }
}

async function listData(e, uri) {
    const template = await fetch(uri)
        .then(c => c.text());

    const templateFn = compile(template);
    html.venueInfo().innerHTML += templateFn(e);
}

function compile(template) {
    return function (data) {
        let res = template;
        Object.keys(data).forEach(c => {
            res = res.replace(`{{${c}}}`, data[c]);
        });
        return res;
    };
}

function toggle(e) {
    if (e !== undefined) {
        let current = e.parentNode.parentNode;
        let vDetails = current.querySelector('.venue-details');

        if (vDetails.style.display === 'none') {
            vDetails.style.display = 'block';
        } else {
            vDetails.style.display = 'none';
        }
    }
}

function makePurchase(ev) {
    if (ev !== undefined) {
        let current = ev.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        let id = current.getAttribute('id');
        let price = current.querySelector(".venue-price").textContent.match(/\d+/)[0];
        let name = current.querySelector(".venue-name").textContent;
        let qty = current.querySelector(".quantity").value;
        let total = qty * price;

        let data = {name, price, qty, total, id};

        html.venueInfo().innerHTML = "";
        listData(data, uriList.confUri);
    }
}

async function confirm() {
    let _id = document.querySelector('.purchase-info').getAttribute('id');
    let qty = document.querySelectorAll("span")[2].textContent.split(" ")[0];
    let uri = `${uriList.root}rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${_id}&qty=${qty}`;

    let header = {
        method: "POST",
        headers: {
            "Authorization": `Basic ${btoa(`${user.name}:${user.password}`)}`
        }
    };

    fetch(uri, header)
        .then(res => res.json())
        .then(res => {
            html.venueInfo().innerHTML = res.html;
            let h = document.createElement('h1');
            h.textContent = "You may print this page as your ticket";
            html.venueInfo().appendChild(h)
        })
}