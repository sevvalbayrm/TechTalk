document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addBtn').addEventListener('click', function() {
        const gereksinimlerDiv = document.getElementById('gereksinimler');
        const gereksinimCount = gereksinimlerDiv.getElementsByClassName('gereksinim').length;

        if (gereksinimCount < 10) {
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
            alert('En fazla 10 gereksinim ekleyebilirsiniz.');
        }
    });

    document.getElementById('submitBtn').addEventListener('click', function() {
        var fields = document.querySelectorAll('.gereksinim');
        fields.forEach(field => {
            console.log(field.value);
        });
    });
});
