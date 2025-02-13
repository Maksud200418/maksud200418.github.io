const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gorilla = {
    x: 50,
    y: 50,
    size: 30,
    speed: 5,
    color: "brown"
};

const bananas = [
    { x: 150, y: 150, size: 20 },
    { x: 300, y: 200, size: 20 },
    { x: 500, y: 100, size: 20 },
    { x: 650, y: 300, size: 20 }
];

let gameOver = false;

// Draw the gorilla and bananas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw gorilla
    ctx.fillStyle = gorilla.color;
    ctx.fillRect(gorilla.x, gorilla.y, gorilla.size, gorilla.size);
    
    // Draw bananas
    ctx.fillStyle = "yellow";
    bananas.forEach(banana => {
        ctx.beginPath();
        ctx.arc(banana.x, banana.y, banana.size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Check for collisions (banana collection)
    bananas.forEach((banana, index) => {
        if (gorilla.x < banana.x + banana.size && gorilla.x + gorilla.size > banana.x &&
            gorilla.y < banana.y + banana.size && gorilla.y + gorilla.size > banana.y) {
            bananas.splice(index, 1); // Remove collected banana
        }
    });
    
    // If all bananas are collected, end the game
    if (bananas.length === 0) {
        gameOver = true;
        document.getElementById("nextButton").style.display = "block"; // Show button to go to next page
    }
}

// Move the gorilla based on mouse position
canvas.addEventListener("mousemove", (e) => {
    if (!gameOver) {
        gorilla.x = e.offsetX - gorilla.size / 2;
        gorilla.y = e.offsetY - gorilla.size / 2;
    }
});

function gameLoop() {
    if (!gameOver) {
        draw();
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
