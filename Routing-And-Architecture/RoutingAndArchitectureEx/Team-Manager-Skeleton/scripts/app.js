import {getData, postData, putData, deleteData} from "./requesterData.js";

(() => {

    const partials = {
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    };

    function sessionInfo(ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.userId = sessionStorage.getItem('userId');
    }

    const app = new Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', function (ctx) {
            this.loadPartials(partials)
                .then(function () {
                    this.partial('./templates/home/home.hbs')
                });
        });

        this.get('#/', function (ctx) {
            sessionInfo(ctx);
            this.loadPartials(partials).then(function () {
                this.partial('./templates/home/home.hbs')
            });
        });

        this.get('#/home', function (ctx) {
            sessionInfo(ctx);
            this.loadPartials(partials).then(function () {
                this.partial('./templates/home/home.hbs')
            });
        });

        this.get('#/about', function (ctx) {
            sessionInfo(ctx);
            this.loadPartials(partials).then(function () {
                this.partial('./templates/about/about.hbs')
            });
        });

        this.get('#/login', function (ctx) {
            sessionInfo(ctx);
            partials['loginForm'] = './templates/login/loginForm.hbs';
            this.loadPartials(partials).then(function () {
                this.partial('./templates/login/loginPage.hbs')
            });
        });

        this.get('#/register', function (ctx) {
            sessionInfo(ctx);
            partials['registerForm'] = './templates/register/registerForm.hbs';
            this.loadPartials(partials).then(function () {
                this.partial('./templates/register/registerPage.hbs')
            });
        });

        this.post('#/register', function (ctx) {
            const username = ctx.params.username;
            const password = ctx.params.password;
            const rPassword = ctx.params.repeatPassword;
            const userData = {username, password};

            if (password === rPassword) {
                postData('user', '', userData, 'Basic')
                    .then(data => {
                        ctx.redirect('#/login');
                    })
                    .catch(console.error);
            } else {
                alert("Wrong second password!")
            }
        });

        this.post('#/login', function (ctx) {
            const username = ctx.params.username;
            const password = ctx.params.password;
            const userData = { username, password };
            postData('user', 'login', userData, 'Basic')
                .then(data => {
                    sessionStorage.setItem('authtoken', data._kmd.authtoken);
                    sessionStorage.setItem('username', data.username);
                    sessionStorage.setItem('userId', data._id);
                    ctx.redirect('#/home');
                }).catch();
        });

        this.get('#/logout', function (ctx) {
            sessionStorage.clear();
            ctx.redirect('#/home');
        });

        this.get('#/catalog', function (ctx) {
            sessionInfo(ctx);
            ctx.hasNoTeam = true;

            getData('appdata', 'teams', 'Kinvey')
                .then((data) => {

                    if (data.length > 0) {
                        ctx.hasNoData = false;
                        ctx.teams = data;
                    }

                    partials['team'] = './templates/catalog/team.hbs';

                    this.loadPartials(partials).then(function () {
                        this.partial('./templates/catalog/teamCatalog.hbs')
                    });
                }).catch(console.error);
        });

        this.get('#/create', function (ctx) {
            sessionInfo(ctx);
            partials['createForm'] = './templates/create/createForm.hbs';
            this.loadPartials(partials).then(function () {
                this.partial('./templates/create/createPage.hbs')
            });
        });

        this.post('#/create', function (ctx) {
            const { name, comment } = ctx.params;
            const members = [{ username: ctx.username }];

            if (name && comment) {
                postData('appdata', 'teams', { name, comment, members } ,'Kinvey')
                    .then(() => {
                        ctx.redirect('#/catalog')
                    }).catch(console.error);
            } else {
                alert('All fields must be filled!')
            }
        });

        this.get('#/edit', function (ctx) {
            sessionInfo(ctx);
            partials['editForm'] = './templates/edit/editForm.hbs';
            this.loadPartials(partials).then(function () {
                this.partial('./templates/edit/editPage.hbs')
            });
        });

        this.post('#/edit', function (ctx) {
            const { name, comment } = ctx.params;

            putData('appdata', 'teams', { name, comment } ,'Kinvey')
                .then(() => {
                    ctx.redirect('#/catalog')
                }).catch(console.error);
        });

        this.get('#/catalog/:id', function (ctx) {
            const id = ctx.params.id;
            partials['teamMember'] = './templates/catalog/teamMember.hbs';
            partials['teamControls'] = './templates/catalog/teamControls.hbs';

            getData('appdata', `teams/${id}`, 'Kinvey')
                .then(data => {
                    ctx.name = data.name;
                    ctx.description = data.description;

                    this.loadPartials(partials)
                        .then(function () {
                            this.partial('./templates/catalog/details.hbs');
                        })
                }).catch(console.error);
        })

    });

    app.run();

})();

