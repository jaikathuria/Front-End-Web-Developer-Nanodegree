var score = 0;
var HighScore = 0;
var playerImages = [
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png"
]
// Used for creating random speed in case of Enemies and Select random image for player so declared out so both objects can use it.
var random = function(lower_limit,upper_limit){
    return Math.floor(Math.random()*(upper_limit-lower_limit+1)+lower_limit);
}
// Enemies our player must avoid
var Enemy = function(x,y) {
        // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.maxSpeed = 400;
    this.minSpeed = 100;
    this.speed = random(this.maxSpeed,this.minSpeed);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        this.x = this.x  + this.speed*dt;
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if(this.x > 550){
            this.speed = random(400,100);
            this.x = -50;
        }
    };

// Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Now write your own player class
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite =playerImages[random(0,4)];
};
    // This class requires an update(), render() and
    // a handleInput() method.

    Player.prototype.update = function(){
        if (this.y < 54){
            this.reset();
            score = score + 1

        }
        //detection for collisions with the enemeys
        for (i=0;i<allEnemies.length;i++){
          if (((this.y-9)==(allEnemies[i].y))&&(this.x > allEnemies[i].x -75)&&(this.x < allEnemies[i].x+75)){
             this.reset();
             score = 0;
          }
        }
        //updating the score
        if(HighScore < score){
            HighScore = score;
        }

        document.getElementById('score').innerHTML = "Score : " + score + " | High Score : " + HighScore;
    }
    
    Player.prototype.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
    Player.prototype.handleInput = function(input){
        // Key inputs, on detection of key this function moves the player according to the kley pressed.

        if (input == "left") {
            this.x -= 101;
        }
        else if (input == "right") {
            this.x += 101;
        }
        else if (input == "up"){
            this.y -= 83;
        }
        else if (input == "down") {
            this.y += 83;
        }
     // boundries for the players so that they should not go outside the canvas.
        //for y axis boundary check
        if (this.y < -11){
            this.y += 83;
        }
        if (this.y > 404 ){
            this.y -= 83;
        }
        // for x axis boundry check
        if (this.x > 404){
            this.x -= 101;
        }
        if(this.x < 0){
            this.x += 101;
        }
    }
    // Changes the position of the player back to the initial.
    Player.prototype.reset = function(){
        this.x = 202;
        this.y = 404;
    };


    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(0,63),
    new Enemy(-50,146),
    new Enemy(-20,229)
]
// Place the player object in a variable called player
var player =  new Player(202,404);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left', // left  arrow key
        38: 'up',   // up    arrow key
        39: 'right',// right arrow key
        40: 'down', // down  arrow key
        65: 'left', // left  arrow key
        83: 'down', // down  arrow key
        68: 'right',// right arrow key
        87: 'up'    // up    arrow key
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
