//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];
//food
var foodX = blockSize * 10;
var foodY = blockSize * 10;
var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    placeFood();
    document.addEventListener("keyup", changeDirection); 
    //update()
    this.setInterval(update, 1000/6); //100 milliseconds  
}
function update() {
    if (gameOver) {
        return;
    }
    for (let row=0; row <board.height/blockSize; row++) {
        for (let col=0; col <board.width/blockSize; col++) {
            if ((row+col) % 2 == 0) {
                context.fillStyle = "#0d576a";
            }
           else{
                context.fillStyle = "#0b5460";
            } 
            context.fillRect(col*blockSize, row*blockSize, blockSize, blockSize);
        }               
    }
   
    context.fillStyle = "#7700ff";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
    for (let i=snakeBody.length-1;i>0;i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    context.fillStyle = "#00cccf";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i =0;i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);}
    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }
    for (let i=0;i<snakeBody.length;i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}
function startGame() {
    document.getElementById("start").innerHTML = "click any arrow key to start the game";}

function changeDirection(e) {
    if (e.code == "ArrowUp"&& velocityY != 1) {
        velocityX = 0;
        velocityY = -1;}

    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }                                       
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }   
 
    }



function placeFood() {
    //generate a random food location
    foodX = Math.floor(Math.random() * (cols-2)+1) * blockSize;
    foodY = Math.floor(Math.random() * (rows-2)+1) * blockSize;
}
