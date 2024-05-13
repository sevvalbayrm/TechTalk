function includeSubjectList() {
    fetch('konular.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('subjectList-placeholder').innerHTML = data;            
        })
        .catch(error => {
            console.error('Error fetching navbar:', error);
        });
}

document.addEventListener("DOMContentLoaded",function() {
    includeSubjectList(); 
    
    
});