const canvas = document.getElementById('arena');
const ctx = canvas.getContext('2d');

//variables
let scoreText = "";
let score;
let highscoreText = "";
let highscore;
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};
let isTouch = false;

var isAnimationRun = false;
var isPlayerAlive = false;

let startGameBtn = document.querySelector('#startGameBtn');
let gameUI = document.querySelector('#gameUI');
let beginBoard = document.querySelector('#beginBoard');
let scoreBoard = document.querySelector('#scoreBoard');
let showScore = document.querySelector('#showScore');

//detect Mobile
function isMobile() {
    try {
        document.createEvent("TouchEvent"); return true;
    } catch (e) {
        return false;
    }
}

//detect event
window.addEventListener('keydown', function (evt) {
    keys[evt.code] = true;
    //game pause
    if (isPlayerAlive && keys['Escape']) {
        isAnimationRun = !isAnimationRun;
        Update();
    }
});

window.addEventListener('keyup', function (evt) {
    keys[evt.code] = false;
});

startGameBtn.addEventListener('click', () => {
    Start();
    gameUI.style.display = 'none';
})

//functions

function Start() {
    canvas.width = (window.innerWidth >= 450) ? 450 : window.innerWidth;
    canvas.height = (window.innerHeight >= 400) ? 400 : window.innerHeight;

    isAnimationRun = true;
    isPlayerAlive = true;

    gameSpeed = 5;
    gravity = 1;
    obstacles = [];
    spawnTimer = initialSpawnTimer;

    score = 0;
    highscore = 0;
    if (localStorage.getItem('highscore')) {
        highscore = localStorage.getItem('highscore');
    }

    scoreText = new Text("Score:" + score, 25, 25, 'lightgrey', 'left', 25);
    highscoreText = new Text("HS:" + highscore, canvas.width - 25, 25, 'lightgrey', 'right', 25);

    player = new Player(25, canvas.height - 300, 50, 50, 'lightgrey')
    requestAnimationFrame(Update);
}

let initialSpawnTimer = 100;
let spawnTimer = initialSpawnTimer;

//create obstacles
function RandomIntInRange(max, min) {
    return Math.round(Math.random() * (max - min) + min)
}

function SpawnObstacle() {
    let size = RandomIntInRange(20, 55);
    let type = (isMobile()) ? 0 : RandomIntInRange(0, 1); //0 ground 1 fly
    let rate = RandomIntInRange(0, 100);
    let buff = (rate > 90) ? 0 : 1; //0 obstacle 1 bonus

    let obstacle = new Obstacle(
        canvas.width + size,
        type ? canvas.height - size - player.originalHight / 2 - 10 : canvas.height - size,
        size,
        size,
        buff ? 'coral' : "goldenrod",
        type,
        buff);

    obstacles.push(obstacle);
}

function Update() {
    if (isAnimationRun) {
        requestAnimationFrame(Update);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //gameSpeed getting faster
        gameSpeed += 0.001;
        if (gameSpeed > 12) {
            gameSpeed = 12
        }

        spawnTimer--;
        if (spawnTimer <= 0) {
            SpawnObstacle();
            spawnTimer = initialSpawnTimer - gameSpeed * 10;
            if (spawnTimer < 30) {
                spawnTimer = 30;
            }
        }

        for (let i = 0; i < obstacles.length; i++) {
            let o = obstacles[i];
            o.Update();

            //Collision Detection
            if (player.x < o.x + o.w &&
                player.x + player.w > o.x &&
                player.y < o.y + o.h &&
                player.y + player.h > o.y) {
                if (!o.b) {
                    setTimeout(() => {
                        obstacles.splice(o, 1);
                    }, 0)
                    score = score + 100;
                } else {
                    player.w = 0;
                    player.h = 0;
                    isAnimationRun = false;
                    isPlayerAlive = false;

                    //save highscore
                    window.localStorage.setItem('highscore', highscore);

                    gameUI.style.display = 'flex';
                    beginBoard.style.display = 'none';
                    showScore.innerText = `${score}`
                    scoreBoard.style.display = 'block';
                }
            }

            if (o.x + o.w < 0) {
                setTimeout(() => {
                    obstacles.splice(i, 1);
                }, 0)
            }
        }

        scoreText.t = "Score:" + score;
        scoreText.Draw();

        if (score > highscore) {
            highscore = score;
            highscoreText.t = "HighScore:" + highscore;
        };

        highscoreText.Draw();

        player.Animate();

        score++;
    }
}