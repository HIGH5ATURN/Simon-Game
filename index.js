var colors = [
    "green",
    "red",
    "yellow",
    "blue",
];

var pressedButtons = [];
let gameStarted = false;
let level = 1;
var sequences = [];

function animation(keyID) {
    document.getElementById(keyID).classList.add("pressed");
    setTimeout(() => { document.getElementById(keyID).classList.remove("pressed"); }, 100);
}

// Set up event listeners for each button to track player's input
for (var i = 0; i < colors.length; i++) {
    document.getElementById(colors[i]).addEventListener("click", function () {
        let key = this.id;
        pressedButtons.push(key);
        var audio = new Audio("./sounds/" + key + ".mp3");
        animation(key);
        audio.play();
        
        checkSequence(); // Check sequence after each press
    });
}

async function checkSequence() {
    let correctSoFar = true;
    for (let i = 0; i < pressedButtons.length; i++) {
        if (pressedButtons[i] !== sequences[i]) {
            correctSoFar = false;
            break;
        }
    }

    if (!correctSoFar) {
        // Game failed: reset level and sequence, and show failure message
        level = 1;
        pressedButtons = [];
        document.querySelector("h1").innerHTML = "Game Over! Click to Restart.";
        await new Promise(resolve => setTimeout(resolve, 100));
        document.addEventListener("click", startGame); // Allow restart on click
    } else if (pressedButtons.length === sequences.length) {
        // Sequence completed correctly: increase level
        level++;
        pressedButtons = [];
        setTimeout(startNextLevel, 1000); // Proceed to next level with a delay
    }
}

function startNextLevel() {
    document.querySelector("h1").innerHTML = "LEVEL " + level;
    generateSequence(level);
    showSequence();
}

function generateSequence(level) {
    sequences = [];
    for (var i = 0; i < level; i++) {
        const randomNumber = Math.floor(Math.random() * colors.length);
        sequences.push(colors[randomNumber]);
    }
}

async function showSequence() {
    for (let i = 0; i < sequences.length; i++) {
        animation(sequences[i]);
        var audio = new Audio("./sounds/" + sequences[i] + ".mp3");
        audio.play();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

document.addEventListener("click", startGame);

 function startGame() {
    
    gameStarted = true;
    level = 1;
    pressedButtons = [];
    document.querySelector("h1").innerHTML = "LEVEL " + level;
    generateSequence(level);
    showSequence();
    document.removeEventListener("click", startGame); // Remove click event for ongoing game
}
