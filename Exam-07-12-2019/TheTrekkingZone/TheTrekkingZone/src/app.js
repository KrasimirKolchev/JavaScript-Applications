import * as reqHandler from "./requestHandler.js";

(() => {
    const app = new Sammy('body', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', reqHandler.getHomeInit);

        this.get('#/', reqHandler.getHome);

        this.get('#/login', reqHandler.getLogin);

        this.post('#/login', reqHandler.postLogin);

        this.get("#/register", reqHandler.getRegister);

        this.post('#/register', reqHandler.postRegister);

        this.get('#/logout', reqHandler.getLogout);

        this.get('#/create', reqHandler.getCreate);

        this.post('#/create', reqHandler.postCreate);

        this.get('#/track/:id', reqHandler.getTrack);

        this.get('#/edit', reqHandler.getEdit);

        this.post('#/edit', reqHandler.postEdit);

        this.get('#/close', reqHandler.clear);

        this.get('#/like', reqHandler.likes);

        this.get('#/profile', reqHandler.profile);

    });

    app.run();
})();