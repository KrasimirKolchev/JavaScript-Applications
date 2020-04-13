import {getData, postData, putData, deleteData} from './requester.js'

(() => {
    const app = new Sammy('#rooter', function () {
        this.use('Handlebars', 'hbs');

        const partials = {
            header: './temp/common/header.hbs',
            footer: './temp/common/footer.hbs'
        };

        function getSessionInfo(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.userId = sessionStorage.getItem('userId');
        }

        function setSessionInfo(data) {
            sessionStorage.setItem('authtoken', data._kmd.authtoken);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('userId', data._id);
        }

        this.get('index.html', function (ctx) {
            this.loadPartials(partials)
                .then(function () {
                    this.partial('./temp/pages/home.hbs')
                });
        });

        this.get('#/', function (ctx) {
            getSessionInfo(ctx);

            if (ctx.loggedIn) {
                getData('appdata', 'events', 'Kinvey')
                    .then((events) => {
                        ctx.events = events;
                        this.loadPartials(partials)
                            .then(function () {
                                this.partial('./temp/pages/home.hbs')
                            });
                    })
                    .catch(console.error);
            } else {
                this.loadPartials(partials)
                    .then(function () {
                        this.partial('./temp/pages/home.hbs')
                    });
            }
        });

        this.get('#/login', function (ctx) {
            this.loadPartials(partials)
                .then(function () {
                    this.partial('./temp/forms/login.hbs')
                });
        });

        this.post('#/login', function (ctx) {
            const {username, password} = ctx.params;

            if (username && password) {
                postData('user', 'login', {username, password}, 'Basic')
                    .then(data => {
                        setSessionInfo(data);

                        ctx.redirect('#/');
                    })
            }
        });

        this.get('#/register', function (ctx) {
            this.loadPartials(partials)
                .then(function () {
                    this.partial('./temp/forms/register.hbs')
                });
        });

        this.post('#/register', function (ctx) {
            const {username, password, rePassword} = ctx.params;

            if (username.length >= 3 && password.length >= 6 && password === rePassword) {
                postData('user', '', {username, password}, 'Basic')
                    .then(() => {
                        ctx.redirect('#/login');
                    }).catch(console.error);
            } else {
                alert('Username should be at least 3 symbols!\nPasswords should be equal and at least 6 symbols!')
            }
        });

        this.get('#/logout', function (ctx) {
            postData('user', '_logout', {}, 'Kinvey')
                .then(() => {
                    sessionStorage.clear();
                    ctx.redirect('#/');
                }).catch(console.error);
        });

        this.get('#/events/:id', function (ctx) {
            let id = ctx.params.id;
            getSessionInfo(ctx);
            sessionStorage.setItem('eventId', id);

            getData('appdata', `events/${id}`, 'Kinvey')
                .then(data => {
                    ctx.isAuthor = sessionStorage.getItem('userId') === data._acl.creator;
                    ctx.name = data.name;
                    ctx.imageURL = data.imageURL;
                    ctx.dateTime = data.dateTime;
                    ctx.organizer = data.organizer;
                    ctx.description = data.description;
                    ctx.peopleInterestedIn = data.peopleInterestedIn;

                    this.loadPartials(partials)
                        .partial('./temp/pages/eventInfo.hbs');
                }).catch(console.error);
        });

        this.get('#/create', function (ctx) {
            getSessionInfo(ctx);
            this.loadPartials(partials)
                .then(function () {
                    this.partial('./temp/forms/organizeEvent.hbs');
                })
        });

        this.post('#/create', function (ctx) {
            getSessionInfo(ctx);
            const {name, dateTime, description, imageURL} = ctx.params;
            const regEx = /(?<=http:\/\/|https:\/\/)\w+/;
            const peopleInterestedIn = 0;
            const organizer = sessionStorage.username;

            if (name.length >= 6 && description.length >= 10 && !isNaN(Date.parse(dateTime)) && regEx.test(imageURL)) {
                postData('appdata', 'events', {name, description, dateTime, imageURL, peopleInterestedIn, organizer})
                    .then(() => {
                        ctx.redirect('#/');
                    })
                    .catch(console.error);
            } else {
                alert('Name should be at least 6 symbols long!\nDate should be in correct format!\nDescription must be at least 10 symbols long!\nImage URL should start with "http://" or "https://"!')
            }
        });

        this.get('#/close', function (ctx) {
            getSessionInfo(ctx);
            const id = sessionStorage.getItem('eventId');

            deleteData('appdata', `events/${id}`, 'Kinvey')
                .then(() => {
                    ctx.redirect('#/');
                });
        });

        this.get('#/join', function (ctx) {
            getSessionInfo(ctx);
            const id = sessionStorage.getItem('eventId');

            getData('appdata', `events/${id}`, 'Kinvey')
                .then(event => {
                    event.peopleInterestedIn++;
                    putData('appdata', `events/${id}`, event, 'Kinvey')
                        .then(() => {
                            ctx.redirect('#/')
                        })
                        .catch(console.error);
                });
        });

        this.get('#/userInfo', function (ctx) {
            getSessionInfo(ctx);
            const user_id = sessionStorage.getItem('userId');
            console.log(sessionStorage.getItem('authtoken'));
            console.log(ctx);

            getData('appdata', `events/?query={"_acl.creator":"${user_id}"}`, 'Kinvey')
                .then((events) => {
                    ctx.count = events.length;
                    ctx.events = events;
                    console.log(events);


                    // ctx.events = events;
                    // ctx.username = sessionStorage.username;

                    this.loadPartials(partials)
                        .then(function () {
                            this.partial('./temp/pages/userInfo.hbs');
                        });
                })
                .catch(console.error);


        });

    });

    app.run();

})();