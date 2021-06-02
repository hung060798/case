function Tank(mapWidth, mapHeight){
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.radius = 20;
    this.speedX = 0;
    this.speedY = 0;
    this.power = 3;    
    this.cx = mapWidth/2;
    this.cy = mapHeight - 20;
    this.angle = 0;
    this.balls = [];
    this.cannonHeight = this.radius/2; 
    this.cannonWidth = this.cannonHeight*3;    
    this.isHideObstacke = false;
    this.gameOver = false;
}
Tank.prototype.draw = function(context){    
    context.beginPath();
    context.fillStyle = "black";
    context.rect(this.cx-20,this.cy-20,40,40);
    context.closePath();
    context.fill();

    // cannon
    context.save();
    context.translate(this.cx,this.cy);
    context.rotate(this.angle);
    context.beginPath();
    context.fillStyle = "red";
    context.rect(0,-this.cannonHeight/2,this.cannonWidth,this.cannonHeight);
    context.closePath();
    context.fill();
    context.restore();
    
    // yellow circle    
    context.beginPath();
    context.fillStyle = "yellow";
    context.arc(this.cx,this.cy,this.radius/2,0,Math.PI*2,true);
    context.closePath();
    context.fill();
    
    for(let i=0;i<this.balls.length;i++)
    {
        this.balls[i].draw(context);
    }

}

Tank.prototype.update = function(obstacles){

for(let j=0;j<obstacles.length;j++) {
    let ob = obstacles[j];


    if(ob.collide(this.cx, this.cy)) {
        // do something useful
       this.gameOver = true;
    }
}
     
    for(let i=0;i<this.balls.length;i++)
    {
        let ball = this.balls[i];
        if (ball != undefined) {
          if(ball.update())
          {
              this.balls.splice(i--,1);
          }else{
              for(let j=0;j<obstacles.length;j++)
              {
                  let ob = obstacles[j];
   
                  if(ob.collide(ball.cx, ball.cy))
                  {
                      // do something useful
                      this.isHideObstacke = true;
                      this.balls.splice(i--,1);
                      ob.explode();
                      obstacles.splice(j--,1);
                      
                      break;
                  }
              }
          }
        } else {
         obstacles = [];
         this.isHideObstacke = true;
         break;
        }
        
    }
}

Tank.prototype.fire = function(){        
    if(this.balls.length > 9)
        return;
    let directionX = Math.cos(this.angle);
    let directionY = Math.sin(this.angle);
    
    let startX = this.cx + this.cannonWidth * directionX;
    let startY = this.cy + this.cannonWidth * directionY;

    let ball = new Ball(this.mapWidth,this.mapHeight,startX,startY,directionX,directionY);
    this.balls.push(ball);
}
Tank.prototype.rotateCannon = function(targetX, targetY){
    let dx = targetX - this.cx;
    let dy = targetY - this.cy;
    this.angle = Math.atan2(dy,dx);
}
Tank.prototype.move = function(){
    this.cx += this.speedX;
    this.cy += this.speedY;

    this.left = this.cx - this.radius;
    this.top = this.cy - this.radius;
    this.right = this.cx + this.radius;
    this.bottom = this.cy + this.radius;
}
Tank.prototype.resetSpeed = function(){
    this.speedX = 0;
    this.speedY = 0;
}
Tank.prototype.moveUp = function(){
    this.speedY = -this.power;
    if(this.top < 0)
        this.speedY = -this.speedY;
        
}
Tank.prototype.moveDown = function(){    
    this.speedY = this.power;
     if(this.bottom > this.mapHeight)
        this.speedY = -this.speedY;
}
Tank.prototype.moveLeft = function(){    
    this.speedX = -this.power;
    if(this.left < 0)
        this.speedX = -this.speedX;
    
}
Tank.prototype.moveRight = function(){    
    this.speedX = this.power;    
     if(this.right > this.mapWidth)
        this.speedX = -this.speedX;
}

Tank.prototype.handleInput = function(keyStates){
    this.speedX = 0;
    this.speedY = 0;
 
    if(keyStates[Keys.KEY_W])
        this.moveUp();
    if(keyStates[Keys.KEY_S])
        this.moveDown();
    if(keyStates[Keys.KEY_A])
        this.moveLeft();
    if(keyStates[Keys.KEY_D])
        this.moveRight();
    this.move();
}