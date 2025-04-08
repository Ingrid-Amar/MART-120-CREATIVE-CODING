var size = 11
var movement = 1
var move 
var move1
var move2
var move3
var move4
var move5
var x = 21
var y = 21
var x1 = 21
var x2 = 279
var y1 = 21
var y2 = 479

function setup(){
  createCanvas(300,500);
  move = floor(random() * 10) + 1;
  move1 = floor(random() * 10) + 1;
  move2 = floor(random() * 10) + 1;
  move3 = floor(random() * 10) + 1;
  move4 = floor(random() * 10) + 1;
  move5 = floor(random() * 10) + 1;
  }

function draw() {
  background(220);
  rect(142.5,125,15,25);
  square(160,70,10);
  rect(170,80,10,50);
  square(130,70,10);
  rect(120,80,10,50);
  ellipse(150,100,50,60);
  triangle(100, 300,150, 150, 200, 300);
  square(115,140,70);
  rect(115,140,15,70);
  rect(170,140,15,70);
  rect(130,300,15,70);
  rect(155,300,15,70);
  point(140,95);
  point(160,95);
  point(150,100);
  line(140,110,160,110);
  textSize(size)
  if (size == 10 || size == 50) {
    movement *= -1;
  }
  size += movement;
  text("Ingrids Fit!",40,50);
  circle(x ,20, 20);
  circle(x, 480, 20)
  if (x >= 280 || x <= 20) {
    move *= -1;
  }
  x += move;
  circle(20 ,y, 20);
  circle(280, y, 20)
  if (y >= 480 || y <= 20) {
    move1 *= -1;
  }
  y += move1;
  circle(x1, y1, 20)
  circle(x2, y2, 20)
  if (x1 >= 280 || x1 <= 20) {
    move2 *= -1;
  }
  x1 += move2;
  if (x2 >= 280 || x2 <= 20) {
    move3 *= -1;
  }
  x2 += move3;
  if (y1 >= 480 || y1 <= 20) {
    move4 *= -1;
  }
  y1 += move4;
  if (y2 >= 480 || y2 <= 20) {
    move5 *= -1;
  }
  y2 += move5;

}