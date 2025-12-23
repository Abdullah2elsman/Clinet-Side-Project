const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".input-field"),
tryAgainBtn = document.querySelector(".try-again-btn"),
timeTag = document.querySelector(".time span"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
modal = document.getElementById("results-modal"),
modalRestartBtn = document.querySelector(".modal-restart-btn"),
finalWpm = document.getElementById("final-wpm"),
finalAccuracy = document.getElementById("final-accuracy");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = 0,
mistakes = 0,
isTyping = 0;

// Random sentences for the game
const paragraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "Practice makes perfect, so keep coding every day.",
    "JavaScript is the programming language of the Web.",
    "Coding is not just about syntax, it is about solving problems.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts."
];

function loadParagraph() {
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    // Focus the input field so user can start typing immediately
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if(charIndex < characters.length && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        
        // Handle backspace
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        
        // Move active cursor
        characters.forEach(span => span.classList.remove("active"));
        if (characters[charIndex]) {
            characters[charIndex].classList.add("active");
        } else {
            // End of sentence reached before time up
            clearInterval(timer);
            showResults();
        }

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes; // CPM = Correct characters
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft + "s";
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
        showResults();
    }
}

function showResults() {
    modal.classList.remove("hidden");
    let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
    if(isNaN(wpm) || wpm === Infinity) wpm = 0;
    
    finalWpm.innerText = wpm;
    
    let accuracy = Math.round(((charIndex - mistakes) / charIndex) * 100);
    if(isNaN(accuracy)) accuracy = 0;
    finalAccuracy.innerText = accuracy + "%";
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft + "s";
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
    modal.classList.add("hidden");
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
modalRestartBtn.addEventListener("click", resetGame);
