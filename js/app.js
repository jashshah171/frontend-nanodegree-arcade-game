/*----------------------------------------------------------------------------*/
/*-----------------------------Enemy------------------------------------------*/

// Enemies our player must avoid
var Enemy = function(x,y,speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // Reset the enemy with a new speed after it goes off screen
    // enemy musyt start off screen at -100 position
    this.offScreenX = 505;
    this.startingX = -100;
    // check if enemy is off the canvas i.e more than the width = 505
    if (this.x >= this.offScreenX) {
        this.x = this.startingX;
        this.randomSpeed();
    }
    //checkCollision called
    this.checkCollision();
};

// Speed Multiplier, we increase this value to increase difficulty once player reached to bigger scores
// Credit https://github.com/ncaron/frontend-nanodegree-arcade-game/blob/master/js/app.js
var speedMultiplier = 40;

// Random speed generator for enemy bugs
Enemy.prototype.randomSpeed = function (){

    // Speed is a random number from 1-10 times speedMultiplier
    this.speed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
};

// Draw the enemy on the screen, required method for game
// Draw the scoreboard on the screen, credit
// https://discussions.udacity.com/t/having-trouble-displaying-the-score/26963
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "black";
    ctx.font = "16px Comic Sans MS";
    //display score on the screen which gets updated timely
    ctx.fillText("Score: " + player.playerScore, 40, 70);
    // display life which increases when player collects heart
    ctx.fillText("Lives: " + player.playerLives, 141, 70);
    //Difficulty parameter which get timely changed depending on player's score
    ctx.fillText("Difficulty: " + speedMultiplier, 260, 70);
};

