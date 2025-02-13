const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gorilla = {
    x: 50,
    y: 50,
    width: 40, // Reduced size
    height: 60,
    color: "brown"
};

const walls = [
    { x: 100, y: 100, width: 600, height: 20 },
    { x: 100, y: 100, width: 20, height: 400 },
    { x: 100, y: 400, width: 600, height: 20 },
    { x: 600, y: 100, width: 20, height: 300 },
    { x: 200, y: 200, width: 300, height: 20 },
    { x: 200, y: 300, width: 300, height: 20 },
    { x: 200, y: 400, width: 300, height: 20 }
];

const bananas = [];

// Function to check if a banana collides with any walls
function checkBananaCollision(banana) {
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        if (banana.x + 15 > wall.x && banana.x - 15 < wall.x + wall.width &&
            banana.y + 15 > wall.y && banana.y - 15 < wall.y + wall.height) {
            return true; // Collision with wall
        }
    }
    return false;
}

// Function to generate valid banana positions
function generateBananas() {
    bananas.length = 0; // Clear existing bananas
    const numberOfBananas = 3; // Number of bananas

    while (bananas.length < numberOfBananas) {
        let newBanana = {
            x: Math.random() * (canvas.width - 30) + 15,  // Ensure bananas stay inside canvas bounds
            y: Math.random() * (canvas.height - 30) + 15
        };

        if (!checkBananaCollision(newBanana)) {
            bananas.push(newBanana); // Only add if no collision with walls
        }
    }
}

let gameWon = false;

// Draw game elements (walls, bananas, gorilla)
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    ctx.fillStyle = "gray";
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });

    // Draw bananas as banana-like shapes (larger)
    ctx.fillStyle = "yellow";
    bananas.forEach(banana => {
        if (!banana.collected) {
            ctx.beginPath();
            ctx.arc(banana.x, banana.y, 20, Math.PI / 4, (3 * Math.PI) / 4);  // larger banana shape
            ctx.fill();
        }
    });

    // Draw gorilla as a more appropriate shape (rectangular body, face, arms)
    ctx.fillStyle = gorilla.color;
    ctx.fillRect(gorilla.x - gorilla.width / 2, gorilla.y - gorilla.height / 2, gorilla.width, gorilla.height);  // gorilla body
    ctx.beginPath();
    ctx.arc(gorilla.x, gorilla.y - 25, 25, 0, Math.PI * 2); // gorilla face
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
        if (gorilla.x + gorilla.width / 2 > wall.x && gorilla.x - gorilla.width / 2 < wall.x + wall.width &&
            gorilla.y + gorilla.height / 2 > wall.y && gorilla.y - gorilla.height / 2 < wall.y + wall.height) {
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
    generateBananas(); // Re-generate bananas after reset
    bananas.forEach(banana => banana.collected = false);
    gameWon = false;
    document.getElementById("nextButton").style.display = "none";
    drawGame();
}

// Initialize the game
generateBananas(); // Generate bananas when the game starts
drawGame();
