function checkPasswords(event) {
    event.preventDefault();
    
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var messageElement = document.getElementById('message');
  
    if (password === confirmPassword) {
      document.getElementById('message').innerText = '';
      document.getElementById('message').style.color = 'green';
      
    } else {
      document.getElementById('message').innerText = 'Şifreler eşleşmiyor, lütfen tekrar deneyin.';
      document.getElementById('message').style.color = 'red';
    }
}


  function login(event) {
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var errorMessageElement = document.getElementById('errorMessage');
       
  }
