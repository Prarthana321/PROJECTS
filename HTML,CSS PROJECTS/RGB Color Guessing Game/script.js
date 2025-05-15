// HTML elements
const rgbDisplay = document.getElementById("rgbDisplay");
const squaresContainer = document.getElementById("squaresContainer");
const message = document.getElementById("message");
const scoreBoard = document.getElementById("score");

let correctColor = "";
let score = 0;

// Function to generate a random RGB color
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to start or reset the game
function startGame() {
  message.textContent = "Click a color to guess!";
  squaresContainer.innerHTML = ""; // Clear previous squares

  // Generate array of random colors
  const colors = [];
  for (let i = 0; i < 6; i++) {
    colors.push(randomColor());
  }

  // Choose one color as the correct answer
  correctColor = colors[Math.floor(Math.random() * colors.length)];
  rgbDisplay.textContent = correctColor.toUpperCase();

  // Create and display color squares
  colors.forEach(color => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = color;

    // Add click event to each square
    square.addEventListener("click", function () {
      if (color === correctColor) {
        message.textContent = "✅ Correct!";
        score++;
      } else {
        message.textContent = "❌ Wrong! Try again.";
        score--;
      }
      updateScore();
      setTimeout(startGame, 1000); // Start a new round after 1 sec
    });

    squaresContainer.appendChild(square);
  });
}

// Update score display
function updateScore() {
  scoreBoard.textContent = `Points: ${score}`;
}

// Start game on initial load
startGame();
