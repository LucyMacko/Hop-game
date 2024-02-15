const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const restartButton = document.getElementById("restartButton");

let gameStarted = false;

let dinosaur = {
  x: 50,
  y: canvas.height - 80,
  width: 80,
  height: 80,
  speedY: 0,
  gravity: 0.2,
  jumpPower: -7,
  jumping: false,
  jumpCount: 0,
};

let obstacles = [];
let score = 0;
let obstacleInterval;
let gameOverFlag = false;

const backgroundMusic = new Audio(
  "../assets/sounds/cosmic-minimal-music-fragment-55131.mp3"
);
const jumpSound = new Audio("../assets/sounds/cartoon-jump-6462.mp3");
const collisionSound = new Audio("../assets/sounds/collision.mp3");

backgroundMusic.loop = true;

function jump() {
  if (!gameStarted) {
    gameStarted = true;
  }

  if (!dinosaur.jumping && dinosaur.jumpCount < 2 && !gameOverFlag) {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
    }
    dinosaur.speedY = dinosaur.jumpPower;
    dinosaur.jumping = true;
    dinosaur.jumpCount++;
    jumpSound.currentTime = 0;
    jumpSound.play();
  }
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "Spacebar") {
    jump();
  }
});

function gameOver() {
  clearInterval(obstacleInterval);
  gameOverFlag = true;
  restartButton.style.display = "block";
  restartButton.addEventListener("click", restartGame);
  backgroundMusic.pause();
}

function drawDinosaur() {
  ctx.fillStyle = "green";
  ctx.fillRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
}

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
  const minHeight = 20;
  const maxHeight = 80;
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
    y: canvas.height - randomHeight,
    width: 30,
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

function checkCollisions() {
  obstacles.forEach((obstacle) => {
    if (
      dinosaur.x < obstacle.x + obstacle.width &&
      dinosaur.x + dinosaur.width > obstacle.x &&
      dinosaur.y + dinosaur.height > obstacle.y &&
      dinosaur.y < obstacle.y + obstacle.height
    ) {
      if (dinosaur.y + dinosaur.height < obstacle.y + 20) {
        score++;
      } else if (!gameOverFlag) {
        gameOver();
        collisionSound.currentTime = 0;
        collisionSound.play();
      }
    }
  });
}

function restartGame() {
  gameStarted = false;
  backgroundMusic.play();
  jumpSound.pause();
  collisionSound.pause();
  document.location.reload();
}
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawDinosaur();
  drawObstacles();

  if (gameStarted && !gameOverFlag) {
    if (dinosaur.jumping) {
      dinosaur.speedY += dinosaur.gravity;
      dinosaur.y += dinosaur.speedY;
      if (dinosaur.y >= canvas.height - dinosaur.height) {
        dinosaur.y = canvas.height - dinosaur.height;
        dinosaur.speedY = 0;
        dinosaur.jumping = false;
        dinosaur.jumpCount = 0;
      }
    }
    updateObstacles();
    checkCollisions();
  }

  requestAnimationFrame(update);
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

obstacleInterval = setInterval(createObstacle, 3000);
update();
