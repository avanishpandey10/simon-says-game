let gameSeq = []; // Array to store the sequence of colors for the game
let userSeq = []; // Array to store the user's input sequence

let btns = ["yellow", "red", "purple", "green"]; // Array of possible button colors

let started = false; // Flag to check if the game has started
let level = 0; // Variable to track the current level

let h2 = document.querySelector("h2"); // Select the h2 element to display the level and game messages

// Event listener to start the game on key press
document.addEventListener("keypress", function () {
    if (!started) { // Check if the game has not started
        console.log("game started");
        started = true;
        levelUp(); // Start the game by moving to the next level
    }
});

// Function to flash the game button
function gameFlash(btn) {
    btn.classList.add("flash"); // Add the flash class to the button
    setTimeout(function () {
        btn.classList.remove("flash"); // Remove the flash class after 250ms
    }, 250);
}

// Function to flash the user button
function userFlash(btn) {
    btn.classList.add("userFlash"); // Add the userFlash class to the button
    setTimeout(function () {
        btn.classList.remove("userFlash"); // Remove the userFlash class after 250ms
    }, 250);
}

// Function to move to the next level
function levelUp() {
    userSeq = []; // Reset the user sequence
    level++; // Increase the level
    h2.innerText = `level ${level}`; // Update the level display

    // Generate a random index and corresponding color
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    // Add the random color to the game sequence
    gameSeq.push(randColor);
    console.log(gameSeq);

    // Flash the random button to show the sequence
    gameFlash(randBtn);
}

// Function to check the user's answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) { // Check if the current user's input matches the game sequence
        if (userSeq.length == gameSeq.length) { // Check if the user has completed the sequence for the level
            setTimeout(levelUp, 1000); // Move to the next level after 1 second
        }
    } else {
        // If the user's input is incorrect, end the game
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red"; // Change background color to red
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white"; // Change it back to white after 200ms
        }, 200);
        reset(); // Reset the game
    }
}

// Function to handle button presses by the user
function btnPress() {
    let btn = this; // Get the button that was clicked
    userFlash(btn); // Flash the button to show the user clicked it

    let userColor = btn.getAttribute("id"); // Get the color of the button
    console.log(userColor);
    userSeq.push(userColor); // Add the color to the user's sequence
    checkAns(userSeq.length - 1); // Check the user's answer
}

// Add event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress); // Add click event listener to each button
}

// Function to reset the game
function reset() {
    started = false; // Set the game to not started
    gameSeq = []; // Clear the game sequence
    userSeq = []; // Clear the user sequence
    level = 0; // Reset the level to 0
}
