let levelText = document.getElementById('level');
let level = 0;
let gameSequence = [];
let gameSequenceStep = 0;
let playerSequence = [];
let gameButtons = document.getElementsByClassName('game-tile');
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
    })

    //Show rules modal
    let rulesBtn = document.getElementById('rules-btn');
    rulesBtn.addEventListener('click', function () {
        document.getElementsByClassName('rules-modal')[0].style.display = 'flex';
    })

    //Hide rules modal
    let closeBtn = document.getElementsByClassName('close-btn')[0];
    closeBtn.addEventListener('click', function () {
        document.getElementsByClassName('rules-modal')[0].style.display = 'none';
    })

    //Start new game
    let startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', function () {
        if (buttonsActive) {
            startGame();
        }
    })

    //Add mousedown, mouseup, mouseleave and click event listeners to coloured buttons
    for (button of gameButtons) {     
        addButtonListeners(button);
    }

})

/**
 * Starts the game by disabling buttons, generating a random colour array and then 
 * displaying the array as a sequence to the player
 */
function startGame() {
    buttonsActive = false;
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
    let i = 1;

    for (let colour of gameSequence) {
        onTimeouts["timeout" + i] = setTimeout(function () {
            document.getElementById(`${colour}-btn`).style.opacity = 1;
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

function addButtonListeners(button) {

    button.addEventListener('mousedown', function (){
        if(buttonsActive && playerSequence.length <= gameSequence.length) {
            button.style.opacity = 1;
        }
    })

    button.addEventListener('mouseup', function (){
        if(buttonsActive && playerSequence.length <= gameSequence.length) {
            button.style.opacity = 0.5;
        }
    })

    button.addEventListener('mouseleave', function (){
        if(buttonsActive && playerSequence.length <= gameSequence.length) {
            button.style.opacity = 0.5;
        }
    })

    button.addEventListener('touchstart', function (){
        if(buttonsActive && playerSequence.length <= gameSequence.length) {
            button.style.opacity = 1;
        }
    })

    button.addEventListener('touchend', function (){
        if(buttonsActive && playerSequence.length <= gameSequence.length) {
            button.style.opacity = 0.5;
        }
    })

    button.addEventListener('click', checkPlayerInput);

}

function checkPlayerInput() {

    if(buttonsActive) {

        if(this.getAttribute('data-colour') === gameSequence[gameSequenceStep]) {
            
            alert("it's working" + this.getAttribute('data-colour'));
            
            if (gameSequenceStep === gameSequence.length - 1) {
                nextLevel();
                return;
            }
        
        gameSequenceStep++; 

        } else {
            alert("wrong");
        }
    }
}

function nextLevel() {
    level++;
    gameSequenceStep = 0;
    addRandomColour();
    showSequence();
}

function updateLevelText(){
    levelText.innerHTML = level;
}