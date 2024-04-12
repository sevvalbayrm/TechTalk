function sendToBackend(event) {
    event.preventDefault(); 

    var currentUrl = window.location.href
    var token = currentUrl.split("?token=")[1];

    password = document.getElementById('newPassword').value;
    confirmPassword = document.getElementById('confirmPassword').value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/v1/auth/resetpassword/'+token, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && response.success) {
                setTimeout(function() {
                    swal.fire({
                        title: 'Başarılı!',
                        text: response.resultMessage,
                        icon: 'success',
                        confirmButtonText: 'Kapat'
                    }).then(function(){
                        window.location.href = '../Login/giris.html';  
                    })
                }, 10);
                             

            } else {
                swal.fire({
                    title: 'Başarısız!',
                    text: response.resultMessage,
                    icon: 'error',
                    confirmButtonText: 'Kapat'
                })
            }
        }
    };
    xhr.send(JSON.stringify({password,confirmPassword}));
};