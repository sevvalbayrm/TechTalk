function editJob(){
    var jobId = window.location.href.split('?id=')[1];
    var xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:8080/v1/job/'+jobId,true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                console.log(response)
                document.getElementById('baslik').value = response.title;
                document.getElementById('aciklama').value = response.description;
                document.getElementById('email').value = response.contactEmail;

                var reqs = response.requirements
                var gereksinimlerDiv = document.getElementById('gereksinimler');
                gereksinimlerDiv.innerHTML = '';
                reqs.forEach((req,index) => {
                var gereksinimItem = document.createElement('div');
                gereksinimItem.className = 'gereksinim-item';
                gereksinimItem.innerHTML = `<span>${index + 1}. </span><input type="text" name="gereksinim[]" class="gereksinim" value="${req}">`;
                gereksinimlerDiv.appendChild(gereksinimItem);
                })
            } else {
                return new Error('Failed to fetch job');
            }
        }

    };
    xhr.send()
}

    function postDatas(){
        document.getElementById('submitEditBtn').addEventListener('click', function() {
            var jobIdStr = window.location.href.split('?id=')[1];
            var id = parseInt(jobIdStr,10);
            var errorMsg = document.getElementById('errorMsg');
            var requirements = Array.from(document.querySelectorAll('.gereksinim')).filter(field => field.value.trim() !== '');
            var title = document.getElementById('baslik').value;
            var description = document.getElementById('aciklama').value;
            var contact = document.getElementById('email').value;
            
    
            if (title.trim() === '') {
                errorMsg.textContent = '';
                errorMsg.textContent ='Başlık boş olamaz';
                return;
            }
            if (description.trim() === '') {
                errorMsg.textContent = '';
                errorMsg.textContent ='Açıklama boş olamaz';
                return;
            }
            if (contact.trim() === '') {
                errorMsg.textContent = '';
                errorMsg.textContent ='İletişim bilgisi boş olamaz';
                return;
            }
            if (requirements.length < 1) {
                errorMsg.textContent = '';
                errorMsg.textContent ='En az bir gereksinim eklemelisiniz'
                return;
            }


            var dataToSend = {
                id: id,
                title: title,
                description: description,
                contact: contact,
                requirements: requirements.map(field => field.value)
            };
                Object.entries(dataToSend).forEach((key,value) =>{
                    console.log(key,value);
                })

            fetch('http://localhost:8080/v1/job/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend),
            })
            .then(response => response.json())
            .then(data => {
                if(data){
                    Swal.fire({
                        icon: 'success',
                        title: 'İş İlanı Başarıyla Güncellendi.',
                        showConfirmButton: false,
                        timer: 2500  
                    })
                    .then(function () {
                        window.location.href = 'is_ilani_sayfasi.html?id='+id;
                    });
                }
                else{
                    errorMsg.textContent = "";
                    errorMsg.textContent = data.resultMessage
                }
            })
        });
    }


document.addEventListener('DOMContentLoaded',function(){
    editJob();
})