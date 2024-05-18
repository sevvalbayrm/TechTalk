function getSubject() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/v1/subject', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && !Object.is(response,null)) {
                var blockBody = document.getElementById("blockBody");
                response.forEach(function(item) {
                    var newItem = document.createElement("div");
                    newItem.classList.add("item");
                    var createdDate = new Date(item.createdDate).toLocaleDateString('tr-TR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })
                      if(newItem.userIcon == null){
                        newItem.innerHTML = `
                        <div class="user-icon"><img src="style/Default_pfp.svg.png" height="75px" width="75px"></img></div>
                        <div class="discuss-title">
                            <a href="http://localhost:8081/konular.html?=${item.id}">
                                ${item.topic}
                            </a>
                            <div class="minor">
                                <a href="http://localhost:8081/profil.html?username=${item.username}"><span id="usernameLink" class="user-name">${item.username}</span></a>
                                <span class="date">${createdDate}</span>
                            </div>
                        </div>
                        <div class="discuss-topic">${item.tag}</div>
                        <div class="like">${item.likeCount}</div>
                        <div class="comment">${item.commentCount}</div>
                    `;
                    blockBody.appendChild(newItem);
                      }
                      if(newItem.userIcon != null){

                    newItem.innerHTML = `
                        <div class="user-icon"><img src="${item.userIcon}" height="75px" width="75px"></img></div>
                        <div class="discuss-title">
                            <a href="http://localhost:8081/konular.html?=${item.id}">
                                ${item.topic}
                            </a>
                            <div class="minor">
                                <a href="http://localhost:8081/profil.html?username=${item.username}"><span id="usernameLink" class="user-name">${item.username}</span></a>
                                <span class="date">${createdDate}</span>
                            </div>
                        </div>
                        <div class="discuss-topic">${item.tag}</div>
                        <div class="like">${item.likeCount}</div>
                        <div class="comment">${item.comment}</div>
                    `;
                    blockBody.appendChild(newItem);}
                });
            } else {

            }
        }
    };
    xhr.send();
};


document.addEventListener("DOMContentLoaded",function() {
    getSubject();
    
});