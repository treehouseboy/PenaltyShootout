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

  render();
}

function render() {
  renderPlayer();
}

function renderPlayer() {
  GameCanvasContext.beginPath();
  GameCanvasContext.arc(playerX, playerY, playerRadius, 0, Math.PI*5);
  GameCanvasContext.fillStyle = "#f200ff";
  GameCanvasContext.fill();
  GameCanvasContext.closePath();
}
