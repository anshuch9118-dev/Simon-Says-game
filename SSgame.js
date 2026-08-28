const colors = ["red", "green", "blue", "yellow"];

let gameSequence = [];
let playerSequence = [];

let level = 0;
let gameStarted = false;

const buttons = document.querySelectorAll(".color");

const startButton = document.getElementById("start-btn");

const levelDisplay = document.getElementById("level");

const message = document.getElementById("message");


// Start game
startButton.addEventListener("click", startGame);


function startGame() {

    gameStarted = true;

    gameSequence = [];
    playerSequence = [];

    level = 0;

    levelDisplay.textContent = level;

    message.textContent = "Watch the sequence!";

    startButton.textContent = "Restart";

    document.body.classList.remove("game-over");

    nextRound();
}


// Start next round
function nextRound() {

    playerSequence = [];

    level++;

    levelDisplay.textContent = level;

    message.textContent = "Watch the sequence!";

    // Generate random color
    const randomColor =
        colors[Math.floor(Math.random() * colors.length)];

    gameSequence.push(randomColor);

    playSequence();
}


// Play computer sequence
async function playSequence() {

    disableButtons();

    for (const color of gameSequence) {

        await wait(500);

        flashColor(color);

        await wait(500);
    }

    message.textContent = "Your turn!";

    enableButtons();
}


// Flash a button
function flashColor(color) {

    const button = document.getElementById(color);

    button.classList.add("active");

    setTimeout(() => {

        button.classList.remove("active");

    }, 300);
}


// Handle player's click
buttons.forEach(button => {

    button.addEventListener("click", () => {

        if (!gameStarted) {
            return;
        }

        const clickedColor = button.id;

        flashColor(clickedColor);

        playerSequence.push(clickedColor);

        checkAnswer();
    });

});


// Check player's answer
function checkAnswer() {

    const currentIndex = playerSequence.length - 1;

    // Wrong answer
    if (
        playerSequence[currentIndex] !==
        gameSequence[currentIndex]
    ) {

        gameOver();

        return;
    }


    // Completed the sequence
    if (playerSequence.length === gameSequence.length) {

        message.textContent = "Correct!";

        disableButtons();

        setTimeout(() => {

            nextRound();

        }, 1000);
    }
}


// Game over
function gameOver() {

    gameStarted = false;

    disableButtons();

    document.body.classList.add("game-over");

    message.textContent =
        `Game Over! You reached level ${level}.`;

    startButton.textContent = "Play Again";
}


// Disable color buttons
function disableButtons() {

    buttons.forEach(button => {

        button.disabled = true;

    });
}


// Enable color buttons
function enableButtons() {

    buttons.forEach(button => {

        button.disabled = false;

    });
}


// Wait function
function wait(milliseconds) {

    return new Promise(resolve => {

        setTimeout(resolve, milliseconds);

    });
}
