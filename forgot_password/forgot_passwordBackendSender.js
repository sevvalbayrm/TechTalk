function sendToBackend(event) {
    
    
    event.preventDefault(); 
    email = document.getElementById('email').value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/v1/auth/forgotpassword', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && response.success) {
                swal.fire({
                    title: 'Başarılı!',
                    text: response.resultMessage,
                    icon: 'success',
                    confirmButtonText: 'Kapat'
                })

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
    xhr.send(JSON.stringify({email}));
};
