function sendToBackend(event) {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

    
    var name = document.getElementById('name').value;
    var surname = document.getElementById('lastname').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
         

    // Backend'e POST isteği gönder
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/v1/auth/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && response.success) {
                    setTimeout(function() {
                        swal.fire({
                            title: 'Başarılı!',
                            text: "Hesabınız başarıyla oluşturuldu.",
                            icon: 'success',
                            confirmButtonText: 'Kapat'
                        }).then(function(){
                            window.location.href = 'giris.html';  
                        })
                    }, 10);
                
            } else {
                swal.fire({
                    title: 'Başarısız!',
                    text: response.resultMessage+".",
                    icon: 'error',
                    confirmButtonText: 'Kapat'
                })
            }
        }
    };
    xhr.send(JSON.stringify({name,surname,username,email,password}));
};