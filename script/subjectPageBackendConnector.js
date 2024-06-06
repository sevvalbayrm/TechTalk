function getUser(username) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/v1/profile/' + username, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    resolve(response.user);
                } else {
                    reject(new Error('Failed to fetch user'));
                }
            }
        };
        xhr.send();
    });
}

function getSubject() {
    return new Promise((resolve, reject) => {
        var id = window.location.href.split('?id=')[1];
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/v1/subject/' + id, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    resolve(response);
                } else {
                    reject(new Error('Failed to fetch subject'));
                }
            }
        };
        xhr.send();
    });
}

function displaySubjectAndUser(subject, user) {
    var createdDate = new Date(subject.createdDate).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    document.getElementById('subjectTopic').textContent = subject.topic;
    document.getElementById('subjectUsername').textContent = subject.username;
    document.getElementById('subjectUsername').href = '/profil.html?username=' + subject.username;
    document.getElementById('createdDate').textContent = createdDate;
    document.getElementById('tag').textContent = subject.tag;

    var subjectMain = document.getElementById('subjectMainId');

    var commentBoxDiv = document.createElement('div');
    commentBoxDiv.classList.add('message');
    commentBoxDiv.id = 'commentBoxId';

    var msgUserDiv = document.createElement('div');
    var msgMainDiv = document.createElement('div');
    msgMainDiv.classList.add('message-main');
    msgUserDiv.classList.add("message-user");

    var userIconDiv = document.createElement('div');
    userIconDiv.classList.add('user-ico');

    if(Boolean(user.profilePhoto)){
        var userImg = document.createElement('img');
        userImg.src = "data:image/jpeg;base64,"+user.profilePhoto;
        userImg.alt = 'user-pp';
        userIconDiv.appendChild(userImg);
     }
    else{
        var defaultImg = document.createElement('img');
        defaultImg.src = 'style/Default_pfp.svg.png';
        defaultImg.alt = 'default-pp';
        userIconDiv.appendChild(defaultImg);
    }

    var usernameDiv = document.createElement('div');
    usernameDiv.classList.add('user-name');

    var usernameLink = document.createElement('a');
    usernameLink.textContent = subject.username;
    usernameLink.href = '/profil.html?username=' + subject.username;
    usernameDiv.appendChild(usernameLink);

    var userTitleDiv = document.createElement('div');
    userTitleDiv.classList.add('user-title');

    var userTitleP = document.createElement('p');
    userTitleP.classList.add('ünvan');
    userTitleP.textContent = "Konu Sahibi \n("+user.title+")"
    userTitleDiv.appendChild(userTitleP);

    msgUserDiv.appendChild(userIconDiv);
    msgUserDiv.appendChild(usernameDiv);
    msgUserDiv.appendChild(userTitleDiv);

    commentBoxDiv.appendChild(msgUserDiv);

    var header = document.createElement('header');
    header.textContent = createdDate;

    var commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.textContent = subject.message;

    var likeSectionDiv = document.createElement('div');
    likeSectionDiv.classList.add('like-section');

    var likeImg = document.createElement('img');
    likeImg.classList.add('like-image');
    likeImg.src = 'style/thumbs-up.png';
    likeImg.alt = 'like';
    likeImg.addEventListener('click', function () {
        subjectLike(subject.id);
    });

    likeSectionDiv.appendChild(likeImg);

    var likeCountSpan = document.createElement('span');
    likeCountSpan.classList.add('like-count', 'subject');
    likeCountSpan.textContent = subject.likeCount;

    likeSectionDiv.append(likeCountSpan);

    msgMainDiv.appendChild(header);
    msgMainDiv.appendChild(commentDiv);
    msgMainDiv.appendChild(likeSectionDiv);

    commentBoxDiv.appendChild(msgMainDiv);
    subjectMain.appendChild(commentBoxDiv);
}

function displayComment(comment, user) {
    var createdDate = new Date(comment.createdDate).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    var subjectMain = document.getElementById('subjectMainId');

    var commentBoxDiv = document.createElement('div');
    commentBoxDiv.classList.add('message');
    commentBoxDiv.id = 'commentBoxId';

    var msgUserDiv = document.createElement('div');
    var msgMainDiv = document.createElement('div');
    msgMainDiv.classList.add('message-main');
    msgUserDiv.classList.add("message-user");

    var userIconDiv = document.createElement('div');
    userIconDiv.classList.add('user-ico');

     if(Boolean(user.profilePhoto)){
        var userImg = document.createElement('img');
        userImg.src = "data:image/jpeg;base64,"+user.profilePhoto;
        userImg.alt = 'user-pp';
        userIconDiv.appendChild(userImg);
     }
    else{
        var defaultImg = document.createElement('img');
        defaultImg.src = 'style/Default_pfp.svg.png';
        defaultImg.alt = 'default-pp';
        userIconDiv.appendChild(defaultImg);
    }


    var usernameDiv = document.createElement('div');
    usernameDiv.classList.add('user-name');

    var usernameLink = document.createElement('a');
    usernameLink.textContent = comment.username;
    usernameLink.href = '/profil.html?username=' + comment.username;
    usernameDiv.appendChild(usernameLink);

    var userTitleDiv = document.createElement('div');
    userTitleDiv.classList.add('user-title');

    var userTitleP = document.createElement('p');
    userTitleP.classList.add('ünvan');
    userTitleP.textContent = user.title;
    userTitleDiv.appendChild(userTitleP);

    msgUserDiv.appendChild(userIconDiv);
    msgUserDiv.appendChild(usernameDiv);
    msgUserDiv.appendChild(userTitleDiv);

    commentBoxDiv.appendChild(msgUserDiv);

    var header = document.createElement('header');
    header.textContent = createdDate;

    var commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.textContent = comment.message;

    var likeSectionDiv = document.createElement('div');
    likeSectionDiv.classList.add('like-section');

    var likeImg = document.createElement('img');
    likeImg.classList.add('like-image');
    likeImg.src = 'style/thumbs-up.png';
    likeImg.alt = 'like';
    likeImg.addEventListener('click', function () {
        commentLike(comment.id);
    });

    likeSectionDiv.appendChild(likeImg);

    var likeCountSpan = document.createElement('span');
    likeCountSpan.classList.add('like-count', 'comment');
    likeCountSpan.setAttribute('data-comment-id', comment.id);
    likeCountSpan.textContent = comment.likeCount;

    likeSectionDiv.append(likeCountSpan);

    msgMainDiv.appendChild(header);
    msgMainDiv.appendChild(commentDiv);
    msgMainDiv.appendChild(likeSectionDiv);

    commentBoxDiv.appendChild(msgMainDiv);
    subjectMain.appendChild(commentBoxDiv);
}

