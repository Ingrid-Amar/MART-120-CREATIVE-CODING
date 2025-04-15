let player;
let obstacles = [];
let staticObs = null;
let exitZone;
let won = false;
//I found some built in's on there website 
function setup() {
  createCanvas(600, 400);

  player = createVector(50, 200);

  for (let i = 0; i < 6; i++) {
    obstacles.push({
      pos: createVector(random(600), random(400)),
      size: random(20, 50),
      color: color(random(255), random(255), random(255)),
      speed: createVector(random(-2, 2), random(-2, 2))
    });
  }
}

function draw() {
  background(220);
  textSize(22)
  text("Try to get to the green rectangle without hitting a obstacle", 10,20)
  
  fill(0, 255, 0);
  rect(550, 170, 40, 60);

  fill(0, 0, 255);
  circle(player.x, player.y, 20);

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A key
    player.x -= 2;
  } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D key
    player.x += 2;
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // W key
    player.y -= 2;
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // S key
    player.y += 2;
  }

  player.x = constrain(player.x, 0, 600);
  player.y = constrain(player.y, 0, 400);

  for (let i = 0; i < obstacles.length; i++) {
    let obs = obstacles[i];
    fill(obs.color);
    ellipse(obs.pos.x, obs.pos.y, obs.size);

    obs.pos.add(obs.speed);

    if (obs.pos.x < 0) {
      obs.pos.x = 600;
    } else if (obs.pos.x > 600) {
      obs.pos.x = 0;}
    if (obs.pos.y < 0) {
      obs.pos.y = 400;
    } else if (obs.pos.y > 400) {
      obs.pos.y = 0;
    }
}

  if (staticObs !== null) {
    fill(150);
    square(staticObs.x, staticObs.y, 40);
  }

  if (
    player.x > 550 &&
    player.x < 590 &&
    player.y > 170 &&
    player.y < 230
  ) {
    won = true;
  }

  if (won) {
    fill(0);
    textSize(32);
    text("You Win!", 230, 200);
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
