const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function drawGround(ctx, x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
drawGround(ctx, 0, 580, 1000, 500, 'blue');

function drawSnowman(ctx) {
    drawCircle(ctx, "#fff", 100, 530, 50); // bottom circle
    drawCircle(ctx, "#fff", 100, 443, 37); // middle circle
    drawCircle(ctx, "#fff", 100, 381, 25);  // top circle
    
    drawCircle(ctx, "#000", 110, 381, 2);   // left eye
    drawCircle(ctx, "#000", 90, 381, 2);    // right eye
    
    drawCircle(ctx, "#000", 100, 425, 1.5); // bottom button
    drawCircle(ctx, "#000", 100, 445, 1.5);// middle button
    drawCircle(ctx, "#000", 100, 465, 1.5);// top button
    
    drawTriangle(ctx, "#FFA500", 100, 387, 3.5); // nose
    
    drawRectangle(ctx, "#555454", 80, 356, 40, 5);  // hat bottom
    drawRectangle(ctx, "#555454", 85, 340, 30, 20); // hat top
    
    drawRectangle(ctx, "#44261c", 135, 445, 40, 5); // right arm
    drawRectangle(ctx, "#44261c", 25, 445, 40, 5);  // left arm
}

drawSnowman(ctx);

function drawCircle(ctx, color, x, y, radius) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function drawTriangle(ctx, color, x, y, height) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - height, y - height);
    ctx.lineTo(x + height, y - height);
    ctx.closePath();
    ctx.fill();
}

function drawRectangle(ctx, color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawSun(ctx, color, x, y, radius) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}
drawSun(ctx, "goldenrod", 850, 50, 30);

  


