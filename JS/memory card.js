    const startBtn = document.querySelector('.start-btn');
    const body = document.body;

    startBtn.addEventListener('click', () => {
        // 1. Hide the button
        startBtn.style.display = 'none';

        // 2. Add the 'dimmed' class to the body to lower brightness
        body.classList.add('dimmed');
        
        // 3. (Optional) Start your game logic here
        console.log("Game Started!");
    });
