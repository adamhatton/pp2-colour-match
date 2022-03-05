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
const redSound1 = new Audio('assets/sounds/red-sound.mp3');
const redSound2 = new Audio('assets/sounds/red-sound.mp3');
const greenSound1 = new Audio('assets/sounds/green-sound.mp3');
const greenSound2 = new Audio('assets/sounds/green-sound.mp3');
const blueSound1 = new Audio('assets/sounds/blue-sound.mp3');
const blueSound2 = new Audio('assets/sounds/blue-sound.mp3');
const yellowSound1 = new Audio('assets/sounds/yellow-sound.mp3');
const yellowSound2 = new Audio('assets/sounds/yellow-sound.mp3');
const sounds = [
    redSound1,
    redSound2,
    greenSound1,
    greenSound2,
    blueSound1,
    blueSound2,
    yellowSound1,
    yellowSound2
];
let sound1, sound2;

document.addEventListener('DOMContentLoaded', function () {

    //Add listener to play-tile to show game area, hide menu and set up game area elements
    let playBtn = document.getElementById('play-btn');
    playBtn.addEventListener('click', function () {
        document.getElementsByClassName('game-area')[0].style.display = 'flex';
        menu.style.display = 'none';

        for (let button of gameButtons){
            button.style.opacity = 0.5;
        }

        buttonsActive = true;
        updateLevelText();
    });

    //Add listener to menu button to hide game area, show menu and reset level data
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
    });

    //Add listener to rules tile to show rules modal
    let rulesBtn = document.getElementById('rules-btn');
    rulesBtn.addEventListener('click', function () {
        document.getElementsByClassName('modal')[0].style.display = 'flex';
    });

    //Add listener to rules modal close button to hide rules modal
    let closeBtn = document.getElementsByClassName('close-btn')[0];
    closeBtn.addEventListener('click', function () {
        document.getElementsByClassName('modal')[0].style.display = 'none';
    });

    //Add listener to start-button to start game
    let startBtn = document.getElementById('start-btn');

    startBtn.addEventListener('click', function () {
        if (buttonsActive) {
            startGame();
        }
    });

    //Add event listeners to animate colour buttons
    for (let button of gameButtons) {     
        addGameButtonListeners(button);
    }

    //Add event listeners to animate navigation buttons
    for (let button of navButtons) {     
        addNavButtonListeners(button);
    }

    //Add eventlisteners to logo
    addLogoListeners();
});

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
            //document.getElementById(`${colour}-sound`).play();
            if (colour === 'red') {
                sound1 = sounds[0];
                sound2 = sounds[1];
            } else if (colour === 'green') {
                sound1 = sounds[2];
                sound2 = sounds[3];
            } else if (colour === 'blue') {
                sound1 = sounds[4];
                sound2 = sounds[5];
            } else if (colour === 'yellow') {
                sound1 = sounds[6];
                sound2 = sounds[7];
            }

            if (sound1.paused && sound2.paused) {
                sound1.play();
            } else if (!sound1.paused && sound2.paused) {
                sound1.pause();  
                sound1.currentTime = 0;              
                sound2.play();
            } else if (sound1.paused && !sound2.paused) {
                sound2.pause();
                sound2.currentTime = 0;    
                sound1.play();            
            }
        }, 500 * i);
        offTimeouts["timeout" + i] = setTimeout(function () {
            document.getElementById(`${colour}-btn`).style.opacity = 0.5;
        }, ((500 * i) + 350));
        i++;
    }

    //Set buttons to active after animation has finished
    buttonsActiveTimeout = setTimeout(function () {
        buttonsActive = true;
    }, (500 * i));
}

/**
 * Adds event listeners to all the game buttons for animating clicks and playing sound 
 */
