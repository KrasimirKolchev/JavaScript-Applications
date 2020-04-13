import {postData} from "./data.js";
import {getData} from "./data.js"

const html = {
    fName: document.getElementById("firstName"),
    lName: document.getElementById("lastName"),
    fNumber: document.getElementById("facultyNumber"),
    grade: document.getElementById("grade"),
    body: document.querySelector("#results tbody"),
    btnSubmit: document.getElementById("submit"),
    btnLoadStudents: document.getElementById("loadStudents")
};

let idCount = 1;

html.btnLoadStudents.addEventListener('click', loadStudents);

html.btnSubmit.addEventListener('click', addStudent);

async function loadStudents() {
    let students = await getData("students");
    html.body.innerHTML = "";
    students.sort((f, s) => f.id - s.id).forEach(s => {
        loadStudent(s);
    })
}

// first load students to initialise the current ID number from Kinvey DB
// otherwise the count will start initially from SkiInventory

function loadStudent(stud) {
    let tr = document.createElement("tr");
    let td1 = creator('td', stud.id);
    idCount = stud.id;
    tr.appendChild(td1);
    let td2 = creator('td', stud.firstName);
    tr.appendChild(td2);
    let td3 = creator('td', stud.lastName);
    tr.appendChild(td3);
    let td4 = creator('td', stud.facultyNumber);
    tr.appendChild(td4);
    let td5 = creator('td', stud.grade);
    tr.appendChild(td5);
    html.body.appendChild(tr);
}

async function addStudent(ev) {
    ev.preventDefault();

    let firstName = html.fName.value;
    let lastName = html.lName.value;
    let facultyNumber = parseInt(html.fNumber.value);
    let grade = html.grade.value;

    //faculty number starts from 900001000000  !!!!

    if (firstName.trim() !== "" && lastName.trim() !== "" && facultyNumber > 900001000000
                && facultyNumber < 1000000000000 && grade >= 2 && grade <= 6) {
        let id = ++idCount;
        let stud = {id, firstName, lastName, facultyNumber, grade};

        await postData("students", stud)
            .then(() => {
                html.fName.value = "";
                html.lName.value = "";
                html.fNumber.value = "";
                html.grade.value = "";
                loadStudent(stud);
            })
            .catch((err) => console.error())
    }
}

function creator(el, text) {
    let node = document.createElement(el);
    node.textContent = text;
    return node;
}