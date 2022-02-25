document.addEventListener('DOMContentLoaded', function() {

    let playBtn = document.getElementById('play-btn');
    playBtn.addEventListener('click', function(){
        document.getElementsByClassName('game-area')[0].style.display = 'flex';
        document.getElementById('menu').style.display = 'none';
    })
    
    
    //Show rules modal
    let rulesBtn = document.getElementById('rules-btn');
    rulesBtn.addEventListener('click', function() {
        document.getElementsByClassName('rules-modal')[0].style.display = 'flex';
    })

    //Hide rules modal
    let closeBtn = document.getElementsByClassName('close-btn')[0];
    closeBtn.addEventListener('click', function() {
        document.getElementsByClassName('rules-modal')[0].style.display = 'none';
    })

})

