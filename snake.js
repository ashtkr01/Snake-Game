
function init(){
    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 600;
    pen = canvas.getContext('2d');
    cs = 34;
    
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


            this.cells.pop();
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
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
}
//Function Update:
function update(){
    // console.log("In Update");
    snake.updateSnake();
}
//Gameloop:
function gameloop(){
    draw();
    update();
}

init();

var f = setInterval(gameloop,100);