function reqFunc(){
    var addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', function() {
        const gereksinimlerDiv = document.getElementById('gereksinimler');
        const gereksinimCount = gereksinimlerDiv.getElementsByClassName('gereksinim').length;

        if (gereksinimCount < 10) {
            if(gereksinimCount == 9){
                addBtn.style.display = 'none';
            }
            const gereksinimItem = document.createElement('div');
            gereksinimItem.classList.add('gereksinim-item');

            const itemNumber = document.createElement('span');
            itemNumber.textContent = (gereksinimCount + 1) + '.';
            gereksinimItem.appendChild(itemNumber);

            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.name = 'gereksinim[]';
            newInput.classList.add('gereksinim');
            gereksinimItem.appendChild(newInput);

            gereksinimlerDiv.appendChild(gereksinimItem);

        } else {
            
        }
    });
}

function parseJwt(token) {
    if (token === null) {
        return false;
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


function postDatas(){
    document.getElementById('submitBtn').addEventListener('click', function() {
        var errorMsg = document.getElementById('errorMsg');
        var username = parseJwt(localStorage.getItem('token')).sub;
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
        var jobData = {
            username: username,
            title: title,
            description: description,
            contact: contact,
            requirements: requirements.map(field => field.value)
        };
        fetch('http://localhost:8080/v1/job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                swal.fire({
                    title: 'Başarılı!',
                    text: data.resultMessage,
                    icon: 'success',
                    confirmButtonText: 'Kapat'
                })
                .then(function () {
                    window.location.href = 'is_ilani_index.html';
                })
            }
            else{
                errorMsg.textContent = "";
                errorMsg.textContent = data.resultMessage
            }
        })
    });
}



document.addEventListener('DOMContentLoaded', function() {
    reqFunc();
    postDatas();
});
