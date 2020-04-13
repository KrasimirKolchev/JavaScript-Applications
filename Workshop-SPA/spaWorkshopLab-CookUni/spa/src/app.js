import {getData, postData, putData, deleteData} from "./requesterData.js";

(() => {
    const app = Sammy('#rooter', function () {
        this.use('Handlebars', 'hbs');

        const partials = {
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        };

        function getSessionInfo(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.names = sessionStorage.getItem('names');
            ctx.userId = sessionStorage.getItem('userId');
        }

        function setSessionInfo(ctx) {
            sessionStorage.setItem('authtoken', ctx._kmd.authtoken);
            sessionStorage.setItem('names', `${ctx.firstName} ${ctx.lastName}`);
            sessionStorage.setItem('userId', ctx._id);
        }

        const categories = {
            'Vegetables and legumes/beans': "https://t3.ftcdn.net/jpg/00/25/90/48/240_F_25904887_fhZJ692ukng3vQxzHldvuN981OiYVlJ1.jpg",
            'Fruits': "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
            'Grain Food': "https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
            'Milk, cheese, eggs and alternatives': "https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
            'Lean meats and poultry, fish and alternatives': "https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg",
        };

        this.get('index.html', function (ctx) {
            getSessionInfo(ctx);
            this.loadPartials(partials)
                .then(function () {
                    this.partial('./templates/other/home.hbs')
                });
        });

        this.get('#/', function (ctx) {
            getSessionInfo(ctx);

            if (ctx.loggedIn) {
                getData('appdata', 'recipes', 'Kinvey')
                    .then((recipes) => {
                        ctx.recipes = recipes;
                        this.loadPartials(partials)
                            .then(function () {
                                this.partial('./templates/other/home.hbs')
                            });
                    })
                    .catch(console.error);
            } else {
                this.loadPartials(partials)
                    .then(function () {
                        this.partial('./templates/other/home.hbs')
                    });
            }

        });

        this.get('#/login', function (ctx) {
            this.loadPartials(partials).then(function () {
                this.partial('./templates/forms/login.hbs')
            });
        });

        this.post('#/login', function (ctx) {
            const {username, password} = ctx.params;

            postData('user', 'login', {username, password}, 'Basic')
                .then(data => {
                    setSessionInfo(data);
                    ctx.redirect('#/');
                }).catch(console.error);
        });

        this.get('#/register', function (ctx) {
            this.loadPartials(partials).then(function () {
                this.partial('./templates/forms/register.hbs')
            });
        });

        this.post('#/register', function (ctx) {
            const {firstName, lastName, username, password, repeatPassword} = ctx.params;

            if ((firstName.trim().length >= 2 && lastName.trim().length >= 2) && username.trim().length >= 3 && password.trim().length >= 6 && password === repeatPassword) {
                postData('user', '', {firstName, lastName, username, password}, 'Basic')
                    .then(() => {
                        ctx.redirect('#/login');
                    }).catch(console.error);
            } else {
                alert("First name & Last name should be at least 2 symbols! \nUsername should be at least 3 symbols! \nPassword should be at least 6 symbols and should be equal as Repeat password!")
            }
        });

        this.get('#/logout', function (ctx) {
            postData('user', '_logout', {}, 'Kinvey')
                .then(() => {
                    sessionStorage.clear();
                    ctx.redirect('#/');
                }).catch(console.error);
        });

        this.get('#/share', function (ctx) {
            getSessionInfo(ctx);
            this.loadPartials(partials).then(function () {
                this.partial('./templates/forms/shareRecipe.hbs');
            });
        });

        this.post('#/share', function (ctx) {
            getSessionInfo(ctx);
            const {meal, prepMethod, description, foodImageURL, category} = ctx.params;
            const ingredients = ctx.params.ingredients.split(', ');
            const likesCounter = 0;
            const categoryImageURL = categories[category];

            if (meal.length >= 4 && ingredients.length >= 2 && prepMethod.length >= 10 && description.length >= 10
                && category !== "Select category...") {
                const recipe = {
                    meal,
                    prepMethod,
                    description,
                    foodImageURL,
                    category,
                    ingredients,
                    likesCounter,
                    categoryImageURL
                };
                postData('appdata', 'recipes', recipe, 'Kinvey')
                    .then(() => {
                        ctx.redirect('#/');
                    }).catch(console.error);
            } else {
                alert("Meal should be at least 4 symbols!\nIngredients count should be at least 2!\nPreparation method and Description should be at least 10 symbols each")
            }
        });

        this.get('#/recipe/:id', function (ctx) {
            getSessionInfo(ctx);
            const id = ctx.params.id;
            sessionStorage.setItem('mealId', id);

            getData('appdata', `recipes/${id}`, 'Kinvey')
                .then(recipe => {
                    ctx.isCreator = sessionStorage.getItem('userId') === recipe._acl.creator;
                    ctx.foodImageURL = recipe.foodImageURL;
                    ctx.meal = recipe.meal;
                    ctx.description = recipe.description;
                    ctx.ingredients = recipe.ingredients;
                    ctx.prepMethod = recipe.prepMethod;
                    ctx.likesCounter = recipe.likesCounter;

                    this.loadPartials(partials)
                        .partial('./templates/other/recipeInfo.hbs');

                }).catch(console.error);
        });

        this.get('#/edit', function (ctx) {
            let id = sessionStorage.mealId;

            getSessionInfo(ctx);

            getData('appdata', `recipes/${id}`, 'Kinvey')
                .then(recipe => {
                    ctx.foodImageURL = recipe.foodImageURL;
                    ctx.meal = recipe.meal;
                    ctx.description = recipe.description;
                    ctx.ingredients = recipe.ingredients;
                    ctx.prepMethod = recipe.prepMethod;
                    ctx.category = recipe.category;
                    ctx.likesCounter = recipe.likesCounter;

                    this.loadPartials(partials).then(function () {
                        this.partial('./templates/forms/editRecipe.hbs');
                    });
                });
        });

        this.post('#/edit', function (ctx) {
            getSessionInfo(ctx);

            const {meal, prepMethod, description, foodImageURL, category} = ctx.params;
            const ingredients = ctx.params.ingredients.split(', ');
            const categoryImageURL = categories[category];

            if (meal.length >= 4 && ingredients.length >= 2 && prepMethod.length >= 10 && description.length >= 10
                && category !== "Select category...") {
                let recipe = {
                    meal,
                    prepMethod,
                    description,
                    foodImageURL,
                    category,
                    ingredients,
                    categoryImageURL,
                };
                let id = sessionStorage.mealId;

                getData('appdata', `recipes/${id}`, 'Kinvey')
                    .then(r => {
                        recipe.likesCounter = r.likesCounter;
                        putData('appdata', `recipes/${id}`, recipe, 'Kinvey')
                            .then(() => {
                                ctx.redirect('#/');
                            }).catch(console.error);
                    }).catch(console.error);
            } else {
                alert("Meal should be at least 4 symbols!\nIngredients count should be at least 2!\nPreparation method and Description should be at least 10 symbols each")
            }
        });

        this.get('#/delete', function (ctx) {
            getSessionInfo(ctx);
            let id = sessionStorage.mealId;

            deleteData('appdata', `recipes/${id}`, 'Kinvey')
                .then(() => {
                    ctx.redirect('#/');
                }).catch(console.error);
        });

        this.get('#/likes', function (ctx) {
            let id = sessionStorage.mealId;
            getSessionInfo(ctx);

            getData('appdata', `recipes/${id}`, 'Kinvey')
                .then(recipe => {
                    recipe.likesCounter++;
                    putData('appdata', `recipes/${id}`, recipe, 'Kinvey')
                        .then(() => {ctx.redirect(`#/recipe/${id}`)})
                        .catch(console.error);
                });
        });
    });

    app.run();
})();