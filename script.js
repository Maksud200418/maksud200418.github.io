// Set up canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Gorilla settings
const gorilla = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 15,
  color: 'green',
  speed: 5
};

// Banana settings
const bananas = [
  { x: 100, y: 100, radius: 10, collected: false },
  { x: 400, y: 150, radius: 10, collected: false },
  { x: 300, y: 400, radius: 10, collected: false }
];

// Maze obstacles (example)
const walls = [
  { x: 50, y: 50, width: 500, height: 20 },
  { x: 50, y: 150, width: 500, height: 20 },
  { x: 50, y: 250, width: 500, height: 20 },
  { x: 50, y: 350, width: 500, height: 20 },
  { x: 50, y: 450, width: 500, height: 20 }
];

// Check if gorilla collides with walls
function checkCollision(gorilla, walls) {
  for (const wall of walls) {
    if (
      gorilla.x + gorilla.radius > wall.x &&
      gorilla.x - gorilla.radius < wall.x + wall.width &&
      gorilla.y + gorilla.radius > wall.y &&
      gorilla.y - gorilla.radius < wall.y + wall.height
    ) {
      return true;
    }
  }
  return false;
}

// Check if gorilla collects bananas
function checkBananaCollection(gorilla, bananas) {
  bananas.forEach(banana => {
    if (
      !banana.collected &&
      Math.sqrt(Math.pow(gorilla.x - banana.x, 2) + Math.pow(gorilla.y - banana.y, 2)) < gorilla.radius + banana.radius
    ) {
      banana.collected = true;
    }
  });
}

// Draw the game elements
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the walls
  ctx.fillStyle = 'gray';
  walls.forEach(wall => {
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  });

  // Draw bananas
  bananas.forEach(banana => {
    if (!banana.collected) {
      ctx.beginPath();
      ctx.arc(banana.x, banana.y, banana.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'yellow';
      ctx.fill();
      ctx.closePath();
    }
  });

  // Draw the gorilla (player)
  ctx.beginPath();
  ctx.arc(gorilla.x, gorilla.y, gorilla.radius, 0, Math.PI * 2);
  ctx.fillStyle = gorilla.color;
  ctx.fill();
  ctx.closePath();

  // Check for collision with walls
  if (checkCollision(gorilla, walls)) {
    alert("You hit a wall! Try again.");
    resetGame();
  }

  // Check if all bananas are collected
  if (bananas.every(banana => banana.collected)) {
    alert("You collected all bananas! Proceeding to the next page...");
    window.location.href = "frenchgorilla.html"; // Redirect to the next page
  }
}

// Update gorilla position
function updateGorillaPosition(event) {
  gorilla.x = event.clientX - canvas.offsetLeft;
  gorilla.y = event.clientY - canvas.offsetTop;
}

// Reset game (if collision occurs)
function resetGame() {
  gorilla.x = canvas.width / 2;
  gorilla.y = canvas.height / 2;
  bananas.forEach(banana => banana.collected = false);
}

// Main game loop
function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

// Set up event listeners
canvas.addEventListener('mousemove', updateGorillaPosition);

// Start the game loop
gameLoop();
