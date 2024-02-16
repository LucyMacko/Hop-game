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
    
    drawCircle(ctx, "#000", 100, 425, 1.5);// middle bottom button
    drawCircle(ctx, "#000", 100, 445, 1.5);// middle middle button
    drawCircle(ctx, "#000", 100, 465, 1.5);// middle top button
    drawCircle(ctx, "#000", 100, 505, 1.5);// down bottom button
    drawCircle(ctx, "#000", 100, 530, 1.5);// down middle button
    drawCircle(ctx, "#000", 100, 555, 1.5);// down top button
    
    drawTriangle(ctx, "#FFA500", 100, 391, 7); // nose
    
    drawRectangle(ctx, "red", 80, 356, 40, 5);  // hat bottom
    drawRectangle(ctx, "green", 85, 337, 30, 20); // hat top
    
    drawRectangle(ctx, "#44261c", 135, 445, 30, 5); // right arm
    drawRectangle(ctx, "#44261c", 35, 445, 30, 5);  // left arm
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

  


