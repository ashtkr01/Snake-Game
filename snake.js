
function init(){
    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 600;
    pen = canvas.getContext('2d');
    cs = 34;
    game_over = false;

    food = getRandomFood();
    
    // crete snake;
    snake = {
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",

        createSnake:function(){
            for(var i = this.init_len-1;i>=0;i--)
            {
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){
            for(var i =0;i<this.cells.length;i++)
            {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs  - 2 , cs - 2);
            }
        },
        updateSnake:function(){
            // console.log("updating snake");
            console.log("Updating snake according to the direction property ");
            //Check if the snake has been eaten food , increase the length of the snake and generate new food as a object:
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX == food.x && headY == food.y){
                console.log("Food has been eaten");
                food = getRandomFood();
            }
            else{
                this.cells.pop();
            }

            
            
            var nextX,nextY;

            // var X = headX + 1;
            // var Y = headY;

            if(this.direction == "right")
            {
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction == "left")
            {
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == "down")
            {
                nextX = headX;
                nextY = headY + 1;
            }
            else
            {
                nextX = headX ;
                nextY = headY - 1;
            }
            // if(nextX > W-(cs*this.cells.length) || rect.x < 0){
            //     rect.speed *= -1;
            //     // rect.y += rect.speed;
            // }
            // if(nextY > H-(cs*this.cells.length) || rect.y < 0){
            //     rect.speed *= -1;
            //     // rect.y += rect.speed;
            // }
            this.cells.unshift({x:nextX,y:nextY});

            //Write a logic that prevent snake from going out

            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);

            if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y)
            {
                game_over = true;
            }
        }
    };
    snake.createSnake();


    //Add a event Listener on the document Object:
    function keyPressed(e){
        console.log("Key Pressed",e.key);
        //Conditional statement:
        if(e.key == "ArrowRight")
        {
            snake.direction = "right";
        }
        else if(e.key == "ArrowLeft")
        {
            snake.direction = "left";
        }
        else if(e.key == "ArrowDown")
        {
            snake.direction = "down";
        }
        else if(e.key == "ArrowUp")
        {
            snake.direction = "up";
        }
    }

    document.addEventListener('keydown',keyPressed);
}

function draw(){
    //console.log("In Draw")

    //Erase the old frame:
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.fillRect(food.x*cs , food.y*cs , cs,cs);
}


//Function Update:
function update(){
    // console.log("In Update");
    snake.updateSnake();
}
//Get Random Foord:

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);

    var food={
        x:foodX,
        y:foodY,
        color:"red",
    };
    return food;
}
//Gameloop:
function gameloop(){
    if(game_over ==true){
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();
}

init();

var f = setInterval(gameloop,100);