var snake;
var scl = 25;
var food;
var fps = 12;
var score = 0;
var maxscore=0;
var timer=0;
gameStarted= false;
timerStarted= false;

function setup() {
   createCanvas(600, 600);
   snake = new Snake();
   pickLocation();
}
function timeIt(){
   timer ++;
 }

// function playPause() {
//       if (snake.isPaused == true) {
//       if (snake.direction == 'up') {
//          snake.dir(0, -1);
//          snake.isPaused = false;
//       } else if (snake.direction == 'down') {
//          snake.dir(0, 1);
//          snake.isPaused = false;
//       } else if (snake.direction == 'left') {
//          snake.dir(-1, 0);
//          snake.isPaused = false;
//       } else if (snake.direction == 'right') {
//          snake.dir(1, 0);
//          snake.isPaused = false;
//       }
//    } else if (snake.isPaused == false) {
//       snake.dir(0, 0);
//       snake.isPaused = true;}
// }

function pickLocation() {
   var cols = floor(width / scl);
   var rows = floor((height - scl) / scl);
   food = createVector(floor(random(cols)), floor(random(rows)));
   food.mult(scl);
}

function draw() {
   frameRate(fps);
   background(51);
   fill(32);
   rect(0, height - scl, width, scl);
   fill(255);
   text("Score: " + score, scl, height - scl / 3);
   if (score > maxscore) {
      maxscore = score;
   }
   text("Max: " + maxscore, 10 * scl, height - scl / 3);

   if (gameStarted==true && snake.isPaused==false && timerStarted==false){
      setInterval(timeIt, 1000);
      timerStarted= true;
      }
      
   if (timer<60){
   text("Time : " + timer +"s",width- 4*scl,height-scl/3);
   }
   if (timer>=60){
      text("Time : " +floor(timer/60)+" min "+ timer%60 +"s",width- 4*scl,height-scl/3);
   }
   if (snake.eat(food)) {
      pickLocation();
      fps++;
      score += 100;
   }

   snake.death();
   snake.show();
   snake.update();

   fill(255, 0, 100);
   rect(food.x, food.y, scl, scl);

}

function keyPressed() {
   if (keyCode === UP_ARROW && snake.direction != "down") {
      snake.dir(0, -1);
      snake.direction = "up";
      snake.isPaused = false;
      gameStarted = true;
      

   } else if (keyCode === DOWN_ARROW && snake.direction != "up") {
      snake.dir(0, 1);
      snake.direction = "down";
      snake.isPaused = false;
      gameStarted = true;

   } else if (keyCode === LEFT_ARROW && snake.direction != "right") {
      snake.dir(-1, 0);
      snake.direction = "left";
      snake.isPaused = false;
      gameStarted = true;
   } else if (keyCode === RIGHT_ARROW && snake.direction != "left") {
      snake.dir(1, 0);
      snake.direction = "right";
      snake.isPaused = false;
      gameStarted = true;
   } else if (keyCode === 80) {

      playPause();
   }
}

function Snake() {
   this.x = 0;
   this.y = 0;
   this.xspeed = 0;
   this.yspeed = 0;
   this.total = 0;
   this.tail = [];
   this.isPaused = true;

   this.dir = function (x, y) {
      this.xspeed = x;
      this.yspeed = y;

   };

   this.eat = function (pos) {
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
         this.total++;
         return true;
      } else {
         return false;
      }
   };

   this.death = function () {
      if (snake.isPaused == false) {
         for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 0.1) {
               alert("Game Over");
               this.total = 0;
               this.tail = [];
               fps = 12;
               score = 0;
               timer = 0;
               clearInterval(timeIt);
            }
         }
      }
   };

   this.update = function () {
      if (this.total == this.tail.length) {
         for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
         }

      }

      this.tail[this.total - 1] = createVector(this.x, this.y);
      if (this.x > 0 - scl) {
         this.x = (this.x + this.xspeed * scl) % (width);
      } else {
         this.x = width;
      }

      if (this.y > 0 - scl) {
         this.y = (this.y + this.yspeed * scl) % (height - scl);
      } else {
         this.y = height - scl*2;
      }

   };

   this.show = function () {
      fill(255);
      for (var i = 0; i < this.tail.length; i++) {
         rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }
      rect(this.x, this.y, scl, scl);
   };
}