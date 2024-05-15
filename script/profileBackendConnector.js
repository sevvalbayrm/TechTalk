

function getProfile() {
    var currentUrl = window.location.href
    var username = currentUrl.split("?username=")[1];
    if(username === undefined){
        var token = localStorage.getItem('token')
        var decodedToken = parseJwt(token);   
        username = decodedToken.sub;
    }

  

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/v1/profile/'+username, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            var user = response.user
            var createdDate = new Date(user.createdDate).toLocaleDateString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            if (xhr.status === 200 && response.success) {
                document.getElementById('name').innerHTML = user.name + " " + user.surname;
                document.getElementById('username').innerHTML = response.user.username;
                document.getElementById('email').innerHTML = user.email;
                document.getElementById('createdate').innerHTML = createdDate;
                document.getElementById('point').innerHTML = user.point;
                document.getElementById('title').innerHTML = user.title;
            } else {
                document.getElementById('errormsg').innerHTML = ""
            }
        }
    };
    xhr.send();
};


function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

document.addEventListener('DOMContentLoaded', function() {
    getProfile();
    

});