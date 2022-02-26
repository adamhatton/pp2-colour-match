let gameSequence = [];
let gameButtons = document.getElementsByClassName('game-tile');
let buttonsActive = true;
let menu = document.getElementById('menu');
const onTimeouts = {}
const offTimeouts = {}

document.addEventListener('DOMContentLoaded', function () {

    //Show game area and hide menu
    let playBtn = document.getElementById('play-btn');
    playBtn.addEventListener('click', function () {
        document.getElementsByClassName('game-area')[0].style.display = 'flex';
        menu.style.display = 'none';

        for (let button of gameButtons){
            button.style.opacity = 0.5;
        }
    })

    //Hide game area and show menu
    let menuBtn = document.getElementById('menu-btn');
    menuBtn.addEventListener('click', function () {
        document.getElementsByClassName('game-area')[0].style.display = 'none';
        menu.style.display = 'flex';

        for (let i in onTimeouts) {
            clearTimeout(onTimeouts[i]);
        }

        for (let i in offTimeouts) {
            clearTimeout(offTimeouts[i]);
        }
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
})

/**
 * Starts the game by disabling buttons, generating a random colour array and then 
 * displaying the array as a sequence to the player
 */
function startGame() {
    // buttonsActive = false;
    gameSequence = [];
    addRandomColour();
    addRandomColour();
    addRandomColour();
    addRandomColour();
    addRandomColour();
    addRandomColour();
    addRandomColour();
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
}