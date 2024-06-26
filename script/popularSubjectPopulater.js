function getPopularSubjects() {
    fetch('http://localhost:8080/v1/subject/popular', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(!Object.is(data,null)){
            var populerKonularListesi = document.getElementById('populerKonularListesi');
            data.slice(0,3).forEach(konu => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = "http://localhost:8081/konu_sayfasi.html?id="+konu.id;
                link.textContent = konu.topic;
                listItem.appendChild(link);
                populerKonularListesi.appendChild(listItem);
              });
        }
    
    })
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
            data.slice(0,3).forEach((user, index) => {
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


function getPopularTags(){
    fetch('http://localhost:8080/v1/subject/trendtag', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data =>{
        if(!Object.is(data,null)){
            var popularTags = document.getElementById('populerEtiketListesi');
            data.slice(0,3).forEach(tag => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.textContent = tag;
                listItem.appendChild(link);
                popularTags.appendChild(listItem);
              });
        }
})

}

document.addEventListener('DOMContentLoaded', function() {
    getPopularSubjects();
    getLeaderboard();
    getPopularTags();
    

});