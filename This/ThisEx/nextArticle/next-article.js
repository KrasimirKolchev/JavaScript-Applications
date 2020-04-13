function getArticleGenerator(articles) {
    let articleIndex = 0;

    return function showArticle() {
        if (articleIndex < articles.length) {

            let article = document.createElement('article');
            article.textContent = articles[articleIndex++];

            return document.querySelector('#content').appendChild(article);
        }
    };
}