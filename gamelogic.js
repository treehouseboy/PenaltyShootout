var gameCanvas;
var GameCanvasContext;

var playerX;
var playerY;
var playerRadius;
var playerSpeed = 2;
var playerColour = "#f200ff";

var goalKeeperX;
var goalKeeperY;
var goalKeeperSpeed;

var ballX;
var ballY;
var ballSpeed = 2;
var ballShot = false;
var ballRadius = 10;
var ballColour = "#ffffff";

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
  moveBall();
  render();
}

function render() {
  GameCanvasContext.clearRect(0,0,gameCanvas.width,gameCanvas.height);
  renderPitch();
  renderPlayer();
  renderBall();
}

function renderPitch() {
  var heightFromTop = 20;
  var widthFromSide = 20;
  var pitchHeight = gameCanvas.height;
  var pitchWidth = gameCanvas.width;


  //Canvas border
  GameCanvasContext.strokeStyle= 'white';
  GameCanvasContext.strokeRect(widthFromSide,heightFromTop,pitchWidth-(2*widthFromSide),pitchHeight-(2*heightFromTop));

  //Penalty Box
  GameCanvasContext.strokeRect(pitchWidth/5,heightFromTop,pitchWidth-(2*pitchWidth/5),pitchHeight/4);
  //6yd Box
  GameCanvasContext.strokeRect(pitchWidth*0.35,heightFromTop,pitchWidth*0.3,pitchHeight/12);

  //Penalty circle
  GameCanvasContext.beginPath();
  GameCanvasContext.arc(pitchWidth/2,pitchHeight*(170/600),(pitchWidth-(2*pitchWidth/5))/7,0,Math.PI);
  GameCanvasContext.stroke();
  GameCanvasContext.closePath();

  //Penalty spot
  GameCanvasContext.beginPath();
  GameCanvasContext.arc(pitchWidth/2,pitchHeight*(140/600),2,0,2*Math.PI);
  GameCanvasContext.fillStyle = 'white';
  GameCanvasContext.fill();
  GameCanvasContext.stroke();
  GameCanvasContext.closePath();
}

function renderBall() {
  renderCircle(ballX, ballY, ballRadius, ballColour);
}

function renderCircle(x, y, radius, colour) {
  GameCanvasContext.beginPath();
  GameCanvasContext.arc(x, y, radius, 0, Math.PI*5);
  GameCanvasContext.fillStyle = colour;
  GameCanvasContext.fill();
  GameCanvasContext.closePath();
}

function ballShoot() {
  ballShot = true;
}

function moveBall() {
  if (ballShot) {
    ballY -= ballSpeed;
  }
}

function movePlayer() {
  if(!ballShot) {
    ballX = playerX;
    ballY = playerY;
  }

  if (leftKeyHeld) {
    if (playerX >= 0 + playerRadius) {
      playerX = playerX - playerSpeed;
    }
  }
  else if (rightKeyHeld) {
    if (playerX <= gameCanvas.width - playerRadius) {
      playerX = playerX + playerSpeed;
    }
  }
}

function renderPlayer() {
  renderCircle(playerX, playerY, playerRadius, playerColour);
}

function keyPressed() {
  if (event.keyCode == 37) {
    leftKeyHeld = true;
  }
  else if (event.keyCode == 39) {
    rightKeyHeld = true;
  }
  else if (event.keyCode == 32) {
    ballShoot();
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
