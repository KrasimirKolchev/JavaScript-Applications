import {partials, getSessionInfo} from "./shared.js";
import {deleteData, getData, putData, postData} from "./requester.js";

function setSessionInfo(data) {
    sessionStorage.setItem('authtoken', data._kmd.authtoken);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('userId', data._id);
}

export function getHome(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .then(function () {
            this.partial('./temp/pages/home.hbs');
        });
}

export function getLogin(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .partial('./temp/forms/login.hbs');
}

export function postLogin(ctx) {
    const {username, password} = ctx.params;

    postData('user', 'login', {username, password}, 'Basic')
        .then((data) => {
            setSessionInfo(data);
            ctx.redirect('#/');
        }).catch(console.error);
}

export function getRegister(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .partial('./temp/forms/register.hbs');
}

export function postRegister(ctx) {
    getSessionInfo(ctx);
    const {username, password, rePassword} = ctx.params;

    if (username && password && password === rePassword) {
        postData('user', '', {username, password}, 'Basic')
            .then(() => {
                ctx.redirect('#/login');
            }).catch(console.error);
    } else {
        alert('Username, password and repeat password must be non-empty string!\nPassword and repeat password should be equal!')
    }
}

export function getLogout(ctx) {
    postData('user', '_logout', {}, 'Kinvey')
        .then(() => {
            sessionStorage.clear();
            ctx.redirect('#/');
        }).catch(console.error);
}

export function getCreate(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .partial('./temp/forms/create.hbs');
}

export function postCreate(ctx) {
    getSessionInfo(ctx);
    const {cause, pictureUrl, neededFunds, description} = ctx.params;
    const collectedFunds = 0;
    const donors = [];

    if (cause && pictureUrl && neededFunds && description) {
        postData('appdata', 'causes', {
            cause,
            pictureUrl,
            neededFunds,
            description,
            collectedFunds,
            donors
        }, 'Kinvey')
            .then(() => {
                ctx.redirect('#/dashboard');
            }).catch(console.error);
    } else {
        alert('');
    }
}

export function getDashboard(ctx) {
    getSessionInfo(ctx);
    getData('appdata', 'causes', 'Kinvey')
        .then((data) => {
            ctx.causes = data;
            this.loadPartials(partials)
                .partial('./temp/pages/dashboard.hbs');
        }).catch(console.error);
}

export function getCause(ctx) {
    let id = ctx.params.id;
    getSessionInfo(ctx);
    sessionStorage.setItem('causeId', id);

    getData('appdata', `causes/${id}`, 'Kinvey')
        .then((data) => {
            ctx.isAuth = sessionStorage.getItem('userId') === data._acl.creator;
            ctx.cause = data.cause;
            ctx.pictureUrl = data.pictureUrl;
            ctx.neededFunds = data.neededFunds;
            ctx.description = data.description;
            ctx.collectedFunds = data.collectedFunds;
            ctx.donors = data.donors;

            this.loadPartials(partials)
                .partial('./temp/pages/cause.hbs');
        }).catch(console.error);
}

export function getClose(ctx) {
    getSessionInfo(ctx);
    const id = sessionStorage.getItem('causeId');

    deleteData('appdata', `causes/${id}`, 'Kinvey')
        .then(() => {
            ctx.redirect('#/dashboard');
        });
}

export function postDonate(ctx) {
    getSessionInfo(ctx);
    const id = sessionStorage.getItem('causeId');
    const currentDonation = Number(ctx.params.currentDonation);
    const donor = sessionStorage.username;

    if (currentDonation >= 1) {
        getData('appdata', `causes/${id}`, 'Kinvey')
            .then((data) => {
                data.collectedFunds += currentDonation;
                data.donors.push(donor);

                putData('appdata', `causes/${id}`, data, 'Kinvey')
                    .then(() => {
                        ctx.redirect(`#/cause/${id}`);
                    }).catch(console.error);
            }).catch(console.error);
    } else {
        alert('Alert!!!');
    }
}