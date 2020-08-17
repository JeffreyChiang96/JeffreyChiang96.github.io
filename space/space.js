//畫布設定
var canvas = document.getElementById("spaceCanvas");
var ctx = canvas.getContext("2d");

//變數設定（起始點, 移動速度)
var x = []; //函數在後面定義
var y = [];
var dx = 0;
var dy = 2;


//變數設定(障礙物數目, 球半徑)
var ballCount = 100; //球行列
var ballRadius = 10;

//變數設定(磚塊存放陣列)
var balls = [];
for(var c=0; c<ballCount; c++) {
    balls[c] = { x: 0, y: 0, status:1};
    x[c] = ballRadius*2 + getRandomInt(canvas.width-ballRadius*2) // 隨機的X位置
    y[c] = 0 - getRandomInt(10000) // 隨機的Y位置
}

//變數設定（平台, 控制鍵)
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
var paddleY = canvas.height-paddleHeight-50
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

//隨機函數
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//畫出障礙物
function drawBalls() {
    for (var c=0; c<ballCount; c++){
        if(balls[c].status === 1) { //當status === 1, 磚塊出現

            var ballX = x[c];
            var ballY = y[c];
            balls[c].x = ballX; //物件x起始位置，存到陣列
            balls[c].y = ballY; //物件y起始位置，存到陣列

            ctx.beginPath();
            ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#16A085";
            ctx.fill();
            ctx.closePath();
        }
    }
}

//畫出火箭
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//動作設定 (不斷的重畫)
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //清除畫布
    drawBalls();
    drawPaddle();

    //paddle左右控制，用滑鼠追蹤則忽略
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    else if (upPressed) {
        paddleY -= 7;
        if (paddleY < 0) {
            paddleY = 0;
        }
    }
    else if (downPressed) {
        paddleY += 7;
        if (paddleY + paddleHeight > canvas.height) {
            paddleY = canvas.height - paddleHeight;
        }
    }


    //變化量
    for (var c=0; c<ballCount; c++) {
        x[c] += dx;
        y[c] += dy;
    }
    requestAnimationFrame(draw); //比較合適的render方式
}

//控制鍵，獲取指令
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

//左右鍵，設定TF
function keyDownHandler(i) {
    if(i.key == "Right" || i.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(i.key == "Left" || i.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(i.key == "Up" || i.key == "ArrowUp") {
        upPressed = true;
    }
    else if(i.key == "Down" || i.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(i) {
    if(i.key == "Right" || i.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(i.key == "Left" || i.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(i.key == "Up" || i.key == "ArrowUp") {
        upPressed = false;
    }
    else if(i.key == "Down" || i.key == "ArrowDown") {
        downPressed = false;
    }
} //Right, Left 用於IE瀏覽器

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

draw();//比較合適的render方式