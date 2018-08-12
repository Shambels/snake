var snake;
var scl = 25;
var food;
var fps = 12;
var score = 0;

function setup() {
   createCanvas(600, 600);
   snake = new Snake();
   pickLocation();
   
}

function pickLocation() {
   var cols = floor(width / scl);
   var rows = floor((height-scl) / scl);
   food = createVector(floor(random(cols)), floor(random(rows)));
   food.mult(scl);
}

function draw() {
   frameRate(fps);
   background(51);
   fill(32);
   rect(0,height-scl,width,scl);
   fill(255);
   text("Score: "+score, (width-scl)/2, height-scl/3);
   if (snake.eat(food)) {
      pickLocation();
      fps++;
      score+=100;
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
   } else if (keyCode === DOWN_ARROW && snake.direction != "up") {
      snake.dir(0, 1);
      snake.direction = "down";
   } else if (keyCode === LEFT_ARROW && snake.direction != "right") {
      snake.dir(-1, 0);
      snake.direction = "left";
   } else if (keyCode === RIGHT_ARROW && snake.direction != "left") {
      snake.dir(1, 0);
      snake.direction = "right";
   }
}

function Snake() {
   this.x = 0;
   this.y = 0;
   this.xspeed = 1;
   this.yspeed = 0;
   this.total = 0;
   this.tail = [];

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
      for (var i = 0; i < this.tail.length; i++) {
         var pos = this.tail[i];
         var d = dist(this.x, this.y, pos.x, pos.y);
         if (d < 1) {
            alert("Game Over");
            this.total = 0;
            this.tail = [];
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
      if (this.x > 0-scl) {
         this.x = (this.x + this.xspeed * scl) % (width);
      } else {
         this.x = width;
      }
      if (this.y > 0-scl) {
         this.y = (this.y + this.yspeed * scl) % (height-scl);
      } else {
         this.y = height-scl;
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