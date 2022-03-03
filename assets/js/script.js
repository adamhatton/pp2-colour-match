let levelText = document.getElementsByClassName('level')[0];
let scoreText = document.getElementsByClassName('level')[1];
let level = 0;
let gameSequence = [];
let gameSequenceStep = 0;
let gameButtons = document.getElementsByClassName('game-tile');
let navButtons = document.getElementsByClassName('btn');
let buttonsActive = true;
let menu = document.getElementById('menu');
const onTimeouts = {};
const offTimeouts = {};
let buttonsActiveTimeout;

document.addEventListener('DOMContentLoaded', function () {

    //Show game area, hide menu and set up game area elements
    let playBtn = document.getElementById('play-btn');
    playBtn.addEventListener('click', function () {
        document.getElementsByClassName('game-area')[0].style.display = 'flex';
        menu.style.display = 'none';

        for (let button of gameButtons){
            button.style.opacity = 0.5;
        }

        buttonsActive = true;
        updateLevelText();

    })

    //Hide game area and show menu
    let menuBtn = document.getElementById('menu-btn');
    menuBtn.addEventListener('click', function () {
        document.getElementsByClassName('game-area')[0].style.display = 'none';
        menu.style.display = 'flex';

        //Clear timeouts that are set on the sequence animation
        for (let i in onTimeouts) {
            clearTimeout(onTimeouts[i]);
        }

        for (let i in offTimeouts) {
            clearTimeout(offTimeouts[i]);
        }

        clearTimeout(buttonsActiveTimeout);
        gameSequence = [];
        level = 0;
    })

    //Show rules modal
    let rulesBtn = document.getElementById('rules-btn');
    rulesBtn.addEventListener('click', function () {
        document.getElementsByClassName('modal')[0].style.display = 'flex';
    })

    //Hide rules modal
    let closeBtn = document.getElementsByClassName('close-btn')[0];
    closeBtn.addEventListener('click', function () {
        document.getElementsByClassName('modal')[0].style.display = 'none';
    })

    //Add start game event listener to start button
    let startBtn = document.getElementById('start-btn');

    startBtn.addEventListener('click', function () {
        if (buttonsActive) {
            startGame();
        }
    })

    //Add event listeners to animate coloured buttons
    for (button of gameButtons) {     
        addGameButtonListeners(button);
    }

    //Add event listeners to animate navigation buttons
    for (button of navButtons) {     
        addNavButtonListeners(button);
    }

    //Add eventlisteners to logo
    addLogoListeners();

})

/**
 * Starts the game by disabling buttons, generating a random colour array and then 
 * displaying the array as a sequence to the player
 */
function startGame() {
    level = 1;
    updateLevelText();
    gameSequence = [];
    gameSequenceStep = 0;
    addRandomColour();
    console.log(gameSequence);
    showSequence();
}

/**
 * Generates a random number, converts it to a colour name string and adds it to the gameSequence array
 */
function addRandomColour() {
    let colour;
    let colourNumber = Math.ceil(Math.random() * 4);

    switch (colourNumber) {
        case 1:
            colour = 'red';
            break;
        case 2:
            colour = 'green';
            break;
        case 3:
            colour = 'blue';
            break;
        case 4:
            colour = 'yellow';
            break;
    }
    gameSequence.push(colour);
}

/**
 * Shows the sequence by looping through each element in gameSequence array and increasing
 * then decreasing the opacity on a timer
 */
function showSequence() {
    buttonsActive = false;

    let i = 1;

    for (let colour of gameSequence) {
        onTimeouts["timeout" + i] = setTimeout(function () {
            document.getElementById(`${colour}-btn`).style.opacity = 1;
            document.getElementById(`${colour}-sound`).play();
        }, 500 * i);
        offTimeouts["timeout" + i] = setTimeout(function () {
            document.getElementById(`${colour}-btn`).style.opacity = 0.5;
        }, ((500 * i) + 350));
        i++;
    }

    buttonsActiveTimeout = setTimeout(function () {
        buttonsActive = true;
    }, ((500 * i) + 10));
}

