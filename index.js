const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let snowmanX = 0;
let snowmanY = 0;
let isJumping = false;
let g = 9.81;
let velocity = 20;

const snowmanHeight = 530 + 443 + 381;

function drawGround(x, y, width, height, color) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawSnowman(x, y) {
  drawCircle("#fff", 100 + x, 530 + y, 50); // bottom circle
  drawCircle("#fff", 100 + x, 443 + y, 37); // middle circle
  drawCircle("#fff", 100 + x, 381 + y, 25); // top circle

  drawCircle("#000", 110 + x, 381 + y, 2); // left eye
  drawCircle("#000", 90 + x, 381 + y, 2); // right eye

  drawCircle("#000", 100 + x, 425 + y, 1.5); // bottom button
  drawCircle("#000", 100 + x, 445 + y, 1.5); // middle button
  drawCircle("#000", 100 + x, 465 + y, 1.5); // top button

  drawTriangle("#FFA500", 100 + x, 387 + y, 3.5); // nose

  drawRectangle("#555454", 80 + x, 356 + y, 40, 5); // hat bottom
  drawRectangle("#555454", 85 + x, 340 + y, 30, 20); // hat top

  drawRectangle("#44261c", 135 + x, 445 + y, 40, 5); // right arm
  drawRectangle("#44261c", 25 + x, 445 + y, 40, 5); // left arm
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

function drawSun(color, x, y, radius) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

const handleKeyPress = (e) => {
  if (e.key === " ") {
    console.log("hello");
    isJumping = true;
  }
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSun("goldenrod", 850, 50, 30);

  drawSnowman(snowmanX, snowmanY);
  drawGround(0, 580, 1000, 500, "blue");

  if (isJumping) {
    if (snowmanY > -300) {
      velocity = Math.sqrt((canvas.height - snowmanY) * g * 0.2);
      snowmanY = snowmanY - velocity * 0.15;
    } else if (snowmanY <= -300) {
      isJumping = false;
    }
  }
  if (!isJumping) {
    if (snowmanY < 0) {
      velocity = Math.sqrt((canvas.height - snowmanY) * g * 0.2);
      snowmanY = snowmanY + velocity * 0.15;
    }
  }
};

setInterval(draw, 10);

document.addEventListener("keypress", handleKeyPress, false);
