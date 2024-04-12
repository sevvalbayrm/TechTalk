
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
    if (checkLoggedIn()) {
        window.location.href = '/home.html';
    } else {
        window.location.href = '/giris.html';
    }

});