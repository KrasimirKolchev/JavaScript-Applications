(() => {
    renderMonkeys();

    async function renderMonkeys() {
        const src = await fetch("./monkeyTemplate.handlebars")
            .then(res => res.text());

        const templateFn = Handlebars.compile(src);
        const context = { monkeys };

        document.getElementById('allMonkeys').innerHTML = templateFn(context);
    }
})();

function toggle(e) {
    const current = e.parentNode;
    let info = current.querySelector('p');

    if (info.style.display === 'none') {
        info.style.display = 'block';
    } else {
        info.style.display = 'none';
    }
}