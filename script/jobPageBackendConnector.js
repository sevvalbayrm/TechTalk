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

function getJob(){
    var jobId =  window.location.href.split('?id=')[1];
    return new Promise ((resolve,reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET','http://localhost:8080/v1/job/'+jobId,true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    resolve(response);
                } else {
                    reject(new Error('Failed to fetch job'));
                }
            }
        };
        xhr.send();
    })
}

async function isAdmin(){
    var username = parseJwt(localStorage.getItem('token')).sub;
    if(username){
        try {
            var user = await getUser(username);
            if(user.userType === 'admin'){
                return true;
            }
        }
        catch {
            console.log(error)
            return false
        }
    }
    return false;
}

async function isAuthor(){
    var username = parseJwt(localStorage.getItem('token')).sub;
    var jobId = window.location.href.split('?id=')[1];
    if(username){
        try {
            var job = await getJob(jobId);
            if(job.username === username){
                return true;
            }
        }
        catch (error){
            console.log(error)
            return false
        }
    }
    return false;
}

function createJobButtons(){
    var messageDiv = document.getElementById('messageDiv');

    var crudButtonsDiv = document.createElement('div');
    crudButtonsDiv.classList.add('crud_button');

    var deleteJobDiv = document.createElement('div');
    deleteJobDiv.classList.add('remove_subject');

    var deleteJobButton = document.createElement('button');
    deleteJobButton.textContent = 'İş İlanını Sil';
    deleteJobButton.addEventListener('click', function(){
        var id = window.location.href.split('?id=')[1];
        deleteJob(id);
    })

    var deleteJobImg = document.createElement('img');
    deleteJobImg.src = '/style/delete.png';

    deleteJobButton.appendChild(deleteJobImg);
    deleteJobDiv.appendChild(deleteJobButton);

    var editButtonDiv = document.createElement('div');
    editButtonDiv.classList.add('edit_subject');
    var editButton = document.createElement('button');
    editButton.textContent = 'İş İlanını Düzenle';
    editButton.addEventListener('click', function(){
        var id = window.location.href.split('?id=')[1];
        window.location.href = 'is_ilani_duzenle.html?id='+id;
    })
    var editImg = document.createElement('img');
    editImg.src = '/style/pen.png';
    editButton.appendChild(editImg);
    editButtonDiv.appendChild(editButton);

    Promise.all([isAdmin(), isAuthor()]).then(values => {
        const [isAdminRole, isAuthor] = values;
        if(isAuthor){
            crudButtonsDiv.appendChild(editButtonDiv);
        }
        if(isAdminRole || isAuthor){
            crudButtonsDiv.appendChild(deleteJobDiv);
            messageDiv.appendChild(crudButtonsDiv);
        }
    }) 

}

function deleteJob(jobId){
    var confirmBox = confirm('İş ilanını silmek istediğinize emin misiniz?');
    if(!confirmBox){
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE','http://localhost:8080/v1/job/delete/'+jobId,true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'İş İlanı Başarıyla Silindi',
                    showConfirmButton: false,
                    timer: 2500                
                })
            } else {
                console.log('Failed to delete job');
            }
        }
    };
    xhr.send();
}



document.addEventListener('DOMContentLoaded',function (){
    getJobData();
    createJobButtons();
});