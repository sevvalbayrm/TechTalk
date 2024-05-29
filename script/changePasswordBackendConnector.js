function changePassword(event) {
    event.preventDefault(); 
    var username = window.location.href.split("?username=")[1]; 
    var oldPassword = document.getElementById('oldPassword').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (oldPassword === newPassword) { 
        document.getElementById('message').innerText = 'Eski şifre ve yeni şifre aynı olamaz.';
        document.getElementById('message').style.color = 'red';
    }
     else if (newPassword !== confirmPassword) {
      document.getElementById('message').innerText = 'Şifreler eşleşmiyor, lütfen tekrar deneyin.';
      document.getElementById('message').style.color = 'red';
    }
    else if (newPassword === confirmPassword){
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:8080/v1/auth/changepassword', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var response = JSON.parse(xhr.responseText);
                if (xhr.status === 200 && response.success) {
                    setTimeout(function() {
                        swal.fire({
                            title: 'Başarılı!',
                            text: "Şifre Değiştirme Başarılı",
                            icon: 'success',
                            confirmButtonText: 'Kapat'
                        }).then(function(){
                            window.location.href = 'index.html';  
                        })
                    }, 10);
                } else {
                    document.getElementById('message').innerText = 'Şifreler eşleşmiyor, lütfen tekrar deneyin.';
                    document.getElementById('message').style.color = 'red';
                }
            }
    };
    xhr.send(JSON.stringify({username,oldPassword,newPassword}));
}
};
