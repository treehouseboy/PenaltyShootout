var gameCanvas;
var GameCanvasContext;

var playerX;
var playerY;
var playerRadius;
var playerSpeed;

var goalKeeperX;
var goalKeeperY;
var goalKeeperSpeed;

var ballX;
var ballY;
var ballSpeed;

var leftKeyHeld = false;
var rightKeyHeld= false;


function gameInit() {
  gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.style.backgroundColor = "#09b800";
  GameCanvasContext = gameCanvas.getContext("2d");
  playerX = gameCanvas.width/2;
  playerY = gameCanvas.height - 50;
  playerRadius = 15;
  setInterval(gameRun,16);
}

function gameRun() {
  movePlayer();
  render();
}

function render() {
  renderPlayer();
}

function movePlayer() {
  if (leftKeyHeld) {
    playerX = playerX - 2;
  }
  else if (rightKeyHeld) {
    playerX = playerX + 2;
  }
}

function renderPlayer() {
  GameCanvasContext.clearRect(0,0,gameCanvas.width,gameCanvas.height);
  GameCanvasContext.beginPath();
  GameCanvasContext.arc(playerX, playerY, playerRadius, 0, Math.PI*5);
  GameCanvasContext.fillStyle = "#f200ff";
  GameCanvasContext.fill();
  GameCanvasContext.closePath();
}

function keyPressed() {
  if (event.keyCode == 37) {
    leftKeyHeld = true;
  }
  else if (event.keyCode == 39) {
    rightKeyHeld = true;
  }
}

function keyReleased() {
  if (event.keyCode == 37) {
    leftKeyHeld = false;
  }
  else if (event.keyCode == 39) {
    rightKeyHeld = false;
  }
}
