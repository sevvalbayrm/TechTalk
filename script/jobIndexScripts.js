function getUser(username) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/v1/profile/' + username, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    resolve(response.user);
                } else {
                    reject(new Error('Failed to fetch user'));
                }
            }
        };
        xhr.send();
    });
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


document.addEventListener('DOMContentLoaded', function(){
    const username = parseJwt(localStorage.getItem('token')).sub;
    if(!username){
        var konuOlusturBtn = document.getElementById('isİlaniBtn');
        konuOlusturBtn.style.color = 'gray';
        konuOlusturBtn.removeAttribute('href');
        konuOlusturBtn.title = "Konu oluşturmak için giriş yapmalısınız";
        return 0;
    }


    // getUser(username).then(function(user){
    //     if(!user.title.toLowerCase() == "senior"){
    //         var konuOlusturBtn = document.getElementById('isİlaniBtn');
    //         konuOlusturBtn.style.color = 'gray';
    //         konuOlusturBtn.removeAttribute('href');
    //         konuOlusturBtn.title = "Konu oluşturmak için Senior olmalısınız yapmalısınız";
    //     }
    // })
    

})