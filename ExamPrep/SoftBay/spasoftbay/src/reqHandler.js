import {getData, postData, putData, deleteData} from "./requester.js";
import {partials, getSessionInfo} from "./shared.js";

function setSessionInfo(data) {
    sessionStorage.setItem('authtoken', data._kmd.authtoken);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('userId', data._id);
}

export function getHome(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .partial('./temp/pages/home.hbs');
}

export function getLogin(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .partial('./temp/forms/login.hbs');
}

export function postLogin(ctx) {
    const {username, password} = ctx.params;

    postData('user', 'login', {username, password}, 'Basic')
        .then(data => {
            setSessionInfo(data);
            ctx.redirect('#/home');
        }).catch(console.error);
}

export function getRegister(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .partial('./temp/forms/register.hbs');
}

export function postRegister(ctx) {
    const {username, password, rePassword} = ctx.params;

    if (username && password && password === rePassword) {
        postData('user', '', {username, password}, 'Basic')
            .then(() => {
                ctx.redirect('#/login');
            }).catch(console.error);
    } else {
        alert('Alert!!!');
    }
}

export function getLogout(ctx) {
    getSessionInfo(ctx);
    postData('user', '_logout', {}, 'Kinvey')
        .then(() => {
            sessionStorage.clear();
            ctx.redirect('#/home');
        }).catch(console.error);
}

export function dashboard(ctx) {
    getSessionInfo(ctx);

    getData('appdata', 'offers', 'Kinvey')
        .then((data) => {

            for (let i = 0; i < data.length; i++) {
                data[i].count = i;
                data[i].isAuth = sessionStorage.getItem('userId') === data[i]._acl.creator;
                data[i].price = `${data[i].price.toFixed(2)}`;
            }

            ctx.products = data;
            this.loadPartials(partials)
                .partial('./temp/pages/dashboard.hbs');
        }).catch(console.error);
}

export function getCreate(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .partial('./temp/forms/create.hbs');
}

export function postCreate(ctx) {
    getSessionInfo(ctx);
    const {product, description, pictureUrl} = ctx.params;
    const price = Number(ctx.params.price);

    if (product && description && price && pictureUrl) {

        postData('appdata', 'offers', {product, description, price, pictureUrl}, 'Kinvey')
            .then(() => {
                ctx.redirect('#/dashboard');
            }).catch(console.error);
    } else {
        alert('Alert!!!');
    }
}

export function getEdit(ctx) {
    getSessionInfo(ctx);
    const id = ctx.params.id;
    sessionStorage.setItem('offerId', id);

    getData('appdata', `offers/${id}`, 'Kinvey')
        .then((data) => {
            ctx.product = data.product;
            ctx.description = data.description;
            ctx.price = data.price;
            ctx.pictureUrl = data.pictureUrl;

            this.loadPartials(partials)
                .partial('./temp/forms/edit.hbs');
        }).catch(console.error);
}

export function postEdit(ctx) {
    getSessionInfo(ctx);
    const id = sessionStorage.getItem('offerId');
    const {product, description, pictureUrl} = ctx.params;
    const price = Number(ctx.params.price);

    if (product && description && price && pictureUrl) {
        putData('appdata', `offers/${id}`, {product, description, price, pictureUrl}, 'Kinvey')
            .then(() => {
                ctx.redirect(`#/details/${id}`);
            }).catch(console.error);
    }
}

export function details(ctx) {
    getSessionInfo(ctx);
    const id = ctx.params.id;
    sessionStorage.setItem('offerId', id);

    getData('appdata', `offers/${id}`, 'Kinvey')
        .then((data) => {
            ctx.product = data.product;
            ctx.description = data.description;
            ctx.price = data.price;
            ctx.pictureUrl = data.pictureUrl;
            this.loadPartials(partials)
                .partial('./temp/pages/details.hbs');
        }).catch(console.error);
}

export function getDelete(ctx) {
    getSessionInfo(ctx);
    const id = ctx.params.id;

    getData('appdata', `offers/${id}`, 'Kinvey')
        .then((data) => {
            ctx.product = data.product;
            ctx.description = data.description;
            ctx.price = data.price;
            ctx.pictureUrl = data.pictureUrl;

            this.loadPartials(partials)
                .partial('./temp/forms/delete.hbs');
        }).catch(console.error);
}

export function postDelete(ctx) {
    getSessionInfo(ctx);
    const id = sessionStorage.getItem('offerId');

    deleteData('appdata', `offers/${id}`, 'Kinvey')
        .then(() => {
            ctx.redirect('#/dashboard');
        }).catch(console.error);
}

export function profile(ctx) {
    getSessionInfo(ctx);

    getData('user', `${sessionStorage.getItem('userId')}`, 'Kinvey')
        .then((user) => {
            ctx.items = user.items;

            this.loadPartials(partials)
                .partial('./temp/pages/profile.hbs')
        }).catch(console.error);
}

export function buy(ctx) {
    getSessionInfo(ctx);

    getData('user', `${sessionStorage.getItem('userId')}`, 'Kinvey')
        .then((user) => {
            let items = user.items;
            if (!items) {
                items = 0;
            }
            items++;
            putData('user', `${sessionStorage.getItem('userId')}`, {items},'Kinvey')
                .then(() => {
                    ctx.redirect('#/dashboard');
                });
        }).catch(console.error);
}

