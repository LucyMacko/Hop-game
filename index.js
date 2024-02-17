const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restartButton");

<<<<<<< HEAD
let obstacles = [];
let score = 0;

=======
let gameStarted = false;
>>>>>>> parent of ebd1af8 (Merge branch 'feature/animation')
let snowmanRadius = 50;
let jumpingY = 0;
let snowmanY = 580 + jumpingY;
let snowmanX = 100;
let isJumping = false;
let g = 9.81;
let velocity = 20;
let isPlaying = false;

let obstacles = [];
let score = 0;
let obstacleInterval;
let gameOverFlag = false;
let groundHeight = 20;
let maxJumpingY = -200;

<<<<<<< HEAD
const g = 9.81;
let velocity = 20;

let obstacleInterval;
let gameOverFlag = false;
let isGameOver = false;
let isPaused = false;
let isPlaying = false;
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    startGame();
  }
});
function displayIntroStory() {
  alert(
    "In the heart of a snowy mountain range, a friendly snowman finds himself in a dire situation. A colossal avalanche is racing down the mountainside, threatening to bury everything in its path! With no time to waste, our brave snowman must navigate through treacherous obstacles and icy perils to escape the avalanche's fury. Will you guide our frosty friend to safety? Press 'Enter' to begin the adventure!"
  );
}
displayIntroStory();
let bestScore = localStorage.getItem("bestScore") || 0;

function startGame() {
  document.querySelector(".intro-container").style.display = "none";
}
=======
const snowmanHeight = 530 + 443 + 381;
>>>>>>> parent of ebd1af8 (Merge branch 'feature/animation')

const backgroundMusic = new Audio(
  "./assets/sounds/cosmic-minimal-music-fragment-55131.mp3"
);
const jumpSound = new Audio("./assets/sounds/cartoon-jump-6462.mp3");
const collisionSound = new Audio("./assets/sounds/collision.mp3");
backgroundMusic.loop = true;

<<<<<<< HEAD
backgroundMusic.loop = true;

function updateBestScore(score) {
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
  }
}

function displayBestScore(ctx) {
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "20px Arial";
  ctx.fillText("Best Score: " + bestScore, canvas.width - 150, 30);
}
const resetGame = () => {
  score = 0;
  obstacles = [];
  isPlaying = false;
  isGameOver = false;
  isPaused = false;
};

const handleKeyPress = (e) => {
  switch (e.key) {
    case " ":
      jumpSound.currentTime = 0;
      jumpSound.play();
      if (snowmanY < 579) return;
      isJumping = true;
      break;
    case "p":
      if (!isGameOver && score !== 0) {
        isPaused = !isPaused;
        isPlaying = !isPlaying;
      }
      break;
    case "Enter":
      if (!isPaused && !isPlaying)
        isGameOver ? resetGame() : (isPlaying = true);
      break;

    default:
      break;
  }
  if (e.key === " ") {
  }
};

const draw = () => {
  if (!isPlaying) {
    backgroundMusic.pause();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isGameOver) drawGameOver();
    else if (isPaused) drawPause();
    else drawRules();
    updateBestScore(score);
    displayBestScore(ctx);
    drawStartNewGame();
  }

  if (isPlaying) {
    backgroundMusic.play();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMoon("lightyellow", 850, 50, 30);
    drawSnowStorm("white", 3);
    drawSnowman(jumpingY);
    drawGround();
    drawObstacles();
    updateObstacles();

    if (isJumping) {
      if (jumpingY > maxJumpingY) {
        velocity = Math.sqrt((canvas.height - jumpingY) * g * 0.2);
        jumpingY = jumpingY - velocity * 0.15;
      } else if (jumpingY <= maxJumpingY) {
        isJumping = false;
      }
    }
    if (!isJumping) {
      if (jumpingY < 0) {
        velocity = Math.sqrt((canvas.height - jumpingY) * g * 0.2);
        jumpingY = jumpingY + velocity * 0.15;
      }
    }
    snowmanY = 580 + jumpingY;

    collision();

    ctx.fillStyle = "black";
    ctx.font = "20px courier";
    ctx.fillText(Math.floor(score), 40, 60);
  }

  requestAnimationFrame(draw);
};

