const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".choice");
const result = document.getElementById("result");
const playerHand = document.getElementById("playerHand");
const computerHand = document.getElementById("computerHand");
const resetBtn = document.getElementById("reset");
const themeToggle = document.getElementById("themeToggle");

const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const playerChoice = btn.classList[1];
        const computerChoice = choices[Math.floor(Math.random() * 3)];

        playerHand.textContent = emojis[playerChoice];
        computerHand.textContent = emojis[computerChoice];

        if (playerChoice === computerChoice) {
            result.textContent = "It's a Draw 🤝";
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            result.textContent = "YOU WON! 🎉";
        } else {
            result.textContent = "COMPUTER WON! 💥";
        }
    });
});

resetBtn.addEventListener("click", () => {
    result.textContent = "Choose your move";
    playerHand.textContent = "✊";
    computerHand.textContent = "✊";
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
