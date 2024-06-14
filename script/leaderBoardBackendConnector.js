function getLeaderboard(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/v1/profile/leaderboard', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);

            if (xhr.status === 200) {    
                var blockBodyDiv = document.getElementById('blockBodyDiv');
                
                response.forEach(function(user, i) {
                    var item = document.createElement('div');
                    item.className = 'item';
                    var base64Image = 'data:image/jpeg;base64,' + user.profilePhoto;

                    var medalDiv = document.createElement('div');
                    if (i === 0) {
                        medalDiv.className = 'gold';
                        var img = document.createElement('img');
                        img.src = 'style/gold-medal.png';
                        medalDiv.appendChild(img);
                    } else if (i === 1) {
                        medalDiv.className = 'silver';
                        var img = document.createElement('img');
                        img.src = 'style/silver-medal.png';
                        medalDiv.appendChild(img);
                    } else if (i === 2) {
                        medalDiv.className = 'bronze';
                        var img = document.createElement('img');
                        img.src = 'style/bronze-medal.png';
                        medalDiv.appendChild(img);
                    } else {
                        medalDiv.className = 'list_number';
                        var p = document.createElement('p');
                        p.textContent = i+1;
                        medalDiv.appendChild(p);
                    }
                    item.appendChild(medalDiv);
    
                    var userIconDiv = document.createElement('div');
                    userIconDiv.className = 'user-icon';
                    var img = document.createElement('img');
                    img.src = base64Image.length>30 ? base64Image : '/style/Default_pfp.svg.png';
                    img.alt = 'pfp';
                    userIconDiv.appendChild(img);
                    item.appendChild(userIconDiv);
    
                    
                    var userNameDiv = document.createElement('div');
                    userNameDiv.className = 'user_name';
                    var a = document.createElement('a');
                    a.href = 'http://localhost:8081/profil.html?username='+user.username;
                    a.textContent = user.username;
                    userNameDiv.appendChild(a);
                    item.appendChild(userNameDiv);
    
                    var scoreDiv = document.createElement('div');
                    scoreDiv.className = 'score';
                    var p = document.createElement('p');
                    p.textContent = user.point;
                    scoreDiv.appendChild(p);
                    item.appendChild(scoreDiv);
    

                    blockBodyDiv.appendChild(item);
                });
            } else {
               
            }
        }
    };
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function(){
    getLeaderboard();
})