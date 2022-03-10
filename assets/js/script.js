const highScoreText = document.getElementsByClassName('level')[1];
const menu = document.getElementById('menu');
const onTimeouts = {};
const offTimeouts = {};
const redSound1 = new Audio('assets/sounds/red-sound.ogg');
const redSound2 = new Audio('assets/sounds/red-sound.ogg');
const greenSound1 = new Audio('assets/sounds/green-sound.ogg');
const greenSound2 = new Audio('assets/sounds/green-sound.ogg');
const blueSound1 = new Audio('assets/sounds/blue-sound.ogg');
const blueSound2 = new Audio('assets/sounds/blue-sound.ogg');
const yellowSound1 = new Audio('assets/sounds/yellow-sound.ogg');
const yellowSound2 = new Audio('assets/sounds/yellow-sound.ogg');
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
let mainSound, cycleSound;
let gameSequence = [];
let level = 0;
let highScore = 0;
let gameSequenceStep = 0;
let buttonsActive = true;
let buttonsActiveTimeout;

document.addEventListener('DOMContentLoaded', function () {

    //Add listener to play-tile to show game area, hide menu and set up game area elements
    const playBtn = document.getElementById('play-btn');
    playBtn.addEventListener('click', function () {
        showArea(document.getElementsByClassName('game-area')[0]);
        hideArea(menu);

        for (let button of gameButtons){
            button.style.opacity = 0.5;
        }

        buttonsActive = true;
        updateLevelText();
    });

    //Add listener to menu button to hide game area, show menu and reset level data
    const menuBtn = document.getElementById('menu-btn');
    menuBtn.addEventListener('click', function () {
        hideArea(document.getElementsByClassName('game-area')[0]);
        showArea(menu);

        //Clear timeouts that are set on the sequence animation
        for (let i in onTimeouts) {
            if (onTimeouts.hasOwnProperty(i)) {
                clearTimeout(onTimeouts[i]);
            }
        }

        for (let i in offTimeouts) {
            if (offTimeouts.hasOwnProperty(i)) {
                clearTimeout(offTimeouts[i]);
            }
        }

        clearTimeout(buttonsActiveTimeout);
        gameSequence = [];
        level = 0;
    });

    //Add listener to rules tile to show rules modal
    const rulesBtn = document.getElementById('rules-btn');
    rulesBtn.addEventListener('click', function () {
        showArea(document.getElementById('rules'));
    });

    //Add listener to rules modal close button to hide rules modal
    const rulesCloseBtn = document.getElementsByClassName('close-btn')[0];
    rulesCloseBtn.addEventListener('click', function () {
        hideArea(document.getElementById('rules'));
    });

    //Add listener to high-score tile to show high score modal
    const highScoreBtn = document.getElementById('high-score-btn');
    highScoreBtn.addEventListener('click', function () {
        showArea(document.getElementById('high-score'));
    });

    //Add listener to high-score modal close button to hide high score modal
    const highScoreCloseBtn = document.getElementsByClassName('close-btn')[1];
    highScoreCloseBtn.addEventListener('click', function () {
        hideArea(document.getElementById('high-score'));
    });

    //Add listener to about tile to show about modal
    const aboutBtn = document.getElementById('abt-btn');
    aboutBtn.addEventListener('click', function () {
        showArea(document.getElementById('about'));
    });

    //Add listener to about modal close button to hide about modal
    const aboutCloseBtn = document.getElementsByClassName('close-btn')[3];
    aboutCloseBtn.addEventListener('click', function () {
        hideArea(document.getElementById('about'));
    });

    //Add listener to start-button to start game
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', function () {
        if (buttonsActive) {
            startGame();
        }
    });

    //Add event listeners to animate colour buttons
    const gameButtons = document.getElementsByClassName('game-tile');
    for (let button of gameButtons) {     
        addGameButtonListeners(button);
    }

    //Add event listeners to animate navigation buttons
    const navButtons = document.getElementsByClassName('btn');
    for (let button of navButtons) {     
        addNavButtonListeners(button);
    }

    //Add eventlisteners to logo
    addLogoListeners();

    //Set high score text
    highScoreText.innerHTML = highScore;
});

/**
 * Starts the game by calling addRandomColour and showSequence
 */
