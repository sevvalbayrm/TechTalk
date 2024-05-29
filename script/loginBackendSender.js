function sendToBackend(event) {
    event.preventDefault(); 
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/v1/auth/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            var token = response.jwtToken
            if (xhr.status === 200 && response.success) {
                localStorage.setItem('token', token);
                 window.location.href = '/index.html'; 
            } else {
                // Hata mesajını göster
                document.getElementById('errorMessage').innerHTML = response.resultMessage;
                errorMessage.style.display = 'block';
            }
        }
    };
    xhr.send(JSON.stringify({username,password}));
};
