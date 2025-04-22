let player;
let obstacles = [];
let staticObs = null;
let won = false;

function setup() {
  createCanvas(600, 400);
  createPlayer();
  createObstacles(6);
}

function draw() {
  background(220);
  drawInstructions();
  drawGoal();
  drawPlayer();
  movePlayer();
  drawObstacles();
  drawStaticObstacle();
  checkWin();
  displayWinMessage();
}

function createPlayer() {
  player = createVector(50, 200);
}

function createObstacles(count) {
  for (let i = 0; i < count; i++) {
    obstacles.push({
      pos: createVector(random(600), random(400)),
      size: random(20, 50),
      color: color(random(255), random(255), random(255)),
      speed: createVector(random(-2, 2), random(-2, 2))
    });
  }
}


function drawInstructions() {
  fill(0);
  textSize(22);
  text("Try to get to the green rectangle without hitting an obstacle", 10, 20);
}

function drawGoal() {
  fill(0, 255, 0);
  rect(550, 170, 40, 60);
}

function drawPlayer() {
  fill(0, 0, 255);
  circle(player.x, player.y, 20);
}

function drawObstacles() {
  for (let obs of obstacles) {
    fill(obs.color);
    ellipse(obs.pos.x, obs.pos.y, obs.size);
    obs.pos.add(obs.speed);
    wrapAround(obs);
  }
}

function drawStaticObstacle() {
  if (staticObs !== null) {
    fill(150);
    square(staticObs.x, staticObs.y, 40);
  }
}

function displayWinMessage() {
  if (won) {
    fill(0);
    textSize(32);
    text("You Win!", 230, 200);
  }
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) player.x -= 2;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) player.x += 2;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) player.y -= 2;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) player.y += 2;

  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

function wrapAround(obs) {
  if (obs.pos.x < 0) obs.pos.x = width;
  else if (obs.pos.x > width) obs.pos.x = 0;

  if (obs.pos.y < 0) obs.pos.y = height;
  else if (obs.pos.y > height) obs.pos.y = 0;
}

function checkWin() {
  if (
    player.x > 550 &&
    player.x < 590 &&
    player.y > 170 &&
    player.y < 230
  ) {
    won = true;
  }
}

function mousePressed() {
  if (staticObs === null) {
    staticObs = {
      x: mouseX - 20,
      y: mouseY - 20,
    };
  }
}
