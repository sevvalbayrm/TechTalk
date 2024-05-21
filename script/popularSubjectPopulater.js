

function getPopularSubjects() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/v1/subject/popular', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            var populerKonularListesi = document.getElementById('populerKonularListesi');
            console.log(response)
            if (xhr.status === 200) {
                response.forEach(konu => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = "http://localhost:8081/konu_sayfası.html?id="+konu.id;
                    link.textContent = konu.topic;
                    listItem.appendChild(link);
                    populerKonularListesi.appendChild(listItem);
                  });
            } else {
                
            }
        }
    };
    xhr.send();
};
document.addEventListener('DOMContentLoaded', function() {
    getPopularSubjects();
    

});