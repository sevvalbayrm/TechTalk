function includeJobList() {
    fetch('is_ilani_tablo.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('jobList-placeholder').innerHTML = data;            
        })
        .catch(error => {
            console.error('Error fetching navbar:', error);
        });
}

document.addEventListener("DOMContentLoaded",function() {
    includeJobList(); 
    
    
});