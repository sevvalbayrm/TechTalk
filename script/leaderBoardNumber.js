document.addEventListener("DOMContentLoaded", function() {
   
    const items = document.querySelectorAll(".block-body .item");

    for (let i = 3; i < items.length; i++) {
        
        const listNumber = items[i].querySelector(".list_number p");

        listNumber.textContent = i + 1;
    }
});
