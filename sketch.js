// Define the Particle class
// ==========================================================================================================================================================================================================================
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocityX = random(-2, 2);
    this.velocityY = random(-2, 2);
    this.radius = 10;
    this.color = color(random(255), random(255), random(255));
  }

  // Update the position of the particle
  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Bounce off the canvas edges
    if (this.x < 0 || this.x > width) {
      this.velocityX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.velocityY *= -1;
    }
  }

  // Display the particle
  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 0.25);
  }
}
// ==========================================================================================================================================================================================================================
class Sprite {
  constructor(x, y, imgPath) {
    this.x = x;
    this.y = y;
    this.img = loadImage(imgPath); // Load and assign the sprite image in the constructor
  }

  display() {
    noSmooth(); // Disable antialiasing
    image(this.img, this.x, this.y, 80, 80);
  }
}
// ==========================================================================================================================================================================================================================
class Player {
  constructor(x, y, sprite) {
    this.sprite = new Sprite(x, y, sprite);
    this.speed = 2; // Adjust the speed as needed
  }

  // Handle player movement based on directional keys
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.sprite.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.sprite.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.sprite.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.sprite.y += this.speed;
    }
  }
  // Display the player by delegating to the internal sprite
  display() {
    this.sprite.display();
  }
}

// ==========================================================================================================================================================================================================================
class AnimatedSprite {
  constructor(x, y, spriteSheet, numFrames, frameWidth, frameHeight) {
    this.x = x;
    this.y = y;
    this.spriteSheet = spriteSheet;
    this.numFrames = numFrames;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameIndex = 0;
  }

  display() {
    let frameX = this.frameIndex * this.frameWidth;
    image(
      this.spriteSheet,
      this.x,
      this.y,
      this.frameWidth,
      this.frameHeight,
      frameX,
      0,
      this.frameWidth,
      this.frameHeight
    );
  }

  animate() {
    this.frameIndex = (this.frameIndex + 1) % this.numFrames;
  }
}
// ==========================================================================================================================================================================================================================
// Game entities!
// ==========================================================================================================================================================================================================================
let particles = [];
let mySprite;
let playerSprite;
function setup() {
  noSmooth(); // Disable antialiasing
  createCanvas(1920, 1080);
  //mySprite = new Sprite(100, 100, 'apple.png');
  playerSprite = new Sprite(100,100,'apple.png');
  myPlayer = new Player(100,100,playerSprite);
  for (let i = 0; i < 500; i++) {
    let x = random(width);
    let y = random(height);
    let particle = new Particle(x, y);
    particles.push(particle);
  }
}

function draw() {

  background(0);

  for (let particle of particles) {
    particle.update();
    particle.display();
  }
  //mySprite.display();
  myPlayer.move();
  myPlayer.display();
}