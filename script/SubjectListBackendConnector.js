function getSubject() {
    fetch('http://localhost:8080/v1/subject', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (!Object.is(data, null)) {
            const blockBody = document.getElementById("blockBody");
            data.forEach(item => {
                const newItem = document.createElement("div");
                newItem.classList.add("item");
                const createdDate = new Date(item.createdDate).toLocaleDateString('tr-TR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
                const imgSrcTemp = 'data:image/jpeg;base64,' + item.userProfilePhoto;
                var imgSrc = imgSrcTemp.length>30 ? imgSrcTemp : '/style/Default_pfp.svg.png';
                newItem.innerHTML = `
                    <div class="user-icon"><img id="subjectListImgId" src=${imgSrc} height="75px" width="75px"></img></div>
                    <div class="discuss-title">
                        <a href="http://localhost:8081/konu_sayfasi.html?id=${item.id}">
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

            });
        }
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener("DOMContentLoaded", getSubject);