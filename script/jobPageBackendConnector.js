function getJobData(){
    var jobId =  window.location.href.split('?id=')[1];
    var username = document.getElementById('jobEmployerName');
    var title = document.getElementById('jobTopic');
    var description = document.getElementById('jobDescription');
    var contactEmail = document.getElementById('tag');
    var createdDate = document.getElementById('createdDate');
    var requirements = document.getElementById('reqList');
    var employerUsername = document.getElementById('employerUsername');
    var employerTitle = document.getElementById('employerTitle');
    var employerPfp = document.getElementById('employerPfp');

    fetch('http://localhost:8080/v1/job/'+jobId).then(response => response.json()).then(data =>{
        username.textContent = data.username;
        username.href = 'http://localhost:8081/profil.html?username'+data.username;
        title.textContent = data.title;
        description.textContent = data.description;
        contactEmail.textContent = data.contactEmail;
        createdDate.textContent = new Date(data.createdDate).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        data.requirements.forEach(item => {
            var newItem = document.createElement('li');
            newItem.textContent = item;
            requirements.appendChild(newItem);
        });
        employerUsername.textContent = data.username;
        getUser(data.username).then(user =>{
           employerTitle.textContent = user.title
            var imgSrcTemp = 'data:image/jpeg;base64,' + user.profilePhoto;
            var imgSrc = imgSrcTemp.length>30 ? imgSrcTemp : '/style/Default_pfp.svg.png';
            employerPfp.src = imgSrc;
        })
    })
}

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



document.addEventListener('DOMContentLoaded',function (){
    getJobData();
});