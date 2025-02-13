const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gorilla = {
    x: 50,
    y: 50,
    size: 20,  // This is the radius of the gorilla
    color: "#8B4513",  // Gorilla color (brown)
};

const bananas = [
    { x: 200, y: 100, collected: false },
    { x: 600, y: 200, collected: false },
    { x: 400, y: 500, collected: false }
];

// Maze walls - adding more specific positions for walls
const walls = [
    { x: 100, y: 100, width: 600, height: 20 },
    { x: 100, y: 100, width: 20, height: 400 },
    { x: 100, y: 400, width: 600, height: 20 },
    { x: 600, y: 100, width: 20, height: 300 },
    { x: 200, y: 200, width: 300, height: 20 },
    { x: 200, y: 300, width: 300, height: 20 },
    { x: 200, y: 400, width: 300, height: 20 }
];

let gameWon = false;

// Draw game elements (walls, bananas, gorilla)
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    ctx.fillStyle = "gray";
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });

    // Draw bananas - make them more banana-shaped
    bananas.forEach(banana => {
        if (!banana.collected) {
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.ellipse(banana.x, banana.y, 12, 20, 0, 0, Math.PI * 2); // Make it oval (banana-like)
            ctx.fill();
        }
    });

    // Draw gorilla - make it look more like a monkey
    ctx.fillStyle = gorilla.color;
    ctx.beginPath();
    ctx.arc(gorilla.x, gorilla.y, gorilla.size, 0, Math.PI * 2);  // Drawing a circle for gorilla's head
    ctx.fill();
    
    // Draw eyes and face (simple additions to make the gorilla look better)
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(gorilla.x - 5, gorilla.y - 5, 5, 0, Math.PI * 2);  // Left eye
    ctx.arc(gorilla.x + 5, gorilla.y - 5, 5, 0, Math.PI * 2);  // Right eye
    ctx.fill();
    
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(gorilla.x - 5, gorilla.y - 5, 2, 0, Math.PI * 2);  // Left pupil
    ctx.arc(gorilla.x + 5, gorilla.y - 5, 2, 0, Math.PI * 2);  // Right pupil
    ctx.fill();

    // Check if the game is won (all bananas collected)
    if (bananas.every(banana => banana.collected) && !gameWon) {
        gameWon = true;
        document.getElementById("nextButton").style.display = "block";
    }
}

// Check for collision with walls
function checkCollision() {
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        if (gorilla.x + gorilla.size > wall.x && gorilla.x - gorilla.size < wall.x + wall.width &&
            gorilla.y + gorilla.size > wall.y && gorilla.y - gorilla.size < wall.y + wall.height) {
            return true; // Collision detected
        }
    }
    return false;
}

// Move gorilla with mouse and collect bananas
canvas.addEventListener("mousemove", (e) => {
    gorilla.x = e.offsetX;
    gorilla.y = e.offsetY;

    // Check if gorilla collects bananas
    bananas.forEach(banana => {
        if (!banana.collected && Math.abs(gorilla.x - banana.x) < 20 && Math.abs(gorilla.y - banana.y) < 20) {
            banana.collected = true;
        }
    });

    // If there is a collision with a wall, reset the game
    if (checkCollision()) {
        alert("Game Over! You hit a wall!");
        resetGame();
    }

    // Redraw the game
    drawGame();
});

// Reset game if the player hits a wall
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
