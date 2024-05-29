
function checkLoggedIn() {
    
    var token = localStorage.getItem('token')
    
    if (!token) {
        return false;
    }

    var decodedToken = parseJwt(token);
    var tokenExpiration = new Date(decodedToken.exp * 1000); 

    if (tokenExpiration < new Date()) {
        localStorage.removeItem('token');
        return false;
    }

    
    return true;
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
document.addEventListener('DOMContentLoaded', function() {
    var currentUrl = window.location.href
    //giriş yaptıysa ana sayfaya yönlendir
    if(checkLoggedIn() && (currentUrl.includes("/giris") || currentUrl.includes("/kayit"))) {
            window.location.href = 'index.html';
         
    }
    //giriş yapmadıysa girişe yönlendir
    if(!checkLoggedIn() && (currentUrl.includes("/anasayfa"))){
        window.location.href = 'giris.html';
        event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    }
    // giriş yapmadıysa ve kendi hesabına ait profili görüntülemek istiyorsa girişe yönlendir.
    if(!checkLoggedIn() && currentUrl.includes("/profil.html") && !currentUrl.includes("?username=")){
        window.location.href = 'giris.html';
    }

});