let fish;
let sharks = [];
let sharkCount = 5;

function setup() {
  createCanvas(800, 600);
  
  // Create the fish (player)
  fish = createSprite(width / 2, height / 2, 40, 20);
  fish.shapeColor = color(0, 100, 250);

  // Create sharks (enemies)
  for (let i = 0; i < sharkCount; i++) {
    let shark = createSprite(random(width), random(height), 60, 30);
    shark.shapeColor = color(150, 0, 0);
    shark.setSpeed(random(1, 3), random(360)); // Random movement
    sharks.push(shark);
  }
}

function draw() {
  background(0, 150, 255); // Ocean blue background

  // Fish movement
  if (keyIsDown(LEFT_ARROW)) fish.position.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) fish.position.x += 5;
  if (keyIsDown(UP_ARROW)) fish.position.y -= 5;
  if (keyIsDown(DOWN_ARROW)) fish.position.y += 5;

  // Loop over sharks to check for collisions and movement
  for (let shark of sharks) {
    if (fish.overlap(shark)) {
      gameOver();
      break;
    }

    // Make sharks wrap around screen
    if (shark.position.x > width) shark.position.x = 0;
    if (shark.position.x < 0) shark.position.x = width;
    if (shark.position.y > height) shark.position.y = 0;
    if (shark.position.y < 0) shark.position.y = height;
  }

  drawSprites();
}

function gameOver() {
  noLoop(); // Stop the game
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Game Over!", width / 2, height / 2);
}
