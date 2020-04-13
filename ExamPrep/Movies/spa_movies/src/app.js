import * as reqHandler from './requestHandler.js';

(() => {
    const app  = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', reqHandler.getHome);

        this.get('#/', reqHandler.getHome);

        this.get('#/home', reqHandler.getHome);

        this.get('#/login', reqHandler.getLogin);

        this.post('#/login', reqHandler.postLogin);

        this.get('#/register', reqHandler.getRegister);

        this.post('#/register', reqHandler.postRegister);

        this.get('#/logout', reqHandler.getLogout);

        this.get('#/create', reqHandler.getCreate);

        this.post('#/create', reqHandler.postCreate);

        this.get('#/cinema', reqHandler.getCinema);

        this.get('#/details/:id', reqHandler.getDetails);

        this.get('#/myMovies', reqHandler.getMyMovies);

        this.get('#/edit/:id', reqHandler.getEditMovie);

        this.post('#/edit', reqHandler.postEditMovie);

        this.get('#/delete/:id', reqHandler.getDeleteMovie);

        this.post('#/delete', reqHandler.postDeleteMovie);

        this.get('#/buy', reqHandler.getBuyMovie);

    });

    app.run();
})();