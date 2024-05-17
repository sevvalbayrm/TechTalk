function createPfpChangeButton(){
    var inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.id = 'profilePictureInput';
    inputElement.className = 'file-input';
    inputElement.accept = '.jpg, .jpeg, .png';

    var labelElement = document.createElement('label');
    labelElement.htmlFor = 'profilePictureInput';
    labelElement.className = 'file-label';
    labelElement.textContent = 'Fotoğrafı Değiştir';

    var container = document.getElementById('profileContainer');
    container.appendChild(inputElement);
    container.appendChild(labelElement);
}

function createChangePasswordButton(){
    var changePasswordButtonDiv = document.getElementById('changePasswordButtonDiv');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'changePasswordButton';
    btn.id = 'changePasswordButton';
    btn.textContent = 'Şifre Değiştir';
    btn.onclick = function() {
         window.location.href='sifre_degistir.html?username='+parseJwt(localStorage.getItem('token')).sub;

    };

    changePasswordButtonDiv.appendChild(btn);
}
function convertFileToUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const imageUrl = reader.result;
            resolve(imageUrl);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function changePfp(imgURL){
    username = parseJwt(localStorage.getItem('token')).sub;
    url = imgURL;

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:8080/v1/profile/profile-photo', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload= function() {
        if (xhr.status >= 200 && xhr.status < 300) {
           console.log("Profil resmi değişti.");
        }
}
    xhr.send(JSON.stringify({username,url}));
}

function getProfile() {
    var currentUrl = window.location.href
    var username = currentUrl.split("?username=")[1];
    if(username === parseJwt(localStorage.getItem('token')).sub){
        // Kullanıcının kendi profiline link aracılığıyla yönlendirildiği senaryo. Link içerisinde username gönderiliyor.
        createChangePasswordButton();
        createPfpChangeButton();
    }
    if(username === undefined){
        // Kullanıcının profil butonuna basıp kendi profilini görüntülediği senaryo. Link içerisinde username gönderilmiyor.
        var token = localStorage.getItem('token')
        var decodedToken = parseJwt(token);   
        username = decodedToken.sub;
        createPfpChangeButton();
        createChangePasswordButton();
    }
    


    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/v1/profile/'+username, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            var user = response.user;
            var createdDate = new Date(user.createdDate).toLocaleDateString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            if (xhr.status === 200 && response.success) {
                 if(user.profilePhotoUrl != null){
                    console.log("Çalıştı");
                    document.getElementById('profilePicture').src = user.profilePhotoUrl;
                }
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
    const fileInput = document.getElementById('profilePictureInput');
    fileInput.addEventListener('change', async (event) => {
       const file = event.target.files[0];
       const imageUrl = await convertFileToUrl(file);
       changePfp(imageUrl);
    })  
    

});