function startGame() {
    level = 1;
    updateLevelText();
    gameSequence = [];
    gameSequenceStep = 0;
    addRandomColour();
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
 * Disable buttons then shows the sequence by looping through each element in
 * gameSequence array and increasing then decreasing the opacity on a timer 
 * whilst also playing a sound
 */
function showSequence() {
    buttonsActive = false;

    let i = 1;

    for (let colour of gameSequence) {
        /* Solution for adding each timeOut() function to a global variable so that they can be cleared
        was provided by Code Institute Tutor Support */
        onTimeouts["timeout" + i] = setTimeout(function () {
            document.getElementById(`${colour}-btn`).style.opacity = 1;
            playSound(colour);
        }, 500 * i);
        offTimeouts["timeout" + i] = setTimeout(function () {
            document.getElementById(`${colour}-btn`).style.opacity = 0.5;
        }, ((500 * i) + 350));
        i++;
    }

    //Set buttons to active after animation has finished
    buttonsActiveTimeout = setTimeout(function () {
        buttonsActive = true;
    }, (500 * i) - 100);
}

/**
 * Adds event listeners to all the game buttons for animating clicks and playing sound 
 */
function addGameButtonListeners(button) {

    button.addEventListener('mousedown', function (){
        if(buttonsActive) {
            button.style.opacity = 1;
            playSound(button.getAttribute('data-colour'));
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
            playSound(button.getAttribute('data-colour'));
            button.style.opacity = 1;
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
function updateLevelText() {
    const levelText = document.getElementsByClassName('level')[0];
    const scoreText = document.getElementsByClassName('level')[2];
    levelText.innerHTML = level;
    scoreText.innerHTML = level - 1;
}

/**
 * Shows the game over modal and populates the text randomly from an array
 * of game over messages
 */
function gameOver() {

        const gameOverMessages = [
            'Combo breaker!',
            'Do it again...but better!',
            'Try again!',
            'The secret is to press the right colour!',
            'Have you tried pressing the Color Match logo?'
        ];

        //Add random message from gameOverMessages to content gameOverModal
        const gameOverMessage = document.getElementById('game-over-message');
        gameOverMessage.innerHTML = gameOverMessages[Math.floor(Math.random() * 5)];

        //Show game over modal
        const gameOverModal = document.getElementById('game-over');
        showArea(gameOverModal);
    
        //Add listener to game over modal close-button that closes the modal
        const closeBtn = document.getElementsByClassName('close-btn')[2];
        closeBtn.addEventListener('click', function () {
            hideArea(gameOverModal);
        });

        setHighScore();

        gameSequence = [];  
}

/**
 * Adds listeners to the logo
 */
function addLogoListeners() {
    const logo = document.getElementById('game-title');
    logo.addEventListener('click', logoColourSwitch);
    logo.addEventListener('touchend', logoColourSwitch);
}

/**
 * Changes the colour of the letters in the logo when clicked
 */
function logoColourSwitch() {
    const colours = ['#FF0002', '#00DE3E', '#0000FF', '#FFD400'];
    const logoLetters = document.getElementsByClassName('game-title-letter');

    for (let letter of logoLetters) {
        letter.style.color = colours[Math.floor(Math.random() * 4)];
    }
}

/**
 * Plays sound depending on colour of button. Each colour has 2 identical sounds
 * assigned which are stopped and started accordingly to allow a sound on every click.
 */
function playSound(button) {
    if (button === 'red') {
        mainSound = sounds[0];
        cycleSound = sounds[1];
    } else if (button === 'green') {
        mainSound = sounds[2];
        cycleSound = sounds[3];
    } else if (button === 'blue') {
        mainSound = sounds[4];
        cycleSound = sounds[5];
    } else if (button === 'yellow') {
        mainSound = sounds[6];
        cycleSound = sounds[7];
    }

    if (mainSound.paused && cycleSound.paused) {
        mainSound.play();
    } else if (!mainSound.paused && cycleSound.paused) {
        mainSound.pause();  
        mainSound.currentTime = 0;              
        cycleSound.play();
    } else if (mainSound.paused && !cycleSound.paused) {
        cycleSound.pause();
        cycleSound.currentTime = 0;    
        mainSound.play();            
    }
}

/**
 * Sets the given element to be visible 
 */
function showArea(area) {
    area.style.display = 'flex';
}

/**
 * Sets the given element to be hidden 
 */
function hideArea(area) {
    area.style.display = 'none';
}

/**
 * Checks if score is higher than Highscore and updates high score text 
 */
function setHighScore() {
    if((level - 1) > highScore) {
        highScore = level - 1;
    }
    highScoreText.innerHTML = highScore;
}