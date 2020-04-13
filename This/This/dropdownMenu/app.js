function solve() {
    document.querySelector('#dropdown').addEventListener('click', function () {
        let dropped = document.querySelector('#dropdown-ul');

        if (dropped.style.display === 'block') {
            dropped.style.display = 'none';
            document.querySelector('#box').style.backgroundColor = "black";
            document.querySelector('#box').style.color = "white";
        } else {
            dropped.style.display = 'block';
            let liArr = Array.from(document.querySelectorAll('body div ul li'));
            liArr.forEach(li => li.addEventListener('click', changeColor));
        }
    });

    function changeColor(ev) {
        let color = ev.target.textContent;
        let box = document.querySelector('#box');
        box.style.backgroundColor = color;
        box.style.color = 'black';
    }
}