const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

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
let maxJumpingY = -150;

const snowmanHeight = 530 + 443 + 381;

const backgroundMusic = new Audio(
  "../assets/sounds/cosmic-minimal-music-fragment-55131.mp3"
);
const jumpSound = new Audio("../assets/sounds/cartoon-jump-6462.mp3");
const collisionSound = new Audio("../assets/sounds/collision.mp3");

function drawGround() {
  ctx.beginPath();
  ctx.rect(0, canvas.height - groundHeight, canvas.width, groundHeight);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function drawSun(color, x, y, radius) {
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

  drawCircle("#000", 100, 425 + y * bodyYMutiplier, 1.5); // bottom button
  drawCircle("#000", 100, 445 + y * bodyYMutiplier, 1.5); // middle button
  drawCircle("#000", 100, 465 + y * bodyYMutiplier, 1.5); // top button

  drawTriangle("#FFA500", 100, 387 + y * headYMutiplier, 3.5); // nose

  drawRectangle("#555454", 80, 356 + y * hatYMultiplier, 40, 5); // hat bottom
  drawRectangle("#555454", 85, 340 + y * hatYMultiplier, 30, 20); // hat top

  drawRectangle("#44261c", 135, 445 + y * bodyYMutiplier, 40, 5); // right arm
  drawRectangle("#44261c", 25, 445 + y * bodyYMutiplier, 40, 5); // left arm
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
  if (e.key === " ") {
    console.log("hello");
    isJumping = true;
  }
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  console.log(snowmanY);

  drawSun("goldenrod", 850, 50, 30);
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
    y: canvas.height - randomHeight - groundHeight,
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

const collision = () => {
  obstacles.forEach((obstacle) => {
    if (snowmanY > obstacle.y) {
      if (
        snowmanX - snowmanRadius + 20 < obstacle.x &&
        snowmanX + snowmanRadius - 20 > obstacle.x
      ) {
        console.log("you lose");
      }
    } else {
      if (
        snowmanX - snowmanRadius + 20 < obstacle.x &&
        snowmanX + snowmanRadius - 20 > obstacle.x
      ) {
        score++;
      }
    }
  });
};

setInterval(draw, 10);
setInterval(createObstacle, 3000);

document.addEventListener("keypress", handleKeyPress, false);
