function getJobs(){
    fetch('http://localhost:8080/v1/job', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (!Object.is(data, null)) {
            const blockBody = document.getElementById("blockBodyDiv");
            data.forEach(item => {
                const newItem = document.createElement("div");
                newItem.classList.add("item");
                const createdDate = new Date(item.createdDate).toLocaleDateString('tr-TR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
                if(item.description.length > 15){
                    item.description = item.description.substring(0, 15) + '...';
                }
                newItem.innerHTML = `
                    <div class="title"><a href=/is_ilani_sayfasi.html?id=${item.id}>${item.title}</a></div>       
                    <div class="job">${item.contactEmail}</div>
                    <div class="company"><a href=http://localhost:8081/profil.html?username=${item.username}>${item.username}</div>
                    <!-- <div class="createdDate">${createdDate}</div> -->
                `;
                blockBody.appendChild(newItem);

            });
        }
    })
}


document.addEventListener("DOMContentLoaded", function() {
    getJobs();

})