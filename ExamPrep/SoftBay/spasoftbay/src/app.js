import * as reqHandler from './reqHandler.js';

(() => {
    const app = Sammy('body', function () {
        this.use('Handlebars', 'hbs');



        this.get('index.html', reqHandler.getHome);

        this.get('#/home', reqHandler.getHome);

        this.get('#/login', reqHandler.getLogin);

        this.post('#/login', reqHandler.postLogin);

        this.get('#/register', reqHandler.getRegister);

        this.post('#/register', reqHandler.postRegister);

        this.get('#/logout', reqHandler.getLogout);

        this.get('#/dashboard', reqHandler.dashboard);

        this.get('#/create', reqHandler.getCreate);

        this.post('#/create', reqHandler.postCreate);

        this.get('#/edit/:id', reqHandler.getEdit);

        this.post('#/edit', reqHandler.postEdit);

        this.get('#/details/:id', reqHandler.details);

        this.get('#/delete/:id', reqHandler.getDelete);

        this.post('#/delete', reqHandler.postDelete);

        this.get('#/profile', reqHandler.profile);

        this.get('./buy', reqHandler.buy);

    });

    app.run();
})();

