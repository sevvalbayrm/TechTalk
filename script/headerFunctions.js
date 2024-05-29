function logout() {
    localStorage.removeItem('token');

    window.location.href = 'index.html';
}
function includeNavbar() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            if(isLoggedIn()){
                var logoutButton = document.createElement("li");
                logoutButton.className = "logout";
                logoutButton.innerHTML = '<a href="#" onclick="logout()">Çıkış Yap</a>';
                actionList.appendChild(logoutButton);
                var profileButton = document.createElement("li");
                profileButton.className = "profile";
                profileButton.innerHTML = '<a href ="profil.html"><i class="fa-regular fa-user"></i>Profil</a>'
                actionList.appendChild(profileButton);
        }else {
            var loginButton = document.createElement("li");
            loginButton.className = "login";
            loginButton.innerHTML = '<a href="giris.html">Giriş Yap</a>';
            actionList.appendChild(loginButton);
        }
        })
        .catch(error => {
            console.error('Error fetching navbar:', error);
        });
}

function isLoggedIn(){
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
    if(token === null){
        return false;
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

document.addEventListener("DOMContentLoaded",function() {
    includeNavbar();
    var actionList = document.getElementById("actionList");
    
    document.addEventListener('keypress', function(event) {
        if (event.target.id === 'searchInput' && event.key === 'Enter') {
            event.preventDefault();
            var query = event.target.value;
            var searchQuery = encodeURIComponent(query);
            window.location.href = "http://localhost:8081/arama_sonucları.html?search="+searchQuery;
        }
    });

    
    
    
});


