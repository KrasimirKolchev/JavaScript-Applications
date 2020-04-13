(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
         const source = await fetch("./catTemplate.handlebars")
             .then(res => res.text());

         // const source = document.getElementById('cat-template').innerHTML;

         const template = Handlebars.compile(source);
         const cats = window.cats;
         const catsContext = { cats };

         document.getElementById('allCats').innerHTML = template(catsContext);
    }

})();

function toggle(ev) {
     const currentEl = ev.parentNode;
     const div = currentEl.querySelector('.status');

     if (div.style.display === 'none') {
          div.style.display = 'block';
     } else {
          div.style.display = 'none';
     }
}