


let fish;
let waveOffset = 0;
let bubbles = [];
let seaweeds = [];
let lives = 3;
let dayNightCycleDuration = 20000; // 20 seconds
let startTime;
let fishSpeed = 3; // Speed of the background movement

function setup() {
  createCanvas(500, 500);
  startTime = millis(); // Initialize the start time

  // Create the fish sprite
  fish = new Sprite(width / 2, height / 2, 50, 20); // Center the fish

  // Define custom drawing for the fish sprite
  fish.draw = function() {
    fill(155, 0, 255); // Body color
    ellipse(0, 0, 50, 20); // Fish body
    fill(0, 100, 200);
    triangle(-25, 0, -40, -10, -40, 10); // Tail fin
    fill(255);
    ellipse(15, -5, 5, 5); // Eye
    fill(0);
    ellipse(16, -5, 2, 2); // Pupil
  };

  // Create bubbles at random positions
  for (let i = 0; i < 10; i++) {
    bubbles.push(new Bubble(random(0, width), random(height - 100, height), random(1, 3)));
  }

  // Create seaweed objects
  for (let i = 0; i < 5; i++) {
    seaweeds.push(new Seaweed(random(0, width), height - random(50, 150)));
  }
}

function draw() {
  updateBackground(); // Update background color based on the day-night cycle

  drawSun();
  drawSand();
  // Draw waves in the background
  drawWaves();

  // Update and display the bubbles
  for (let bubble of bubbles) {
    bubble.update();
    bubble.display();
  }

  // Update and display seaweed
  for (let seaweed of seaweeds) {
    seaweed.update();
    seaweed.display();
  }

  // Handle fish movement based on mouse position
  handleFishMovement();

  // Draw the lives in the top left corner
  drawLives();
}

// Function to handle fish movement based on mouse position
function handleFishMovement() {
  // Set fish's position based on the mouse's position
  fish.x = mouseX; // Move the fish horizontally based on mouseX
  fish.y = mouseY; // Move the fish vertically based on mouseY

  // Prevent the fish from going out of bounds horizontally
  fish.x = constrain(fish.x, 25, width - 25);

  // Prevent the fish from going out of bounds vertically
  fish.y = constrain(fish.y, 25, height - 25);
}

// Function to draw the sun in the background
function drawSun() {
  let elapsed = millis() - startTime;
  let cycleProgress = (elapsed % dayNightCycleDuration) / dayNightCycleDuration;
  // Position the sun higher along an arc in the sky
  let sunX = width * cycleProgress;
  let sunY = map(sin(cycleProgress * PI), 0, 1, height / 4, height / 8); // Higher arc for the sun

  // Color changes from bright yellow (day) to darker orange (evening)
  let sunColor = color(255, map(cycleProgress, 0, 1, 200, 100), 0);

  noStroke();
  fill(sunColor);
  ellipse(sunX, sunY, 60, 60); // Draw the sun
}

// Function to update the background color based on the day-night cycle
function updateBackground() {
  let elapsed = millis() - startTime;
  let cycleProgress = (elapsed % dayNightCycleDuration) / dayNightCycleDuration;

  // Map colorValue to transition between light blue (day) and dark blue (night)
  let colorValue = map(sin(cycleProgress * TWO_PI), -1, 1, 30, 150);

  // Set background color using colorValue, with blue tones for day and night effect
  background(colorValue, colorValue + 50, 255); // Light blue to dark blue transition
}

// Function to draw the sand at the bottom of the screen
function drawSand() {
  noStroke();
  fill(194, 178, 128); // Sand color
  rect(0, height - 50, width, 50); // Draw a rectangle at the bottom
}

// Function to draw the lives in the top left corner
function drawLives() {
  fill(255, 0, 0);
  noStroke();
  
  for (let i = 0; i < lives; i++) {
    // Draw heart shapes to represent lives
    heart(30 + i * 30, 30, 20); // Position hearts with spacing
  }
}

// Function to draw a heart shape
function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 2, x, y + size);
  bezierVertex(x + size, y + size / 2, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

// Function to draw waves in the background
function drawWaves() {
  noStroke();
  fill(0, 150, 255, 100); // Semi-transparent water color

  waveOffset += fishSpeed; // Controls wave movement speed

  for (let y = 100; y <= height; y += 20) { // Draw multiple wave lines
    beginShape();
    for (let x = 0; x <= width; x += 20) {
      let waveHeight = 10 * sin((x * 0.1) + waveOffset + y * 0.05); // Creates wave pattern
      vertex(x, y + waveHeight);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
}

// Bubble class for creating and updating bubble objects
class Bubble {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.size = random(10, 30);
    this.speed = speed;
  }

  // Update the bubble's position
  update() {
    this.y -= this.speed; // Move the bubble upwards
    this.x += random(-1, 1); // Add some horizontal random movement

    // Reset the bubble to the bottom once it goes off the screen
    if (this.y < 0) {
      this.y = height;
      this.x = random(0, width);
    }
  }

  // Display the bubble
  display() {
    noStroke();
    fill(255, 255, 255, 150); // White with transparency for the bubbles
    ellipse(this.x, this.y, this.size, this.size); // Draw the bubble
  }
}

// Seaweed class for creating seaweed objects
class Seaweed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = random(50, 150); // Random height for the seaweed
  }

  // Update the seaweed's position (falling effect)
  update() {
    this.y += 1; // Move downwards to simulate swimming past
    if (this.y > height) {
      this.y = height - random(50, 150); // Reset to a new position
      this.x = random(0, width); // Random x position
    }
  }

  // Display the seaweed
  display() {
    stroke(0, 128, 0); // Green color for seaweed
    strokeWeight(4);
    line(this.x, this.y, this.x, this.y - this.height); // Draw seaweed stalk
  }
}