function addGameButtonListeners(button) {

    button.addEventListener('mousedown', function (){
        targettedButton = this;
        console.log(targettedButton);

        if(buttonsActive) {
            button.style.opacity = 1;
            document.getElementById(`${button.getAttribute('data-colour')}-sound`).play();
        }
    })

    button.addEventListener('mouseup', function (){
        if(buttonsActive) {
            button.style.opacity = 0.5;
        }
    })

    button.addEventListener('mouseleave', function (){
        if(buttonsActive) {
            button.style.opacity = 0.5;
        }
    })

    button.addEventListener('touchstart', function (){
        if(buttonsActive) {
            button.style.opacity = 1;
        }
    })

    button.addEventListener('touchend', function (){
        if(buttonsActive) {
            button.style.opacity = 0.5;
        }
    })

    button.addEventListener('click', checkPlayerInput);

}

function addNavButtonListeners(button){

    button.addEventListener('mousedown', function () {
        if (buttonsActive) {
            button.style.transform = "scale(0.9,0.9)";
        }
    })

    button.addEventListener('mouseup', function () {
        if (buttonsActive) {
            button.style.transform = "scale(1,1)";
        }
    })

    button.addEventListener('mouseleave', function () {
        if (buttonsActive) {
            button.style.transform = "scale(1,1)";
        }
    })

    button.addEventListener('touchstart', function (){
        if(buttonsActive) {
            button.style.transform = "scale(0.9,0.9)";
            button.style.color = "#f5f5f5";
            button.style.borderColor = "#f5f5f5";
            button.style.backgroundColor = "#000";
        }
    })

    button.addEventListener('touchend', function (){
        if(buttonsActive) {
            button.style.transform = "scale(1,1)";
            button.style.color = "#000";
            button.style.borderColor = "#000";
            button.style.backgroundColor = "#f5f5f5";
        }
    })

}

function checkPlayerInput() {

    if(buttonsActive && gameSequence.length > 0) {

        if(this.getAttribute('data-colour') === gameSequence[gameSequenceStep]) {
                       
            if (gameSequenceStep === gameSequence.length - 1) {
                nextLevel();
                return;
            }
        
        gameSequenceStep++; 

        } else {
            gameOver();
        }
    }
}

function nextLevel() {
    level++;
    updateLevelText();
    gameSequenceStep = 0;
    addRandomColour();
    showSequence();
}

function updateLevelText(){
    levelText.innerHTML = level;
    scoreText.innerHTML = level - 1;
}

function gameOver() {
        let gameOverMessages = [
            'Combo breaker!',
            'Do it again...but better!',
            'Try again!',
            'The secret is to press the right colour!',
            'Have you tried pressing the Color Match logo?'
        ]

        //Show game over modal
        let gameOverModal = document.getElementsByClassName('modal')[1];
        gameOverModal.style.display = 'flex';

        let gameOverMessage = document.getElementById('game-over-message');
        gameOverMessage.innerHTML = gameOverMessages[Math.floor(Math.random() * 5)]
    
        //Hide rules modal
        let closeBtn = document.getElementsByClassName('close-btn')[1];
        closeBtn.addEventListener('click', function () {
            gameOverModal.style.display = 'none';
        })
    
}

function addLogoListeners() {
    let logo = document.getElementById('game-title');
    logo.addEventListener('click', logoColourSwitch);
    logo.addEventListener('touchend', logoColourSwitch);
}

function logoColourSwitch() {
    let colours = ['#FF0002', '#00DE3E', '#0000FF', '#FFD400'];
    let logoLetters = document.getElementsByClassName('game-title-letter');

    for (let letter of logoLetters) {
        letter.style.color = colours[Math.floor(Math.random() * 4)];
    }
}