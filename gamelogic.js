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

var numGoals = 0;
var numMisses = 0
var numAttempts = 5;

var goalStartX = 200;
var goalStartY = 27;
var goalWidth = 100;
var goalHeight = 5;;

var goalDetected = false;
var goalAdded = false;

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
  checkGoal();
  addGoalIfDetected();
  checkIfResetNeeded();
  render();
}

function render() {
  GameCanvasContext.clearRect(0,0,gameCanvas.width,gameCanvas.height);
  renderPitch();
  renderPlayer();
  renderBall();
  renderText();
  renderGoal();
}

function renderGoal() {
  GameCanvasContext.beginPath();
  GameCanvasContext.rect(goalStartX, goalStartY, goalWidth, goalHeight);
  GameCanvasContext.fillStyle = 'white';
  GameCanvasContext.fill();
  GameCanvasContext.closePath();
}

function renderText() {
  GameCanvasContext.font="20px Georgia";
  GameCanvasContext.fillText("Goals: " + numGoals, gameCanvas.width - 100, 20);
  GameCanvasContext.fillText("Misses: " + numMisses, 10, 20);
  GameCanvasContext.fillText("Shots: " + numAttempts, gameCanvas.width/2 - 40, 20);
  if(goalDetected) {
    GameCanvasContext.font="30px Georgia";
    GameCanvasContext.fillText("Goal!", gameCanvas.width/2 - 40, 300);
  }
}

function renderPitch() {
  var heightFromTop = 27;
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
  GameCanvasContext.arc(pitchWidth/2,pitchHeight*(170/600) + 7,(pitchWidth-(2*pitchWidth/5))/7,0,Math.PI);
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
  numAttempts--;
}

function moveBall() {
  if (ballShot) {
    ballY -= ballSpeed;
  }
}

function movePlayer() {
  if(!ballShot) {
    ballX = playerX;
    ballY = playerY - 10;
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

function checkGoal() {
  if(ballX >= goalStartX && ballX <= goalStartX + goalWidth) {
    if (ballY >= goalStartY && ballY <= goalStartY + goalHeight) {
      console.log("goal detected");
      goalDetected = true;
    }
  }
}

function addGoalIfDetected() {
  if(goalDetected && !goalAdded) {
    numGoals++;
    goalAdded = true;
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

function resetGame() {
  if(!goalDetected) {
    numMisses++;
  }
  playerX = gameCanvas.width/2;
  playerY = gameCanvas.height - 50;
  ballShot = false;
  goalDetected = false;
  goalAdded = false;
}

function checkIfResetNeeded() {
  if(ballY < -250) {
    resetGame();
  }
}
