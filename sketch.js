let fish;
let coins = [];
let trash = [];
let bubbles = [];
let seaweeds = [];
let points = 0;
let lives = 3;
let waveOffset = 0;
let offsetX = 0; // Track fish movement on the X-axis
let offsetY = 0; // Track fish movement on the Y-axis
let dayNightCycleDuration = 20000; // 20 seconds
let startTime;

function setup() {
  createCanvas(500, 500);
  startTime = millis();

  // Create the fish sprite
  fish = new Sprite(0, 0, 50, 20);

  // Define custom drawing for the fish sprite
  fish.draw = function () {
    fill(155, 0, 255); // Body color
    ellipse(0, 0, 50, 20); // Fish body
    fill(0, 100, 200);
    triangle(-25, 0, -40, -10, -40, 10); // Tail fin
    fill(255);
    ellipse(15, -5, 5, 5); // Eye
    fill(0);
    ellipse(16, -5, 2, 2); // Pupil
  };

  // Create coins and trash
  for (let i = 0; i < 10; i++) {
    coins.push(new Item(random(-width, width * 2), random(-height, height * 2), 'coin'));
    trash.push(new Item(random(-width, width * 2), random(-height, height * 2), 'trash'));
  }

  // Create bubbles
  for (let i = 0; i < 10; i++) {
    bubbles.push(new Bubble(random(0, width), random(height - 100, height), random(1, 3)));
  }

  // Create seaweed
  for (let i = 0; i < 5; i++) {
    seaweeds.push(new Seaweed(random(0, width), height - random(50, 150)));
  }
}

function draw() {
  updateBackground(); // Day-night cycle background
  drawSun();
  drawWaves();

  translate(-offsetX + width / 2, -offsetY + height / 2);

  drawSand();

  // Display and update seaweed
  for (let seaweed of seaweeds) {
    seaweed.update();
    seaweed.display();
  }

  // Display and update bubbles
  for (let bubble of bubbles) {
    bubble.update();
    bubble.display();
  }

  // Display and update coins and trash
  for (let coin of coins) {
    coin.display();
    if (dist(fish.x + offsetX, fish.y + offsetY, coin.x, coin.y) < 25) {
      points += 10;
      coin.resetPosition();
    }
  }

  for (let tr of trash) {
    tr.display();
    if (dist(fish.x + offsetX, fish.y + offsetY, tr.x, tr.y) < 25) {
      lives -= 1;
      tr.resetPosition();
    }
  }

  // Move fish with arrow keys
  if (keyIsDown(LEFT_ARROW)) offsetX -= 5;
  if (keyIsDown(RIGHT_ARROW)) offsetX += 5;
  if (keyIsDown(UP_ARROW)) offsetY -= 5;
  if (keyIsDown(DOWN_ARROW)) offsetY += 5;

  // Draw the fish at the center of the screen
  fish.x = offsetX;
  fish.y = offsetY;

  // Draw points and lives
  drawHUD();

  // End game if lives are 0
  if (lives <= 0) {
    noLoop();
    textSize(50);
    fill(255, 0, 0);
    text("Game Over", offsetX - width / 4, offsetY - height / 2);
  }
}

// Draw HUD (points and lives)
function drawHUD() {
  noStroke();
  fill(255);
  textSize(20);
  text(`Points: ${points}`, offsetX - width / 2 + 10, offsetY - height / 2 + 30);

  fill(255, 0, 0);
  for (let i = 0; i < lives; i++) {
    heart(offsetX - width / 2 + 10 + i * 30, offsetY - height / 2 + 60, 20);
  }
}

// Draw a heart
function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 2, x, y + size);
  bezierVertex(x + size, y + size / 2, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

// Item class (coins and trash)
class Item {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.type = type;
  }

  display() {
    fill(this.type === 'coin' ? color(255, 215, 0) : color(150)); // Gold or gray
    ellipse(this.x, this.y, this.size, this.size);
  }

  resetPosition() {
    this.x = random(-width, width * 2);
    this.y = random(-height, height * 2);
  }
}

// Bubble class
class Bubble {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.size = random(10, 30);
    this.speed = speed;
  }

  update() {
    this.y -= this.speed;
    this.x += random(-1, 1);
    if (this.y < 0) {
      this.y = height;
      this.x = random(0, width);
    }
  }

  display() {
    noStroke();
    fill(255, 255, 255, 150);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

// Seaweed class
class Seaweed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = random(50, 150);
  }

  update() {
    this.y += 1;
    if (this.y > height) {
      this.y = height - random(50, 150);
      this.x = random(0, width);
    }
  }

  display() {
    stroke(0, 128, 0);
    strokeWeight(4);
    line(this.x, this.y, this.x, this.y - this.height);
  }
}

// Waves
function drawWaves() {
  noStroke();
  fill(0, 150, 255, 100);
  waveOffset += 1;
  for (let y = 100; y <= height; y += 20) {
    beginShape();
    for (let x = 0; x <= width; x += 20) {
      let waveHeight = 10 * sin((x * 0.1) + waveOffset + y * 0.05);
      vertex(x, y + waveHeight);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
}

// Sun
function drawSun() {
  let elapsed = millis() - startTime;
  let cycleProgress = (elapsed % dayNightCycleDuration) / dayNightCycleDuration;
  let sunX = width * cycleProgress;
  let sunY = map(sin(cycleProgress * PI), 0, 1, height / 4, height / 8);
  let sunColor = color(255, map(cycleProgress, 0, 1, 200, 100), 0);
  noStroke();
  fill(sunColor);
  ellipse(sunX, sunY, 60, 60);
}

// Background
function updateBackground() {
  let elapsed = millis() - startTime;
  let cycleProgress = (elapsed % dayNightCycleDuration) / dayNightCycleDuration;
  let colorValue = map(sin(cycleProgress * TWO_PI), -1, 1, 30, 150);
  background(colorValue, colorValue + 50, 255);
}

// Sand
function drawSand() {
  noStroke();
  fill(194, 178, 128);
  rect(0, height - 50, width, 50);
}
