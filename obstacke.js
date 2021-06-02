function Obstacle(mapWidth, mapHeight,context){
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.context = context;
    this.size =  50;

    // this.halfSize = Math.floor(Math.random()*30)+30;
    // this.size =  this.halfSize*2;
 
    // this.angle = (Math.PI/180)*Math.floor(Math.random()*360);
 
    this.left = Math.floor(Math.random()*(mapWidth-this.size))+1;
    this.top = -Math.floor(Math.random()*(mapHeight -this.size)) + 1;
 
    this.speedY = 4;
    this.speedX = 4;
    
     this.isCollided = false;
     this.explosionCounter = 2;
}

var rockImg = new Image();
rockImg.src = "images/bullet.png";

// var explodeImg = new Image();
// explodeImg.src = "images/explosion.png";


Obstacle.prototype.draw = function(){
    let img = rockImg;
 this.context.drawImage(img,this.left,this.top,this.size,this.size);
}
Obstacle.prototype.update = function(){
    if(this.isCollided)
        this.explosionCounter--;
    if(this.explosionCounter==0)
        this.isExploded = true;

    if(this.left < 0 || this.right > this.mapWidth)
        this.speedX = -this.speedX;
    if(this.bottom > this.mapHeight) {
        this.explode();
        this.explodeObstracke = true;
    }
 
    this.top += this.speedY;
    this.left += this.speedX;
    this.right = this.left + this.size;
    this.bottom = this.top + this.size;
}

Obstacle.prototype.collide = function(x,y){
    return this.left <= x && this.right >= x &&
        this.top <= y && this.bottom >= y;
}

Obstacle.prototype.explode = function(){
    this.isCollided = true;
}


