var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var shootPressed = false;

var x = canvas.width/2;
var y = canvas.height-30;
var angle = 0;

var bullets = [];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);

function keyDownHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = true;
  }
  else if(event.keyCode == 37) {
    leftPressed = true;
  }
  else if(event.keyCode == 38) {
    upPressed = true;
  }
  else if(event.keyCode == 40) {
    downPressed = true;
  }
  else if(event.keyCode == 49) {
    shootPressed = true;
  }
}

function keyUpHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = false;
  }
  else if(event.keyCode == 37) {
    leftPressed = false;
  }
  else if(event.keyCode == 38) {
    upPressed = false;
  }
  else if(event.keyCode == 40) {
    downPressed = false;
  }
}

function mouseMoveHandler(event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;
  
  angle = Math.atan2(mouseY - y, mouseX - x);
}

function mouseDownHandler(event) {
  shootPressed = true;
}

function mouseUpHandler(event) {
  shootPressed = false;
}

function move() {
  if(rightPressed && x < canvas.width-10) {
    x += 5;
  }
  else if(leftPressed && x > 10) {
    x -= 5;
  }
  else if(upPressed && y > 10) {
    y -= 5;
  }
  else if(downPressed && y < canvas.height-10) {
    y += 5;
  }
}

function shoot() {
  if(shootPressed) {
    var bullet = {
      x: x,
      y: y,
      dx: Math.cos(angle),
      dy: Math.sin(angle),
      speed: 10
    };
    bullets.push(bullet);
    shootPressed = false; // pour éviter de tirer en continu
  }
}

function drawCharacter() {
  ctx.beginPath();
  
ctx.arc(x, y,10,0,Math.PI*2); // dessiner un cercle
ctx.fillStyle="blue";
ctx.fill();
ctx.closePath();

ctx.save(); // sauvegarder l'état du contexte
ctx.translate(x, y); // déplacer l'origine au centre du cercle
ctx.rotate(angle); // tourner le contexte selon l'angle
ctx.beginPath();
ctx.moveTo(10,0); // dessiner un triangle
ctx.lineTo(20,5);
ctx.lineTo(20,-5);
ctx.fillStyle="red";
ctx.fill();
ctx.closePath();
ctx.restore(); // restaurer l'état du contexte
}

function drawBullets() {
for(var i=0; i<bullets.length; i++) { // parcourir le tableau des projectiles
var bullet=bullets[i];
bullet.x+=bullet.dx*bullet.speed; // mettre à jour la position du projectile
bullet.y+=bullet.dy*bullet.speed;

if(bullet.x<0 || bullet.x>canvas.width || bullet.y<0 || bullet.y>canvas.height) { // supprimer le projectile s'il sort du canvas
bullets.splice(i,1);
i--;
continue; // passer à l'itération suivante
}

ctx.beginPath(); // dessiner le projectile
ctx.arc(bullet.x,bullet.y,2,0,Math.PI*2);
ctx.fillStyle="yellow";
ctx.fill();
ctx.closePath();
}
}

function draw() {
ctx.clearRect(0,0,canvas.width,canvas.height);

move();

shoot();

drawCharacter();

drawBullets();

requestAnimationFrame(draw);
}

draw();
