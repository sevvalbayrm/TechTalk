function checkPasswords(event) {
    event.preventDefault();
    
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var messageElement = document.getElementById('message');
  
    if (password === confirmPassword) {
      document.getElementById('message').innerText = 'Kayıt Başarılı';
      document.getElementById('message').style.color = 'green';
      setTimeout(function() {
        window.location.href = 'giris.html';
      }, 3000);
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
  //veritabanında olunca buraya gerek var mı sor.
    if (email === "sevval@gmail.com" && password === "123456") {
        
        console.log("Giriş başarılı");
      } 
       
  }