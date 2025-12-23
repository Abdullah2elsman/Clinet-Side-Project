var randomNumber = Math.floor(Math.random() * 100) + 1;
var attempts = 0;

function checkGuess() {
    var userGuess = document.getElementById("userGuess").value;
    var message = document.getElementById("message");

    if (userGuess === "") {
        message.textContent = "Please enter a number!";
        message.style.color = "red";
        return;
    }

    attempts++;

    if (parseInt(userGuess) === randomNumber) {
        message.textContent = "Correct! You guessed it in " + attempts + " tries 🎉";
        message.style.color = "green";
    } 
    else if (parseInt(userGuess) > randomNumber) {
        message.textContent = "Too high! Try again.";
        message.style.color = "orange";
    } 
    else {
        message.textContent = "Too low! Try again.";
        message.style.color = "orange";
    }
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById("userGuess").value = "";
    document.getElementById("message").textContent = "";
}
