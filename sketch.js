let fish;

function setup() {
  new Canvas(500, 500);
  displayMode('centered');

  // Create the fish sprite
  fish = new Sprite();
  fish.diameter = 50;

  // Define custom drawing for the fish sprite
  fish.draw = function() {
    fill(0, 150, 255); // Body color
    ellipse(0, 0, 50, 20); // Fish body
    fill(0, 100, 200);
    triangle(-25, 0, -40, -10, -40, 10); // Tail fin
    fill(255);
    ellipse(15, -5, 5, 5); // Eye
    fill(0);
    ellipse(16, -5, 2, 2); // Pupil
  };
}

function draw() {
  background('skyblue');

  // Make the fish move towards the mouse when clicked
  if (mouse.presses()) {
    fish.speed = 10;
    fish.moveTo(mouse);
  }
}
