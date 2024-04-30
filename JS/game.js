// For this project, we are using p5.js.
// A library that will help us to draw
// the graphics of the game.

// Define the size of each grid space
const gridSpace = 30;

// Declare variables
let fallingPiece;
let gridPieces = [];
let lineFades = [];
let gridWorkers = [];

// In-game variables
let currentScore = 0;
let currentLevel = 1;
let linesCleared = 0;

// Game loop variables
let ticks = 0;
let updateEvery = 15;
let updateEveryCurrent = 15;
let fallSpeed = gridSpace * 0.5;
let pauseGame = false;
let gameOver = false;

// Define the edges of the game area
const gameEdgeLeft = 150;
const gameEdgeRight = 450;

// Define the colors for the blocks
const colors = [
    "#dca3ff",
    "#ff90a0",
    "#80ffb4",
    "#ff7666",
    "#70b3f5",
    "#b2e77d",
    "#ffd700"
]

// Setup will be the funcion we will call
// from from the begining of the game
function setup() {
    createCanvas(600, 450);

    // Create a new falling piece
    fallingPiece = new PlayPiece();
    fallingPiece.resetPiece();

    // We set the font for the text
    textFont("Ubuntu");
}

// With this function we will draw every
// frame of the game.
function draw() {
    // We define the colors we will going
    // to use in the game
    const colorDark = "#0d0d0d";
    const colorLight = "#304550";
    const colorBackground = "#e1eeb0";

    // We set the color of the background
    background(colorBackground);

    // We draw the right side of the panel
    fill(25);
    noStroke();
    rect(gameEdgeRight, 0, 150, height);

    // We draw the left side of the panel
    rect(0, 0, gameEdgeLeft, height);

    // We draw the score rectangle
    fill(colorBackground);
    rect(450, 80, 150, 70);

    // We draw the next piece rectangle
    rect(460, 405, 130, 130, 5, 5);

    // Draw the level rectangle
    rect(460, 210, 130, 60, 5, 5);

    // Draw the lines rectangle
    rect(460, 280, 130, 60, 5, 5);

    // Draw the score lines
    fill(colorLight);
    rect(450, 85, 150, 20);
    rect(450, 110, 150, 4);
    rect(450, 140, 150, 4);

    // We draw the score banner
    fill(colorBackground);
    rect(460, 60, 130, 35, 5, 5);

    // Draw the score banner inner rectangle
    strokeWeight(3);
    noFill();
    stroke(colorLight);
    rect(465, 65, 120, 25, 5, 5);

    // We draw the next piece inner rectangle
    rect(465, 215, 120, 50, 5, 5);

    // Draw the lines inner rectangle
    rect(465, 285, 120, 50, 5, 5);

    // Draw the info labels
    fill(25);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text("Score", 525, 85);
    text("Level", 525, 238);
    text("Lines", 525, 308);

    // Draw the current info
    textSize(24);
    textAlign(CENTER);
    text(currentScore, 560, 135);
    text(currentLevel, 560, 260);
    text(linesCleared, 560, 330);

    // Draw the game border
    stroke(colorDark);
    line(gameEdgeRight, 0, gameEdgeLeft, height);

    // Show the falling piece
    fallingPiece.show();

    // Speed up the piece when the down
    // arrow is pressed
    if(keyIsDown(DOWN_ARROW)) {
        updateEvery = 2;
    } else {
        updateEvery = updateEveryCurrent;
    }


    // Update the game state
    if(!pauseGame) {
        ticks++;

        if(ticks >= updateEvery) {
            ticks = 0;
            fallingPiece.fall(fallSpeed);
        }
    }

    // Show the grid pieces
    for(let i = 0; i < gridPieces.length; i++) {
        gridPieces[i].show();
    }

    // Show the fading lines
    for(let i = 0; i < lineFades.length; i++) {
        lineFades[i].show();
    }

    // Process the grid workers
    if(gridWorkers.length > 0) {
        gridWorkers[0].work();
    }

    // Explain the controls
    textAlign(CENTER);
    fill(255);
    noStroke();
    textSize(14);
    text("Controls:\n↑\n← ↓ →\n", 75, 155);
    text("Left and Right:\nmove side to side", 75, 230);
    text("Up:\nrotate", 75, 280);
    text("Down:\nfall faster", 75, 330);
    text("R:\nreset game", 75, 380);

    // Show the game over text
    if (gameOver) {
        fill(colorDark);
        textSize(54);
        textAlign(CENTER);
        text("Game Over!", 300, 270);
    }

    // Draw the game border
    strokeWeight(3);
    stroke('#304550');
    noFill();
    rect(0, 0, width, height);
}