function subjectLike(subjectId) {
    var username = parseJwt(localStorage.getItem('token')).sub;
    if (username) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:8080/v1/subject/like', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Subject like successful');
                updateSubjectLikeCount(subjectId);
            }
        };
        xhr.send(JSON.stringify({ subjectId, username }));
    }
    else{
        console.log("GİRİŞ YAP")
    }
}

function commentLike(commentId) {
    var token = localStorage.getItem('token');
    var username = parseJwt(token).sub;
    if (username) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:8080/v1/comment/like', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Comment like successful');
                updateCommentLikeCount(commentId);
            } else {
            }
        };
        xhr.send(JSON.stringify({commentId,username}));
    } else {
        console.log("GİRİŞ YAP");
    }
}

function updateSubjectLikeCount(subjectId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/v1/subject/' + subjectId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var response = JSON.parse(xhr.responseText);
            var subject = response.subject;
            document.querySelector('.like-count.subject').textContent = subject.likeCount;
        }
    };
    xhr.send();
}

function updateCommentLikeCount(commentId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/v1/comment/' + commentId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var response = JSON.parse(xhr.responseText);
            document.querySelector('.like-count.comment[data-comment-id="' + response.id + '"]').textContent = response.likeCount;
        }
    };
    xhr.send();
}

function parseJwt(token) {
    if(token === null){
        return false;
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function updateCommentsAndSubject(subjectId) {
    getSubject(subjectId)
        .then(response => {
            var comments = response.comments;

            var commentPromises = comments.map(comment => {
                return getUser(comment.username).then(commentUser => ({ comment, commentUser }));
            });

            return Promise.all(commentPromises);
        })
        .then(commentData => {
            var commentsSection = document.querySelectorAll('.message');
            commentsSection.innerHTML = '';

            commentData.forEach(({ comment, commentUser }) => {
                displayComment(comment, commentUser);
            });

            updateSubjectLikeCount(subjectId);
        })
        .catch(error => {
            console.error(error);
        });
}
function addNewCommentData(user){
    var commentAddPfp = document.getElementById('commentAddPfp')
    var commentAddUsername = document.getElementById('commentAddUsername');
    var commentAddTitle = document.getElementById('commentAddTitle');
    var commentAddButton = document.getElementById('commentAddButton');
    var commentAddDate = document.getElementById('commentAddDate');
    var commentAddMessage = document.getElementById('comment-area');

    var createdDate = new Date().toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    commentAddDate.textContent = createdDate;
    commentAddUsername.textContent = user.username;
    commentAddUsername.href = '/profil.html?username=' + user.username;

    commentAddTitle.textContent = user.title;

    if(Boolean(user.profilePhoto)){
       commentAddPfp.src = "data:image/jpeg;base64,"+user.profilePhoto;
     }
    else{
        commentAddPfp.src = 'style/Default_pfp.svg.png';
    }

    commentAddButton.addEventListener('click',function(event){
        if(!commentAddMessage.value){
            commentAddMessage.placeholder = "MESAJ ALANI BOŞ BIRAKILAMAZ!";
            return;
        }
        addNewComment(user.username,commentAddMessage.value);
        commentAddMessage.value = '';
    })
    

}

function addNewComment(username,message){
 
    event.preventDefault();
    var subjectId = window.location.href.split('?id=')[1];
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/v1/comment/create/'+subjectId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && response.success) {
                updateCommentsAndSubject(subjectId);
            } else {

            }
        }
    };
    xhr.send(JSON.stringify({ username, message,}));
}

document.addEventListener('DOMContentLoaded', function () {
    getSubject()
        .then(response => {
            var subject = response.subject;
            var comments = response.comments;
            return getUser(subject.username).then(user => ({ subject, comments, user }));
        })
        .then(({ subject, comments, user }) => {
            displaySubjectAndUser(subject, user);

            var commentPromises = comments.map(comment => {
                return getUser(comment.username).then(commentUser => ({ comment, commentUser }));
            });

            return Promise.all(commentPromises);
        })
        .then(commentData => {
            commentData.forEach(({ comment, commentUser }) => {
                displayComment(comment, commentUser);
            });
        })
        .catch(error => {
            console.error(error);
        });

        if(Boolean(parseJwt(localStorage.getItem('token')).sub)){
            getUser(parseJwt(localStorage.getItem('token')).sub).then(user => {
                addNewCommentData(user);
            })
        }
        else{
            var commentAddButton = document.getElementById('commentAddButton');
            var commentAddMessage = document.getElementById('comment-area');

            commentAddMessage.placeholder = "YORUM YAPMAK İÇİN GİRİŞ YAPIN!";
            commentAddMessage.disabled = true;
            commentAddButton.disabled = true;

        }
});