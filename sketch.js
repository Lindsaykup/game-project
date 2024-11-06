let fish;
let waveOffset = 0;
let bubbles = [];
let fishYSpeed = 0;
let gravity = 0.5;
let jumpStrength = -10;
let seaweeds = [];
let lives = 3;


function setup() {
  new Canvas(500, 500);
  displayMode('centered');

  // Create the fish sprite
  fish = new Sprite();
  fish.diameter = 50;

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
  background('skyblue');

  // draw waves in background
  drawWaves();

  // Make the fish move towards the mouse when clicked
  if (mouse.presses()) {
    fish.speed = 10;
    fish.moveTo(mouse);
  }


  // Make the fish jump when the up arrow key is pressed
  if (keyIsDown(UP_ARROW)) {
    fishYSpeed = jumpStrength; // Apply the jump strength when the up arrow is pressed
  }

  // Apply gravity to make the fish fall down after jumping
  fishYSpeed += gravity;

  // Update fish's y position
  fish.y += fishYSpeed;

  // Prevent the fish from going below the water surface (bottom of the canvas)
  if (fish.y > height - 25) {
    fish.y = height - 25;
    fishYSpeed = 0; // Stop downward movement when it hits the ground
  }


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
   // Draw the lives in the top left corner
   drawLives();
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
function drawWaves() { // <-- Added function
  noStroke();
  fill(0, 150, 255, 100); // Semi-transparent water color

  waveOffset += 0.1; // <-- Controls wave movement speed

  for (let y = 100; y <= height; y += 20) { // Draw multiple wave lines
    beginShape();
    for (let x = 0; x <= width; x += 20) {
      let waveHeight = 10 * sin((x * 0.1) + waveOffset + y * 0.05); // <-- Creates wave pattern
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
    line(this.x, this.y, this.x, this.y + this.height); // Draw vertical seaweed lines
  }
}










