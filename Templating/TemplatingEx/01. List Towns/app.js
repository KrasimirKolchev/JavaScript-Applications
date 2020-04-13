(function () {
    document.getElementById('btnLoadTowns').addEventListener('click', addTowns);

    async function addTowns() {
        let towns = document.getElementById('towns').value.split(', ');
        let source = await fetch("./townsTemplate.handlebars")
            .then(res => res.text());

        let template = Handlebars.compile(source);
        let context = { towns };
        document.getElementById('root').innerHTML = template(context);
    }
})();