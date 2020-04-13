import { fetchData } from "./data.js";

const baseUrl = "https://blog-apps-c12bf.firebaseio.com/";
const makeUrl = x => `${baseUrl}${x}/.json`;

const getPosts = () => fetchData(undefined, undefined, makeUrl("posts"));
const getPost = postId => fetchData(undefined, undefined, makeUrl(`posts/${postId}`));
const getComments = () => fetchData(undefined, undefined, makeUrl("comments"));

function displayPosts(posts) {
    let fragment = document.createDocumentFragment();
    Object.keys(posts).forEach(e => {
        let option = document.createElement('option');
        option.value = e;
        option.innerHTML = posts[e].title;
        fragment.appendChild(option);
    });
    html.select().appendChild(fragment);
}

function displayPost(post) {
    Object.keys(post).forEach(e => {
        if (typeof html[e] === 'function') {
            html[e]().textContent = post[e];
        }
    });
    return post;
    //html.title().textContent = post.title;
    //html.body().textContent = post.body;
}

function displayComments(comments, post) {
    let fragment = document.createDocumentFragment();

    Object.keys(comments).filter(e => comments[e].postId === post.id)
        .forEach(e => {
            let li = document.createElement('li');
            li.setAttribute('id', `${comments[e].postId}`);
            li.textContent = comments[e].text;
            fragment.appendChild(li);
        });
    html.comments().innerHTML = "";
    html.comments().appendChild(fragment);
}

const actions = {
    btnLoadPosts: async () => {
        displayPosts(await getPosts());
    },
    btnViewPost: async () => {
        let post = displayPost(await getPost(html.select().value));
        displayComments(await getComments(), post);
    }
};

function handleEvent(e) {
    if (typeof actions[e.target.id] === 'function') {
        actions[e.target.id]();
    }
}

const html = {
    select: () => document.getElementById('posts'),
    title: () => document.getElementById('post-title'),
    body: () => document.getElementById('post-body'),
    comments: () => document.getElementById('post-comments')
};

function attachEvents() {
    document.addEventListener('click', handleEvent);
}

attachEvents();