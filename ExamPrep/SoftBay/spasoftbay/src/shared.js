export const partials = {
    header: './temp/common/header.hbs',
    footer: './temp/common/footer.hbs'
};

export function getSessionInfo(ctx) {
    ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
    ctx.username = sessionStorage.getItem('username');
    ctx.userId = sessionStorage.getItem('userId');
}