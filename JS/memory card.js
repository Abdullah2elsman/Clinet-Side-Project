    
// Game Start
const startBtn = document.querySelector('.start-btn');
const body = document.body;
const gamePlay = document.getElementsByClassName('game-play');
console.log(gamePlay);

// Define Icons of cards and container
const container = document.getElementById('cardContainer')
const cardIcons = [
    'fa-home', 'fa-home',
    'fa-heart', 'fa-heart',
    'fa-star', 'fa-star',
    'fa-ghost', 'fa-ghost',
    'fa-bomb', 'fa-bomb',
    'fa-cloud', 'fa-cloud',
    'fa-bolt', 'fa-bolt',
    'fa-crow', 'fa-crow'
];

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    body.classList.add('dimmed');
    gamePlay[0].style.display = 'block';
    gamePlay[1].style.display = 'block';
    console.log("Game Started!");
    // Shuffle and Create Cards
    shuffledIcon = shuffle(cardIcons);
    shuffledIcon.forEach(icon => {
        createCard(icon)
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Shuffle the cards
function shuffle(cardIcons) {
    let shuffledIcon = [...cardIcons];
    for (let i = 15; i >= 0; i--) {
        let chosenIcon = Math.floor((Math.random() * i));
        // Swap
        [shuffledIcon[chosenIcon], shuffledIcon[i]] = [shuffledIcon[i], shuffledIcon[chosenIcon]];
    }
    return shuffledIcon;
}


// Create a card
function createCard(iconName) {

    // 1. Create the Main Card Wrapper
    const card = document.createElement('div');
    card.className = 'card';

    // 2. Create the Inner Card (The flipper)
    const innerCard = document.createElement('div');
    innerCard.className = 'inner-card';
    innerCard.onclick = function () { flipCard(this); };

    // 3. Create the front face
    const frontFace = document.createElement('div');
    frontFace.className = 'front-face';

    // 4. Create the front face
    const backFace = document.createElement('div');
    backFace.className = 'back-face';

    frontFace.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-circle-question-mark w-10 h-10 text-white/80" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <path d="M12 17h.01"></path>
    </svg>
    `;


    
    // 5. Create Icon to each card
    const icon = document.createElement('i');
    icon.className = 'fa-solid ' + iconName;

    // 6. Append Classes together to make us the final card
    backFace.appendChild(icon);
    innerCard.appendChild(frontFace);
    innerCard.appendChild(backFace);
    card.appendChild(innerCard);
    container.appendChild(card);
    return card;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Game Logic
// Flip Action
let hasFlippedCard = false;
let lockBoard = false; // This to prevent user click on the board to check the card
let firstCard, secondCard;
function flipCard(element) {

    if (lockBoard) return;
    element.classList.toggle('is-flipped');

    // Check if the user flip a card or not
    if (hasFlippedCard) {
        secondCard = element;
        // get the second class name of an i tag element because the comparing will done by this class name
        let firstCardIcon = firstCard.querySelector('i').classList[1];
        let secondCardIcon = secondCard.querySelector('i').classList[1];

        // Check the matching
        if (firstCardIcon === secondCardIcon) {
            // MATCH FOUND
            console.log("Match!");
            
            // make the card correct
            firstCard.querySelector('.back-face').classList.add('correct');   
            secondCard.querySelector('.back-face').classList.add('correct');   

            // Disable click on the card
            firstCard.onclick = null;
            secondCard.onclick = null;
            resetVariables();
        } else {
            lockBoard = true;
        // NO MATCH
        console.log("No Match!");
        hasFlippedCard = false;
        setTimeout(function () {
            firstCard.classList.remove('is-flipped');
            secondCard.classList.remove('is-flipped');
            resetVariables();
        }, 1000);
        }
        } else {
            firstCard = element;
            hasFlippedCard = true;
        }

function resetVariables() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    hasFlippedCard = false;
}

}