=======
>>>>>>> parent of ebd1af8 (Merge branch 'feature/animation')
function drawGround() {
  const gradient = ctx.createLinearGradient(
    0,
    canvas.height - groundHeight,
    0,
    canvas.height
  );
  gradient.addColorStop(1, "blue");
  gradient.addColorStop(0, "aquamarine");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

function drawMoon(color, x, y, radius) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function drawSnowStorm() {
  for (let i = 1; i <= 40; i++) {
    drawSnow("white", 3.5);
  }
}

function drawSnow(color, radius) {
  const canvasWidth = 1000;
  const canvasHeight = 600;
  const x = Math.random() * canvasWidth;
  const y = Math.random() * canvasHeight;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function drawSnowman(y) {
  const headYMutiplier = 1.5;
  const bodyYMutiplier = 1.2;
  const hatYMultiplier = 1.75;

  drawCircle("#fff", 100, 530 + y, 50); // bottom circle
  drawCircle("#fff", 100, 443 + y * bodyYMutiplier, 37); // middle circle
  drawCircle("#fff", 100, 381 + y * headYMutiplier, 25); // top circle

  drawCircle("#000", 110, 381 + y * headYMutiplier, 2); // left eye
  drawCircle("#000", 90, 381 + y * headYMutiplier, 2); // right eye

  drawCircle("#000", 100, 425 + y * bodyYMutiplier, 2); // mid bottom button
  drawCircle("#000", 100, 445 + y * bodyYMutiplier, 2); // mid middle button
  drawCircle("#000", 100, 465 + y * bodyYMutiplier, 2); // mid top button
  drawCircle("#000", 100, 550 + y * bodyYMutiplier, 2); // low bottom button
  drawCircle("#000", 100, 530 + y * bodyYMutiplier, 2); // low middle button
  drawCircle("#000", 100, 510 + y * bodyYMutiplier, 2); // low top button

  drawTriangle("#FFA500", 100, 391 + y * headYMutiplier, 8); // nose

  drawRectangle("red", 80, 356 + y * hatYMultiplier, 40, 5); // hat bottom
  drawRectangle("green", 85, 336 + y * hatYMultiplier, 30, 20); // hat top

  drawRectangle("red", 82, 395 + y * hatYMultiplier, 35, 11); // scarf
  drawRectangle("green", 117, 395 + y * hatYMultiplier, 9, 35); //scarf 2

  drawRectangle("#44261c", 137, 445 + y * bodyYMutiplier, 30, 7); // right arm
  drawRectangle("#44261c", 33, 445 + y * bodyYMutiplier, 30, 7); // left arm
}

function drawCircle(color, x, y, radius) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function drawTriangle(color, x, y, height) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - height, y - height);
  ctx.lineTo(x + height, y - height);
  ctx.closePath();
  ctx.fill();
}

