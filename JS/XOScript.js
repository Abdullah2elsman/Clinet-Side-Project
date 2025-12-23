const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const popup = document.getElementById("popup");
const board = document.getElementById("board");


const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");

let currentPlayer = "X";
let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];




const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];



function validateName(name) {
    const nameReg = /^[a-zA-Z\s]{2,}$/;
    return nameReg.test(name.trim());
}

function checkNames() {
    const nameX = playerXInput.value.trim();
    const nameO = playerOInput.value.trim();

    playerXInput.classList.remove("invalid", "valid");
    playerOInput.classList.remove("invalid", "valid");
    errorX.style.display = "none";
    errorO.style.display = "none";

    const xValid = validateName(nameX);
    const oValid = validateName(nameO);

    if (nameX) {
        if (xValid) {
            playerXInput.classList.add("valid");
        } else {
            playerXInput.classList.add("invalid");
            errorX.style.display = "block";
        }
    }

    if (nameO) {
        if (oValid) {
            playerOInput.classList.add("valid");
        } else {
            playerOInput.classList.add("invalid");
            errorO.style.display = "block";
        }
    }

   
    if (xValid && oValid && nameX !== "" && nameO !== "") {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
}

playerXInput.addEventListener("input", checkNames);
playerOInput.addEventListener("input", checkNames);


const startBtn = document.getElementById("Start");
startBtn.addEventListener("click", () => {
    popup.style.display = "none";
    board.style.display = "grid";
    restartBtn.style.display = "inline-block";
    gameActive = true;
    updateStatus();
});


cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;

        if (!gameActive || gameState[index] !== "") return;

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) return;

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
    });
});


function updateStatus() {
    const name = currentPlayer === "X"
        ? playerXInput.value
        : playerOInput.value;

    statusText.innerHTML = `<span class="playerName">${name}</span>'s turn`;
}

function checkWinner() {
    const winnerModal = document.getElementById("winner");
    const winnerText = document.getElementById("text");
    const heading = document.getElementById("heading");

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            const winnerName = gameState[a] === "X" ? playerXInput.value : playerOInput.value;

            heading.textContent = `${winnerName} Wins!`;
            winnerText.textContent = `${winnerName} played brilliantly.`;
            winnerModal.style.display = "flex";

            gameActive = false;
            return true;
        }
    }

    if (!gameState.includes("")) {

        heading.textContent = "It's a Draw!";
        winnerText.textContent = "Good game! Want to try again?";
        winnerModal.style.display = "flex";
        gameActive = false;
        return true;
    }

    return false;
}


const restartBtn = document.getElementById("Restart");
restartBtn.addEventListener("click", () => {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
    });
    currentPlayer = "X";
    gameActive = false;


    popup.style.display = "flex";
    board.style.display = "none";
    restartBtn.style.display = "none";


    playerXInput.value = "";
    playerOInput.value = "";
    startBtn.disabled = true;

});


const playAgainBtn = document.getElementById("playAgain");
playAgainBtn.addEventListener("click", () => {
    winner.style.display = "none";
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
    });
    currentPlayer = "X";
    gameActive = true;
    board.style.display = "grid";
    restartBtn.style.display = "inline-block";
    updateStatus();
});