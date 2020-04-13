import {getData} from "./data.js";
import {postData} from "./data.js";
import {deleteData} from "./data.js";
import {putData} from "./data.js";

const html = {
    title: () => document.getElementById("title"),
    author: () => document.getElementById("author"),
    isbn: () => document.getElementById("isbn"),
    body: () => document.querySelector('body tbody'),
    editT: () => document.getElementById("edit-title"),
    editA: () => document.getElementById("edit-author"),
    editI: () => document.getElementById("edit-isbn"),
    editForm: () => document.getElementById('edit'),
    addForm: () => document.getElementById('addForm')
};

const actions = {
    btnLoadBooks: document.getElementById("loadBooks"),
    btnSubmit: document.getElementById("submit"),
    btnEditSubmit: document.getElementById("edit-submit")
};

actions.btnLoadBooks.addEventListener("click", loadBooksData);
actions.btnSubmit.addEventListener('click', addBook);
actions.btnEditSubmit.addEventListener('click', editBook);

async function addBook(ev) {
    ev.preventDefault();
    let title = html.title().value;
    let author = html.author().value;
    let isbn = html.isbn().value;

    if (title.trim() !== "" && author.trim() !== "" && isbn.trim() !== "") {
        await postData("books", {title, author, isbn})
            .then(() => {
                html.title().value = "";
                html.author().value = "";
                html.isbn().value = "";
                loadBooksData();
            });
    }
}

async function loadBooksData() {
    let data = await getData("books");
    html.body().innerHTML = "";

    data.forEach(s => {
        loadBook(s);
    });
}

function loadBook(book) {
    let tr = document.createElement("tr");
    tr.setAttribute('data-id', book._id);
    let tdTitle = creator("td", book.title);
    tr.appendChild(tdTitle);
    let tdAuthor = creator("td", book.author);
    tr.appendChild(tdAuthor);
    let tdIsbn = creator("td", book.isbn);
    tr.appendChild(tdIsbn);

    let tdButtons = document.createElement('td');
    let btnEdit = creator('button', 'Edit');
    btnEdit.addEventListener('click', editForm);
    tdButtons.appendChild(btnEdit);

    let btnDelete = creator('button', 'Delete');
    btnDelete.addEventListener('click', deleteBook);
    tdButtons.appendChild(btnDelete);

    tr.appendChild(tdButtons);
    html.body().appendChild(tr);
}

async function editBook(e) {
    e.preventDefault();
    let id = this.getAttribute('data-id');
    let book = await getData(`books/${id}`);

    if (html.editT().value !== "") {
        book.title = html.editT().value
    }
    if (html.editA().value !== "") {
        book.author = html.editA().value
    }
    if (html.editI().value !== "") {
        book.isbn = html.editI().value
    }

    await putData(`books/${id}`, book)
        .then(() => {
            html.editT().value = "";
            html.editA().value = "";
            html.editI().value = "";
            html.editForm().style.display = 'none';
            html.addForm().style.display = 'block';
            loadBooksData();
        });
}

async function editForm() {
    let current = this.parentNode.parentNode;
    let id = current.getAttribute("data-id");
    let book = await getData(`books/${id}`);

    html.editT().placeholder = `Edit: (${book.title})`;
    html.editA().placeholder = `Edit: (${book.author})`;
    html.editI().placeholder = `Edit: (${book.isbn})`;
    actions.btnEditSubmit.setAttribute('data-id', id);

    html.editForm().style.display = 'block';
    html.addForm().style.display = 'none';
}

async function deleteBook() {
    let current = this.parentNode.parentNode;
    let id = current.getAttribute('data-id');
    await deleteData(`books/${id}`)
        .then(() => {
            current.remove();
        })
        .catch()
}

function creator(el, text) {
    let elem = document.createElement(el);
    elem.textContent = text;
    return elem;
}
