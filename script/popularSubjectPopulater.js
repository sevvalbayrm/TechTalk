function getPopularSubjects() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/v1/subject/popular', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            var populerKonularListesi = document.getElementById('populerKonularListesi');
            if (xhr.status === 200) {
                response.forEach(konu => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = "http://localhost:8081/konu_sayfasi.html?id="+konu.id;
                    link.textContent = konu.topic;
                    listItem.appendChild(link);
                    populerKonularListesi.appendChild(listItem);
                  });
            } else {
                
            }
        }
    };
    xhr.send();
};


function getLeaderboard(){
    fetch('http://localhost:8080/v1/profile/leaderboard', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data =>{
        if(!Object.is(data,null)){
            var leaderboard = document.getElementById('liderlikListesi');
            data.forEach((user, index) => {
                const listItem = document.createElement('li');
                const usernameA = document.createElement('a');
                usernameA.href = "http://localhost:8081/profil.html?username="+user.username;
                usernameA.textContent = (index+1) + ". " + user.username + " - " + user.point;
                listItem.appendChild(usernameA);
                leaderboard.appendChild(listItem);
            });
        }
})
}
document.addEventListener('DOMContentLoaded', function() {
    getPopularSubjects();
    getLeaderboard();
    

});