function addGameButtonListeners(button) {

    button.addEventListener('mousedown', function (){
        if(buttonsActive) {
            button.style.opacity = 1;

            if (button.getAttribute('data-colour') === 'red') {
                sound1 = sounds[0];
                sound2 = sounds[1];
            } else if (button.getAttribute('data-colour') === 'green') {
                sound1 = sounds[2];
                sound2 = sounds[3];
            } else if (button.getAttribute('data-colour') === 'blue') {
                sound1 = sounds[4];
                sound2 = sounds[5];
            } else if (button.getAttribute('data-colour') === 'yellow') {
                sound1 = sounds[6];
                sound2 = sounds[7];
            }

            if (sound1.paused && sound2.paused) {
                sound1.play();
            } else if (!sound1.paused && sound2.paused) {
                sound1.pause();  
                sound1.currentTime = 0;              
                sound2.play();
            } else if (sound1.paused && !sound2.paused) {
                sound2.pause();
                sound2.currentTime = 0;    
                sound1.play();            
            }
        }
    });

    button.addEventListener('mouseleave', function (){
        if(buttonsActive) {
            button.style.opacity = 0.5;
        }
    });

    button.addEventListener('touchstart', function (e){
        if(buttonsActive) {
            e.preventDefault();
            button.style.opacity = 1;
            document.getElementById(`${button.getAttribute('data-colour')}-sound`).play();
        }
    });

    button.addEventListener('touchend', checkPlayerInput);

    button.addEventListener('click', checkPlayerInput);
}

/**
 * Add event listeners to navigation buttons to animate them on clicks 
 */
function addNavButtonListeners(button){

    button.addEventListener('mousedown', function () {
        if (buttonsActive) {
            button.style.transform = "scale(0.9,0.9)";
        }
    });

    button.addEventListener('mouseup', function () {
        if (buttonsActive) {
            button.style.transform = "scale(1,1)";
        }
    });

    button.addEventListener('mouseleave', function () {
        if (buttonsActive) {
            button.style.transform = "scale(1,1)";
        }
    });

    button.addEventListener('touchstart', function (){
        if(buttonsActive) {
            button.style.transform = "scale(0.9,0.9)";
            button.style.color = "#f5f5f5";
            button.style.borderColor = "#f5f5f5";
            button.style.backgroundColor = "#000";
        }
    });

    button.addEventListener('touchend', function (){
        if(buttonsActive) {
            button.style.transform = "scale(1,1)";
            button.style.color = "#000";
            button.style.borderColor = "#000";
            button.style.backgroundColor = "#f5f5f5";
        }
    });
}

/**
 * Checks that player input matches the colour array as long as
 * buttons are active and there is at least 1 entry in the array.
 */
function checkPlayerInput() {

    if (buttonsActive) {
        this.style.opacity = 0.5;
    }

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

/**
 * Sets up next level by updating variables and adding another colour to the array
 */
function nextLevel() {
    level++;
    updateLevelText();
    gameSequenceStep = 0;
    addRandomColour();
    showSequence();
}

/**
 * Sets the players score on both the game screen and game over screen
 */
function updateLevelText(){
    levelText.innerHTML = level;
    scoreText.innerHTML = level - 1;
}

/**
 * Shows the game over modal and populates the text randomly from an array
 * of game over messages
 */
function gameOver() {

        let gameOverMessages = [
            'Combo breaker!',
            'Do it again...but better!',
            'Try again!',
            'The secret is to press the right colour!',
            'Have you tried pressing the Color Match logo?'
        ];

        //Show game over modal
        let gameOverModal = document.getElementsByClassName('modal')[1];
        gameOverModal.style.display = 'flex';

        let gameOverMessage = document.getElementById('game-over-message');
        gameOverMessage.innerHTML = gameOverMessages[Math.floor(Math.random() * 5)];
    
        //Add listener to game over modal close button that closes the modal
        let closeBtn = document.getElementsByClassName('close-btn')[1];
        closeBtn.addEventListener('click', function () {
            gameOverModal.style.display = 'none';
        });

        gameSequence = [];  
}

/**
 * Adds listeners to the logo
 */
function addLogoListeners() {
    let logo = document.getElementById('game-title');
    logo.addEventListener('click', logoColourSwitch);
    logo.addEventListener('touchend', logoColourSwitch);
}

/**
 * Changes the colour of the letters in the logo when clicked
 */
function logoColourSwitch() {
    let colours = ['#FF0002', '#00DE3E', '#0000FF', '#FFD400'];
    let logoLetters = document.getElementsByClassName('game-title-letter');

    for (let letter of logoLetters) {
        letter.style.color = colours[Math.floor(Math.random() * 4)];
    }
}