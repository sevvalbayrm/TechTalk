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
                console.log(item)
                const newItem = document.createElement("div");
                newItem.classList.add("item");
                const createdDate = new Date(item.createdDate).toLocaleDateString('tr-TR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
                newItem.innerHTML = `
                    <div class="title"><a href=localhost:8081/is_ilani?id=${item.id}>${item.description}</a></div>       
                    <div class="job">${item.contactEmail}</div>
                    <div class="company">${item.username}</div>
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