// Check for collision. Borrowed from
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollision = function() {

    // Set hitboxes for collision detection
    var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var enemyBox = {x: this.x, y: this.y, width: 50, height: 40};
    // Check for collisions, if playerBox intersects enemyBox, we have one
    if (playerBox.x < enemyBox.x + enemyBox.width &&
        playerBox.x + playerBox.width > enemyBox.x &&
        playerBox.y < enemyBox.y + enemyBox.height &&
        playerBox.height + playerBox.y > enemyBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// Collision detected, decrement playerLives and reset the player
Enemy.prototype.collisionDetected = function() {

    player.playerLives -= 1;
    player.characterReset();
};

/*----------------------------------------------------------------------------*/
/*--------------------------------Gem-----------------------------------------*/

// star  the player should try to pick up for more points
var Star = function(x,y) {

    this.x = x;
    this.y = y;
    this.sprite = 'images/Star.png';
    this.starWaitTime = undefined;
};

// Update star , call checkCollision
Star.prototype.update = function() {

    this.checkCollision();
};

// Draw the star to the screen
Star.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check for collision
Star.prototype.checkCollision = function() {

    // Set hitboxes for collision detection
    var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var starBox = {x: this.x, y: this.y, width: 60, height: 70};
    // Check for collisions, if playerBox intersects gemBox, we have one
    if (playerBox.x < starBox.x + starBox.width &&
        playerBox.x + playerBox.width > starBox.x &&
        playerBox.y < starBox.y + starBox.height &&
        playerBox.height + playerBox.y > starBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// star collision detected, hide the star  off canvas,
// Increase player score, wait 5 seconds, then reset the star
Star.prototype.collisionDetected = function() {

    this.x = 900;
    this.y = 900;
    player.playerScore += 30;
    this.wait();
};

// Call setTimeout in a function so we can assign it to a variable
// Necessary for clearTimeout(Star.StarWaitTime) to work
Star.prototype.wait = function() {
    this.StarWaitTime = setTimeout( function() {
        star.starReset();
    }, 5000);
};

// Reset the Star to a new location
Star.prototype.starReset = function() {

    // Star  appear at one of the following x positions: 0, 101, 202, 303, 404
    this.x = (101 * Math.floor(Math.random() * 4) + 0);
    // Star  appear at one of the following Y positions: 60, 145, 230
    this.y = (60 + (85 * Math.floor(Math.random() * 3) + 0));
};
/*----------------------------------------------------------------------------*/
/*--------------------------------Heart---------------------------------------*/

// Hearts the player should try to pick up
var Heart = function(x,y) {

    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
    this.heartWaitTime = undefined;
};

// Update heart, call checkCollision
Heart.prototype.update = function() {

    this.checkCollision();
};

// Draw the heart to the screen
Heart.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for collision
Heart.prototype.checkCollision = function() {

    // Set hitboxes for collision detection
    var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var heartBox = {x: this.x, y: this.y, width: 60, height: 70};
    // Check for collisions, if playerBox intersects heartBox, we have one
    if (playerBox.x < heartBox.x + heartBox.width &&
        playerBox.x + playerBox.width > heartBox.x &&
        playerBox.y < heartBox.y + heartBox.height &&
        playerBox.height + playerBox.y > heartBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// Heart collision detected, hide the heart off canvas,
// Increment player lives, wait 30 seconds, then reset the heart
Heart.prototype.collisionDetected = function() {

    this.x = 900;
    this.y = 900;
    player.playerLives += 1;
    this.wait();
};

// Call setTimeout in a function so we can assign it to a variable
// Necessary for clearTimeout(heart.heartWaitTime) to work
Heart.prototype.wait = function() {
    this.heartWaitTime = setTimeout( function() {
        heart.heartReset();
    }, 30000);
};

// Reset the heart to a new location
Heart.prototype.heartReset = function() {

    //Hearts appear at one of the following x positions: 0, 101, 202, 303, 404
    this.x = (101 * Math.floor(Math.random() * 4) + 0);
    //Hearts appear at one of the following Y positions: 70, 155, 240
    this.y = (70 + (85 * Math.floor(Math.random() * 3) + 0));
};

/*----------------------------------------------------------------------------*/
/*------------------------------Player----------------------------------------*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Start the player at 200x by 400y
// credit https://discussions.udacity.com/t/need-help-refactoring/32466
var Player = function() {

    this.startingX = 200; // which is middle column of the canvas
    this.startingY = 400; // which is last row of the  green block of the canvas
    this.x = this.startingX;
    this.y = this.startingY;
    this.sprite = 'images/char-boy.png';
    this.playerScore = 0;
    this.playerLives = 3; //  starts with 3 , which increases as and when player collects hearts
};

// Required method for game
// Check if playerLives is 0, if so call reset
Player.prototype.update = function() {

    if (this.playerLives === 0) {
    // clearTimeout(heart.heartWaitTime);
    reset();
    }
};

// Resets the player position to the start position
Player.prototype.characterReset = function() {

    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;
};

// Increase score and increase difficulty when player reaches top of water
Player.prototype.success = function() {

    this.playerScore += 20;
    speedMultiplier += 5;
    this.characterReset();
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move the player according to keys pressed
Player.prototype.handleInput = function(allowedKeys) {
// 101 gives user a column wise movement
// 83 gives user a row wise movement
    switch (allowedKeys) {
        case "left":
            //check for wall, otherwise move left
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case "right":
            //check for wall, otherwise move right
            if (this.x < 402) {
                this.x += 101;
            }
            break;
        case "up":
            //check if player reached top of water, if so call success function,
            // otherwise move up
            if (this.y < 0) {
                this.success();
            } else {
                this.y -= 83;
            }
            break;
        case "down":
            //check for bottom, otherwise move down
            if (this.y < 400) {
                this.y += 83;
            }
            break;
    }
};

/*----------------------------------------------------------------------------*/
/*-------------------------Instantiate Objects--------------------------------*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Instantiate player
var player = new Player();

// Empty allEnemies array
var allEnemies = [];

// Instantiate all enemies, set to 3, push to allEnemies array
for (var i = 0; i < 3; i++) {
    //startSpeed is a random number from 1-10 times speedMultiplier
    var startSpeed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
    //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}

// Instantiate Gem
// Gems appear at one of the following x positions: 0, 101, 202, 303, 404
// And at one of the following Y positions: 60, 145, 230
var star = new Star (101 * Math.floor(Math.random() * 4) + 0, 60 +
    (85 * Math.floor(Math.random() * 3) + 0));

// Instantiate heart
// Hearts appear at one of the following x positions: 0, 101, 202, 303, 404
// And at one of the following Y positions: 70, 155, 240
var heart = new Heart (101 * Math.floor(Math.random() * 4) + 0, 70 +
    (85 * Math.floor(Math.random() * 3) + 0));

/*----------------------------------------------------------------------------*/
/*---------------------------Event Listener-----------------------------------*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

/* Re-written as a named function so we can use removeEventListener
 * during "startGame" and "gameOver." Before, the event listener was active
 * during those states, so pressing arrow keys changed the starting position
 * of the player when we switched to "inGame"
 * credit http://stackoverflow.com/questions/4950115/removeeventlistener-on-anonymous-functions-in-javascript
 */
var input = function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
};
document.addEventListener('keyup', input);
