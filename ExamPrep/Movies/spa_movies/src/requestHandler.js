import {partials, getSessionInfo} from './shared.js';
import {getData, postData, putData, deleteData} from "./requester.js";

function setSessionInfo(data) {
    sessionStorage.setItem('authtoken', data._kmd.authtoken);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('userId', data._id);
}

export function getHome(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .partial('./temp/pages/home.hbs')
}

export function getLogin(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .partial('./temp/forms/login.hbs')
}

export function postLogin(ctx) {
    getSessionInfo(ctx);
    const {username, password} = ctx.params;

    postData('user', 'login', {username, password}, 'Basic')
        .then((data) => {
            setSessionInfo(data);
            ctx.redirect('#/home');
        }).catch(console.error);
}

export function getRegister(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .partial('./temp/forms/register.hbs')
}

export function postRegister(ctx) {
    getSessionInfo(ctx);
    const {username, password, repeatPassword} = ctx.params;
    if (username.length >= 3 && password.length >= 6 && password === repeatPassword) {
        postData('user', '', {username, password}, 'Basic')
            .then(() => {
                ctx.redirect('#/login');
            }).catch(console.error);
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

export function getCreate(ctx) {
    getSessionInfo(ctx);
    this.loadPartials(partials)
        .partial('./temp/forms/createMovie.hbs');
}

export function postCreate(ctx) {
    getSessionInfo(ctx);

    const {title, imageURL, description} = ctx.params;
    const tickets = Number(ctx.params.tickets);
    const genre = ctx.params.genres.split(' ');

    if (title.length >= 6 && description.length >= 10 && imageURL && genre.length > 1 && tickets > 1) {
        postData('appdata', 'movies', {title, imageURL, description, tickets, genre}, 'Kinvey')
            .then(() => {
                ctx.redirect('#/home');
            }).catch(console.error);
    } else {
        alert('Alert!!!');
    }
}

export function getCinema(ctx) {
    getSessionInfo(ctx);

    getData('appdata', 'movies', 'Kinvey')
        .then((data) => {
            ctx.movies = data;
            this.loadPartials(partials)
                .partial('./temp/pages/cinema.hbs')
        }).catch(console.error);
}

export function getDetails(ctx) {
    getSessionInfo(ctx);
    const id = ctx.params.id;
    sessionStorage.setItem('movieId', id);

    getData('appdata', `movies/${id}`, 'Kinvey')
        .then((data) => {
            ctx.title = data.title;
            ctx.description = data.description;
            ctx.imageURL = data.imageURL;
            ctx.tickets = data.tickets;
            ctx.genres = data.genres.join(', ');

            this.loadPartials(partials)
                .partial('./temp/pages/movieInfo.hbs');
        }).catch(console.error);
}

export function getMyMovies(ctx) {
    getSessionInfo(ctx);

    getData('appdata', `movies/?query={"_acl.creator":"${sessionStorage.getItem('userId')}"}`, 'Kinvey')
        .then((data) => {
            ctx.movies = data;
            this.loadPartials(partials)
                .partial('./temp/pages/myMovies.hbs');
        }).catch(console.error);
}

export function getEditMovie(ctx) {
    getSessionInfo(ctx);
    const id = ctx.params.id;
    sessionStorage.setItem('movieId', id);

    getData('appdata', `movies/${id}`, 'Kinvey')
        .then((data) => {
            ctx.title = data.title;
            ctx.description = data.description;
            ctx.imageURL = data.imageURL;
            ctx.tickets = data.tickets;
            ctx.genres = data.genres.join(', ');

            this.loadPartials(partials)
                .partial('./temp/forms/edit.hbs');
        }).catch(console.error);
}

export function postEditMovie(ctx) {
    getSessionInfo(ctx);
    const {title, imageURL, description} = ctx.params;
    const tickets = Number(ctx.params.tickets);
    const genres = ctx.params.genres.split(', ');

    const id = sessionStorage.getItem('movieId');

    if (title.length >= 6 && description.length >= 10 && imageURL && genres.length > 1 && tickets > 1) {
        putData('appdata', `movies/${id}`, {title, imageURL, description, tickets, genres}, 'Kinvey')
            .then(() => {
                ctx.redirect(`#/details/${id}`);
            }).catch(console.error);
    } else {
        alert('Alert!!!');
    }
}

export function getDeleteMovie(ctx) {
    getSessionInfo(ctx);
    const id = ctx.params.id;
    sessionStorage.setItem('movieId', id);

    getData('appdata', `movies/${id}`, 'Kinvey')
        .then((data) => {
            ctx.title = data.title;
            ctx.description = data.description;
            ctx.imageURL = data.imageURL;
            ctx.tickets = data.tickets;
            ctx.genres = data.genres.join(', ');

            this.loadPartials(partials)
                .partial('./temp/forms/deleteMovie.hbs');
        }).catch(console.error);
}

export function postDeleteMovie(ctx) {
    getSessionInfo(ctx);
    const id = sessionStorage.getItem('movieId');

    deleteData('appdata', `movies/${id}`, 'Kinvey')
        .then(() => {
            ctx.redirect('#/myMovies');
        }).catch(console.error);
}

export function getBuyMovie(ctx) {
    getSessionInfo(ctx);
    const id = sessionStorage.getItem('movieId');

    getData('appdata', `movies/${id}`, 'Kinvey')
        .then((data) => {
            data.tickets--;

            putData('appdata', `movies/${id}`, data, 'Kinvey')
                .then(() => {
                    ctx.redirect(`#/details/${id}`);
                }).catch(console.error);
        }).catch(console.error);
}
