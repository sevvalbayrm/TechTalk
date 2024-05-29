const username = parseJwt(localStorage.getItem('token')).sub;

if(!username){
    var konuOlusturBtn = document.getElementById('konuOlusturBtn');
    konuOlusturBtn.style.color = 'gray';
    konuOlusturBtn.removeAttribute('href');
    konuOlusturBtn.title = "Konu oluşturmak için giriş yapmalısınız";
}

function parseJwt(token) {
    if (token === null) {
        return false;
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}