import * as reqHandler from "./requestHandler.js";

(() => {
    const app = Sammy('#rooter', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', reqHandler.getHome);

        this.get('#/', reqHandler.getHome);

        this.get('#/login', reqHandler.getLogin);

        this.post('#/login', reqHandler.postLogin);

        this.get("#/register", reqHandler.getRegister);

        this.post('#/register', reqHandler.postRegister);

        this.get('#/logout', reqHandler.getLogout);

        this.get('#/create', reqHandler.getCreate);

        this.post('#/create', reqHandler.postCreate);

        this.get('#/dashboard', reqHandler.getDashboard);

        this.get('#/cause/:id', reqHandler.getCause);

        this.get('#/close', reqHandler.getClose);

        this.post('#/donate', reqHandler.postDonate);

    });

    app.run();
})();