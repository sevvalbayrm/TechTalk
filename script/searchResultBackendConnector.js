function showSearchResult() {
    
    var currentUrl = window.location.href;
    var searchQueryEncoded = currentUrl.split("?search=")[1];
    var searchQuery = decodeURIComponent(searchQueryEncoded);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/v1/search/'+searchQuery, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && !Object.is(response,null)) {
                var subjectList = response.subjectList;
                var subjectResult = document.getElementById("subjectResult");
                subjectList.forEach(function(subject){
                    var subjectDiv = document.createElement("div");
                    subjectDiv.classList.add("subject");
                    var subjectLink = document.createElement("a");
                    subjectLink.textContent = subject.topic;
                    subjectLink.href = "/konu_sayfasi.html?id="+subject.id; // konu sayfası bittiğinde tekrardan düzenlenecek
                    subjectDiv.appendChild(subjectLink);
                    subjectResult.appendChild(subjectDiv);
                });
                var subjectHeader = document.getElementById("subjectHeader");
                subjectHeader.querySelector(".count").textContent = subjectList.length;
                if(subjectList.length == 0){
                    subjectNotFound.style.display = 'block';
                }
                var userList = response.userList;
                var usersResult = document.getElementById("usersResult");
                userList.forEach(function(user){
                    var userDiv = document.createElement("div");
                    userDiv.classList.add("user");
                    var userLink = document.createElement("a");
                    userLink.href = "http://localhost:8081/profil.html?username="+user.username;
                    userLink.textContent = user.username;
                    userDiv.appendChild(userLink);
                    usersResult.appendChild(userDiv);
                });
                var usersHeader = document.getElementById("usersHeader");
                usersHeader.querySelector(".count").textContent = userList.length;
                if(userList.length == 0){
                    userNotFound.style.display = 'block';
                }
            }
        }
    };
    xhr.send();
};

showSearchResult();