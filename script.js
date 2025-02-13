const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gorilla = {
    x: 50,
    y: 50,
    size: 20,
    speed: 4,
    color: "brown"
};

const bananas = [
    { x: 200, y: 100, collected: false },
    { x: 400, y: 300, collected: false },
    { x: 600, y: 500, collected: false }
];

const walls = [
    { x: 100, y: 150, width: 600, height: 20 },
    { x: 100, y: 250, width: 600, height: 20 },
    { x: 100, y: 400, width: 600, height: 20 }
];

let gameWon = false;

// Draw game elements
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    ctx.fillStyle = "gray";
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });

    // Draw bananas
    ctx.fillStyle = "yellow";
    bananas.forEach(banana => {
        if (!banana.collected) {
            ctx.beginPath();
            ctx.arc(banana.x, banana.y, 10, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Draw gorilla
    ctx.fillStyle = gorilla.color;
    ctx.beginPath();
    ctx.arc(gorilla.x, gorilla.y, gorilla.size, 0, Math.PI * 2);
    ctx.fill();

    // Check for win
    if (bananas.every(banana => banana.collected) && !gameWon) {
        gameWon = true;
        document.getElementById("nextButton").style.display = "block";
    }
}

// Move gorilla
canvas.addEventListener("mousemove", (e) => {
    gorilla.x = e.offsetX;
    gorilla.y = e.offsetY;
    
    // Check if the gorilla collects bananas
    bananas.forEach(banana => {
        if (!banana.collected && Math.abs(gorilla.x - banana.x) < 20 && Math.abs(gorilla.y - banana.y) < 20) {
            banana.collected = true;
        }
    });

    // Check for wall collisions
    walls.forEach(wall => {
        if (gorilla.x > wall.x && gorilla.x < wall.x + wall.width &&
            gorilla.y > wall.y && gorilla.y < wall.y + wall.height) {
            alert("Game Over! You hit a wall!");
            resetGame();
        }
    });

    drawGame();
});

// Reset game
function resetGame() {
    gorilla.x = 50;
    gorilla.y = 50;
    bananas.forEach(banana => banana.collected = false);
    gameWon = false;
    document.getElementById("nextButton").style.display = "none";
    drawGame();
}

// Initialize the game
drawGame();
