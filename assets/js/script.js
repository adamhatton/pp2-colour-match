document.addEventListener('DOMContentLoaded', function() {
    let rulesBtn = document.getElementById('rules-btn');

    rulesBtn.addEventListener('click', function() {
        document.getElementsByClassName('rules-modal')[0].style.display = 'flex';
    })

    let closeBtn = document.getElementsByClassName('close-btn')[0];

    closeBtn.addEventListener('click', function() {
        document.getElementsByClassName('rules-modal')[0].style.display = 'none';
    })

})

//TODO Move open and close modal into a single function