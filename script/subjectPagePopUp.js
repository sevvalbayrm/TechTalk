function openEditPopup() {
    const popup = document.getElementById("editPopup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.classList.add("show");
    }, 10); 
}

function closeEditPopup() {
    const popup = document.getElementById("editPopup");
    popup.classList.remove("show");

    setTimeout(() => {
        if (!popup.classList.contains("show")) {
            popup.style.display = "none";
        }
    }, 500); 
}

window.onclick = function(event) {
    const modal = document.getElementById("editPopup");
    if (event.target == modal) {
        closeEditPopup();
    }
}
