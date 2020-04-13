function solve(){
    let tdArr = Array.from(document.querySelectorAll('tr')).slice(1);
    tdArr.forEach(e => e.addEventListener('click', setColor));

    function setColor() {
        if(this.hasAttribute('style')) {
            this.removeAttribute('style');
        } else {
            tdArr.forEach(tr => tr.removeAttribute('style'));
            this.style.backgroundColor = '#413f5e';
        }
    }
}
