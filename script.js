const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gorilla = {
    x: 50,
    y: 50,
    size: 20,
    color: "brown"
};

const bananas = [
    { x: 200, y: 100, collected: false },
    { x: 600, y: 200, collected: false },
    { x: 400, y: 500, collected: false }
];

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

    // Check if gorilla
