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
function convertFileToBlob(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const arrayBuffer = reader.result;
            const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
            resolve(blob);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

function changePfp(file) {
    convertFileToBlob(file)
        .then(blob => {
            const username = parseJwt(localStorage.getItem('token')).sub;
            const formData = new FormData();
            formData.append('username', username);
            formData.append('profilePhoto', blob);

            formData.forEach (item => {
                console.log(item);
            
            })
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', 'http://localhost:8080/v1/profile/profile-photo', true);
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log("Profil resmi değişti.");
                } else {
                    console.error("Profil resmi değiştirilemedi.", xhr.responseText);
                }
            };
            xhr.onerror = function() {
                console.error("Profil resmi değiştirilemedi.", xhr.responseText);
            };
            xhr.send(formData);
        })
        .catch(error => {
            console.error("Failed to convert file to Blob:", error);
        });
}

function createBanButton(username){
    var buttonOutsideDiv = document.createElement('div');
    buttonOutsideDiv.classList.add('button-outside');

    var banButton = document.createElement('button');
    banButton.textContent = 'Kullanıcıyı Yasakla';

    var buttonImg = document.createElement('img');
    buttonImg.src = 'style/ban_hammer.png';

    banButton.appendChild(buttonImg);
    banButton.addEventListener('click', function(){
        banUser(username)
    })
    buttonOutsideDiv.appendChild(banButton);

    var navbarPlaceholder = document.getElementById('navbar-placeholder');
    navbarPlaceholder.parentNode.insertBefore(buttonOutsideDiv,navbarPlaceholder.nextSibling);
}

function banUser(username){
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:8080/v1/profile/ban/' + username, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Kullanıcı başarıyla yasaklandı.');
                window.location.href = 'index.html';
            } else {
                alert('Kullanıcı yasaklanırken bir hata oluştu.');
            }
        }
    };
    xhr.send();
    }

function getUser() {
    var username = parseJwt(localStorage.getItem('token')).sub;
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

function getProfile() {
    var currentUrl = window.location.href
    var username = currentUrl.split("?username=")[1];
    var tokenUsername = parseJwt(localStorage.getItem('token')).sub
    if(username === tokenUsername){
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
    getUser().then(user => {
        if(user.userType === 'admin' && user.username !== username){
            createBanButton(username);
        }
    })


    

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
                 if(user.profilePhoto != null){
                    var base64Image = 'data:image/jpeg;base64,' + user.profilePhoto;
                    document.getElementById('profilePicture').src = base64Image;
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


document.addEventListener('DOMContentLoaded', function() {
    getProfile();
    const fileInput = document.getElementById('profilePictureInput');
    fileInput.addEventListener('change', async (event) => {
       const file = event.target.files[0];
       await changePfp(file);
    });
    document.getElementById('profilePictureInput').addEventListener('change', function(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
    
        reader.onloadend = function() {
            document.getElementById('profilePicture').src = reader.result;
        }
    
        if (file) {
            reader.readAsDataURL(file);
        }
    }, false);
    

});