var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spy, spy_running, spy_collided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;


var gameOver, restart;


function preload(){

  
  backgroundImg = loadImage("background.jpg")

  
  spy_running = loadImage ("spy_running.png.jpg");
  spy_collided = loadImage ("spy_collided.jpg");
  
  groundImage = loadImage("background.jpg");
  
  
 /* obstacle1 = loadImage();
  //obstacle2 = loadImage();
 // obstacle3 = loadImage();
  obstacle4 = loadImage();*/
  
  gameOverImg = loadImage("Game-Over.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  

  
  spy = createSprite(50,height-70,20,50);
  
  
  spy.addImage("running", spy_running);
  spy.addImage("collided", spy_collided);
  spy.setCollider('circle',0,0,350)

  

  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage();
  
  restart = createSprite(width/2,height/2);
  restart.addImage();
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  

 
  obstaclesGroup = Group();
  
  score = 0;
}

function draw() {
 
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if(( keyDown("SPACE")) && spy.y  >= height-120) {
     
      spy.velocityY = -10;
       
    }
    
    spy.velocityY = spy.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  

   
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(spy)){
        collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
   
    ground.velocityX = 0;
    spy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
  ;
    
    
    spy.changeAnimation("collided",spy_collided);
    
    
    obstaclesGroup.setLifetimeEach(-1);
  
    
    if( mousePressedOver(restart)) {      
      reset();
      
    }
  }
  
  
  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    
  
    obstacle.velocityX = -(6 + 3*score/100);
    
   
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
              
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = spy.depth;
    spy.depth +=1;
    
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
 
  
  spy.changeAnimation("running", spy_running);
  
  score = 0;
  
}