function drawRectangle(color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

const handleKeyPress = (e) => {
  if (snowmanY < 579) return;
  if (e.key === " ") {
    console.log("hello");
    isJumping = true;
  }
};

<<<<<<< HEAD
const drawRules = () => {
  ctx.font = "18px courier";
  ctx.fillStyle = "#fff";
  ctx.fillText(`"Space bar" : jump`, 375, 300);
  ctx.fillText(`"P" : Pause/Unpause`, 375, 330);
};

const drawStartNewGame = () => {
  ctx.font = "18px courier";
  ctx.fillStyle = "#fff";
  ctx.fillText(`Press "Enter" to start a new game`, 325, 500);
};

const drawPause = () => {
  ctx.font = "24px courier";
  ctx.fillStyle = "#fff";
  ctx.fillText(`Pause`, 415, 300);

  ctx.font = "16px courier";
  ctx.fillStyle = "#fff";
  ctx.fillText(`Press 'P' to continue`, 375, 330);
=======
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  console.log(snowmanY);

  drawMoon("lightyellow", 850, 50, 30);
  drawSnowStorm("white", 3);
  drawSnowman(jumpingY);
  drawGround();
  drawObstacles();
  updateObstacles();

  if (isJumping && !gameOverFlag) {
    if (jumpingY > maxJumpingY) {
      if (backgroundMusic.paused) {
        backgroundMusic.play();
      }
      jumpSound.currentTime = 0;
      jumpSound.play();

      velocity = Math.sqrt((canvas.height - jumpingY) * g * 0.2);
      jumpingY = jumpingY - velocity * 0.15;
    } else if (jumpingY <= maxJumpingY) {
      isJumping = false;
    }
  }
  if (!isJumping) {
    if (jumpingY < 0) {
      velocity = Math.sqrt((canvas.height - jumpingY) * g * 0.2);
      jumpingY = jumpingY + velocity * 0.15;
    }
  }
  snowmanY = 580 + jumpingY;

  collision();

  ctx.fillStyle = "black";
  ctx.font = "20px courier";
  score++;
  ctx.fillText(Math.floor(score / 10), 40, 60);
>>>>>>> parent of ebd1af8 (Merge branch 'feature/animation')
};

function drawObstacles() {
  obstacles.forEach((obstacle) => {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y);
    ctx.lineTo(obstacle.x, obstacle.y + obstacle.height);
    ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
    ctx.fill();

    const lightsColors = ["yellow", "red", "blue"];
    lightsColors.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(
        obstacle.x + obstacle.width / 4 + (index * obstacle.width) / 4,
        obstacle.y + obstacle.height / 2,
        5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  });
}

function createObstacle() {
  const minHeight = 50;
  const maxHeight = 140;
  const randomHeight =
    Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

  const minDistance = 500;
  const maxDistance = 900;
  const randomDistance =
    Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance;

  let obstacleX;
  if (obstacles.length === 0) {
    obstacleX = canvas.width + randomDistance;
  } else {
    const lastObstacle = obstacles[obstacles.length - 1];
    obstacleX = lastObstacle.x + lastObstacle.width + randomDistance;
  }

  const obstacle = {
    x: obstacleX,
    y: canvas.height - randomHeight - groundHeight,
    width: 40,
    height: randomHeight,
  };
  obstacles.push(obstacle);

  setTimeout(createObstacle, randomDistance);
}

function updateObstacles() {
  obstacles = obstacles.filter((obstacle) => {
    if (!gameOverFlag) {
      obstacle.x -= 5;
    }
    if (obstacle.x + obstacle.width > 0) {
      return true;
    } else {
      score++;
      return false;
    }
  });
}
<<<<<<< HEAD
=======
function restartGame() {
  gameStarted = false;
  backgroundMusic.play();
  jumpSound.pause();
  collisionSound.pause();
  document.location.reload();
}
// function checkCollisions() {
//   obstacles.forEach((obstacle) => {
//     if (
//       snowmanX < obstacle.x + obstacle.width &&
//       snowmanX > obstacle.x &&
//       snowmanY > obstacle.y &&
//       snowmanY < obstacle.y + obstacle.height
//     ) {
//       if (snowmanY < obstacle.y + 20) {
//         score++;
//       } else {
//         // gameOver();
//         alert("oops");

//         collisionSound.currentTime = 0;
//         collisionSound.play();
//       }
//     }
//   });
// }
>>>>>>> parent of ebd1af8 (Merge branch 'feature/animation')

const collision = () => {
  obstacles.forEach((obstacle) => {
    if (snowmanY > obstacle.y) {
      if (
        snowmanX - snowmanRadius + 20 < obstacle.x &&
        snowmanX + snowmanRadius - 20 > obstacle.x
      ) {
        collisionSound.currentTime = 0;
        collisionSound.play();
        console.log("you lose");
        gameOver();
      }
    }
  });
};
<<<<<<< HEAD
draw();
=======
function gameOver() {
  clearInterval(obstacleInterval);
  gameOverFlag = true;
  restartButton.style.display = "block";
  restartButton.addEventListener("click", restartGame);
  backgroundMusic.pause();
}
setInterval(draw, 10);
>>>>>>> parent of ebd1af8 (Merge branch 'feature/animation')
setInterval(createObstacle, 3000);

document.addEventListener("keypress", handleKeyPress, false);
