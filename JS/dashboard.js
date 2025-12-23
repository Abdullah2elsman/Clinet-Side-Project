const chooseBtn = document.getElementById('chooseBtn');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('gameOverlay');
const body = document.body;

chooseBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    body.classList.add('dimmed'); // Applies the brightness drop to logo
});

closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    body.classList.remove('dimmed');
});