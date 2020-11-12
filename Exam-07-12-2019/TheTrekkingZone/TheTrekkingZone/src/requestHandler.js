import {partials, getSessionInfo} from "./shared.js";
import {deleteData, getData, putData, postData} from "./requester.js";

function setSessionInfo(data) {
    sessionStorage.setItem('authtoken', data._kmd.authtoken);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('userId', data._id);
}

export function getHomeInit(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .then(function () {
            this.partial('./temp/pages/homeInit.hbs');
        });
}

export function getHome(ctx) {
    getSessionInfo(ctx);

    getData('appdata', 'trecks', 'Kinvey')
        .then((data) => {
            ctx.trecks = data;
            this.loadPartials(partials)
                .then(function () {
                    this.partial('./temp/pages/home.hbs');
                });
        }).catch(console.error);
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

    if (username.length >= 3 && password.length >= 6 && password === rePassword) {
        postData('user', '', {username, password}, 'Basic')
            .then(() => {
                ctx.redirect('#/login');
            }).catch(console.error);
    } else {
        alert('Username, password and repeat password must be non-empty string!\nPassword and repeat password should be equal!')
    }
}

export function getLogout(ctx) {
    getSessionInfo(ctx);
    postData('user', '_logout', {}, 'Kinvey')
        .then(() => {
            sessionStorage.clear();
            ctx.redirect('#/');
        }).catch(console.error);
}

export function getCreate(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials).partial('./temp/forms/create.hbs');
}

export function postCreate(ctx) {
    getSessionInfo(ctx);

    const {location, description, dateTime, imageURL} = ctx.params;
    const organizer = sessionStorage.getItem('username');
    const likes = 0;

    if (location.length >= 6 && description.length >= 10 && dateTime && imageURL) {
        postData('appdata', 'trecks', {location, description, dateTime, imageURL, organizer, likes}, 'Kinvey')
            .then(() => {
                ctx.redirect('#/');
            }).catch(console.error);
    } else {
        alert();
    }
}

export function getTrack(ctx) {
    getSessionInfo(ctx);
    const id = ctx.params.id;
    sessionStorage.setItem('trackId', id);

    getData('appdata', `trecks/${id}`, 'Kinvey')
        .then((data) => {
            ctx.isAuth = sessionStorage.getItem('userId') === data._acl.creator;
            ctx.location = data.location;
            ctx.dateTime = data.dateTime;
            ctx.description = data.description;
            ctx.organizer = data.organizer;
            ctx.likes = data.likes;
            ctx.imageURL = data.imageURL;
            console.log(ctx);
            this.loadPartials(partials).partial('./temp/pages/treck.hbs');
        }).catch(console.error);
}

export function getEdit(ctx) {
    getSessionInfo(ctx);
    const id = sessionStorage.getItem('trackId');
    getData('appdata', `trecks/${id}`, 'Kinvey')
        .then((data) => {
            ctx.location = data.location;
            ctx.dateTime = data.dateTime;
            ctx.description = data.description;
            ctx.organizer = data.organizer;
            ctx.likes = data.likes;
            ctx.imageURL = data.imageURL;
            this.loadPartials(partials).partial('./temp/forms/edit.hbs');
        }).catch(console.error);
}

export function postEdit(ctx) {
    getSessionInfo(ctx);
    const id = sessionStorage.getItem('trackId');
    const {location, dateTime, description, imageURL} = ctx.params;

    if (location.length >= 6 && description.length >= 10 && dateTime && imageURL) {
        putData('appdata', `trecks/${id}`, {location, dateTime, description, imageURL}, 'Kinvey')
            .then(() => {
                ctx.redirect('#/');
            }).catch(console.error);
    }


}

export function clear(ctx) {
    getSessionInfo(ctx);
    const id = sessionStorage.getItem('trackId');

    deleteData('appdata', `trecks/${id}`, 'Kinvey')
        .then(() => {
            ctx.redirect('#/');
        }).catch(console.error);
}

export function likes(ctx) {
    getSessionInfo(ctx);
    const id = sessionStorage.getItem('trackId');

    getData('appdata', `trecks/${id}`, 'Kinvey')
        .then((data) => {
            console.log(data.likes);
            data.likes++;
            putData('appdata', `trecks/${id}`, data, 'Kinvey')
                .then(() => {
                    ctx.redirect(`#/`);
                }).catch(console.error);

        }).catch(console.error);

}

export function profile(ctx) {
    getSessionInfo(ctx);
    const id = sessionStorage.getItem('userId');

    getData('appdata', `trecks/?query={"_acl.creator":"${id}"}`, 'Kinvey')
        .then((data) => {
            ctx.trecks = data;
            ctx.count = data.length;
            this.loadPartials(partials).partial('./temp/pages/profile.hbs');
        }).catch(console.error);
}
