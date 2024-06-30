function getCurrentSubjectDatas(){
    var subjectId = window.location.href.split('?id=')[1];
    fetch('http://localhost:8080/v1/subject/'+subjectId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        var topic = document.getElementById('edit_title');
        var tag = document.getElementById('edit_tag');
        var description = document.getElementById('edit_description');

        topic.value = data.subject.topic;
        tag.value = data.subject.tag;
        topic.setAttribute('readonly',true);
        tag.setAttribute('readonly',true);
        description.value = data.subject.message;

        var editButton = document.getElementById('editSubjectBtn');
        editButton.addEventListener('click',function(event){
            event.preventDefault();
            var description = document.getElementById('edit_description').value;

            fetch('http://localhost:8080/v1/subject/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subjectId: subjectId,
                    message: description
                })
            })
            .then(response => response.json())
            .then(data => {
                swal.fire({
                    title: 'Başarılı!',
                    text: "Konu başarıyla güncellendi",
                    icon: 'success',
                    confirmButtonText: 'Kapat'
                }).then(function () {
                    window.location.href = 'konu_sayfasi.html?id='+subjectId;
                })
            })
        
        })
    })
}

document.addEventListener("DOMContentLoaded", function() {
    getCurrentSubjectDatas();
})