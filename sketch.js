/*
for(var i = lives; i > 0; i--){
      image(life, i*38, 75, 50, 50);
    }
*/

var N1load,N1load2,N1
var Life=3
var shotsound,TM
var backgroundload,ground,groundLoad
var highgroundload,highground,cloudload,cloud
var laughsound,Torch2
var bulletImage,bullet,Bg_Music
var Torchload,LogoLoad,Logo,BulletFire,Torch
var Potload,Pot
var gameState="Preset"
var PotBroke=0
var PotBreak,BirdCry,returnHomeLoad,returnHome
var birdLoad,bird,GameoverLoad,Gameover
var crashScore=PotBroke
var Instruction,InstructionLoad,Instruc,InstrucLoad,Life1Load,Life1,Life2,Life3
function preload(){
  backgroundload = loadImage("starryNight.png")
  N1load = loadAnimation("image (3).png","image (4).png","image (5).png","image (6).png","image (7).png"); 
  N1load2= loadAnimation("image (4).png")
  shotsound = loadSound("Shot.wav")
  groundLoad = loadImage("Ground.png")
  highgroundload = loadImage("Ground2.png")
  cloudload = loadImage("cloud.png")
  laughsound = loadSound("LaughSound.wav")
  bulletImage = loadImage("Bullet.png");
  Bg_Music = loadSound("ARCADE Music.wav")
  Torchload = loadAnimation("Torch1.png","Torch2.png","Torch3.png","Torch4.png","Torch5.png","Torch6.png")
  LogoLoad = loadImage("Untitled (9).png")
  BulletFire = loadSound("BulletOnFire.wav")
  Potload = loadImage("Pot.png");
  PotBreak = loadSound("PotBroke.wav")
  birdLoad=loadAnimation("Bird1.png","Bird2.png","Bird3.png","Bird4.png","Bird5.png","Bird6.png","Bird7.png","Bird8.png")
  GameoverLoad=loadImage("GameOver.png")
  BirdCry=loadSound("BirdCry.wav")
  returnHomeLoad=loadImage("returnHome.png");
  InstructionLoad=loadImage("Instructions.png");
  InstrucLoad=loadImage("Instruc.png")
  Life1Load=loadImage("Life.png")
}

function setup() {
  createCanvas(800,400);

  Bg_Music.loop()

  var background=createSprite(400,200,800,400)
  background.addImage(backgroundload)
  background.scale=0.7
  background.x=400
  background.y=200


  //opening logo
  Logo = createSprite(400,200,20,20)
  Logo.addImage(LogoLoad)
  Logo.scale = 0.4

  //the highground moves up and down
  highground = createSprite(160,230,20,20);
  highground.addImage(highgroundload)
  highground.scale=1
  highground.x=50

  //the PC
  N1 = createSprite(75,200,20,20)
  N1.addAnimation("Shoot",N1load);
  N1.addAnimation("wait",N1load2)
  N1.scale=0.2

  //static ground
  ground = createSprite(320,400,20,20);
  ground.addImage(groundLoad);

  ground2=createSprite(890,400,20,20);
  ground2.addImage(groundLoad)
  ground2.scale=1.2

  //aesthetic
  Torch = createSprite(200,320,20,20)
  Torch.addAnimation("check",Torchload)
  Torch.scale=0.3

  Torch2 = createSprite(750,320,20,20)
  Torch2.addAnimation("check",Torchload)
  Torch2.scale=0.3

  
  Gameover = createSprite(400,200,20,20)
  Gameover.addImage(GameoverLoad)
  Gameover.visible=false

  returnHome = createSprite(400,300,20,20);
  returnHome.addImage(returnHomeLoad);
  returnHome.scale=0.2
  returnHome.visible = false

  BulletGrp=createGroup();
  PotGrp=createGroup()
  BirdGrp=createGroup()

  Instruction=createSprite(300,50,20,20);
  Instruction.addImage(InstructionLoad);
  Instruction.scale=0.3
  Instruction.visible=true

  Instruc=createSprite(600,200,20,20);
  Instruc.addImage(InstrucLoad)
  Instruc.scale=0.4
  Instruc.visible=true

  Life1=createSprite(700,30,20,20)
  Life1.addImage(Life1Load);
  Life1.scale=0.2
  
  Life2=createSprite(740,30,20,20)
  Life2.addImage(Life1Load);
  Life2.scale=0.2

  Life3=createSprite(780,30,20,20)
  Life3.addImage(Life1Load);
  Life3.scale=0.2

  //Torch.debug="true"
  Torch.setCollider("Rectangle",0,-45,120,90)
  //Torch2.debug="true"
  Torch2.setCollider("Rectangle",0,-45,120,90)
  gameState="Preset"
  
  //Logo.debug="true";
  Logo.setCollider("Rectangle",0,-100,500,500)
  }

  function draw() {

  background(255,255,255); 
  drawSprites();
  console.log(gameState)
  
  //GameState = PRESET
  if(gameState==="Preset"){
    Life=3
    //to start the game click on the Trials
    if(mousePressedOver(Logo)){
      gameState = "Start";
      Logo.visible=false;
    }
    
    PotBroke=0
    highground.y = N1.y + 80;
  }

  //GameState = START
  if(gameState === "Start"){
    if(Life==3){
      Life1.visible=true
      Life2.visible=true
      Life3.visible=true
    }
    textSize(20)
    fill("white")
    text("Score: "+PotBroke,10,25)
    Instruction.visible=false
    Instruc.visible=false
    //The fire sound is played when the bullet touches the Torch
    if(BulletGrp.isTouching(Torch)||(BulletGrp.isTouching(Torch2))){
    BulletFire.play()
    
    }

   
    else{
      BulletFire.stop()
    }
    

    //PC moves with the mouse, the highground positioned 80px more than the PC
    N1.y = mouseY;
    highground.y=N1.y+80
    
    //spawn the bullet
    PotGrp.depth=N1.depth-1
    PotGrp.depth=ground2.depth+1
    PotGrp.depth=ground.depth+1
   
    //Destroy the pots
    
    
      
    //Space key => waiting animation
    if(N1.y<360){
      if(keyWentDown(32)){
        N1.changeAnimation("wait",N1load2)
        
        shotsound.setVolume(0.5)  
        
      }
      else{

      }
      for (var i = 0; i < BirdGrp.length; i++) {
        if (BirdGrp.get(i).isTouching(BulletGrp)) {
          BirdGrp.get(i).destroy()
          //BulletGrp.get(i).destroy()
          Life=Life-1
          BirdCry.play()
        }
      }
    }
    if(Life===2){
      Life1.visible=false;
    }
    if(Life===1){
      Life2.visible=false;
    }
    if(Life===0){
      Life3.visible=false;
      gameState="End"
    }
    spawnBullet();
    spawnPots();
    spawnBirds()
    
}
if(gameState==="End"){
  textSize(20)
    fill("white")
    text("Score: "+PotBroke,10,25)
    Instruction.visible=false
  Gameover.visible=true
  BulletGrp.destroyEach()
  BirdGrp.destroyEach()
  returnHome.visible=true;
  if(PotBroke>crashScore){
    crashScore=PotBroke
  }
  if(mousePressedOver(returnHome)){
    gameState="Preset"
    Gameover.visible=false
    returnHome.visible=false;
    Logo.visible=true;
  }
}

spawnClouds()
console.log(gameState)

textSize(20)
fill("white")


text("CrashScore: "+crashScore,10,50)

  }
  function spawnClouds() {
  //write code here to spawn the clouds
    if (frameCount % 40 === 0) {
      cloud = createSprite(900, 100, 40, 10);
      cloud.y = Math.round(random(80, 180));
      cloud.addImage(cloudload);
      cloud.scale = 1;
      cloud.lifetime=280
      cloud.velocityX = -3;
      cloud.depth = N1.depth;
      N1.depth = N1.depth + 1
      cloud.depth = highground.depth;
      highground.depth = highground.depth + 1
      cloud.depth=Logo.depth
      Logo.depth=Logo.depth+1
      BirdGrp.depth=cloud.depth+1
    }
}

//spawn bullets
function spawnBullet(){
  if(frameCount%7===0){
    if(N1.y<360){
      if(keyDown(32)){
        shotsound.play()
        N1.changeAnimation("Shoot",N1load)
        bullet=createSprite(N1.x+22,N1.y-15,20,20)
        bullet.addImage(bulletImage);
        bullet.scale=0.08
        bullet.velocityX=20
        
        bullet.lifetime=36
       // bullet.debug="true"
       BulletGrp.add(bullet);
       
       }
    }

  }
  for (var i = 0; i < BulletGrp.length; i++) {
    if (BulletGrp.get(i).isTouching(BirdGrp)) {
      bullet.destroy()}
  }
  
  for (var i = 0; i < PotGrp.length; i++) {
    if (PotGrp.get(i).isTouching(BulletGrp)) {
      bullet.destroy();
     
        PotGrp.get(i).destroy() ;
        PotBreak.play()
        PotBroke=PotBroke+1
        laughsound.setVolume(1.3)  
        laughsound.play()
    }
  }
 
  
}

function spawnPots(){
  if(frameCount%20 === 0){
    Pot = createSprite(200,-10,10,10)
    Pot.addImage(Potload);
    Pot.scale=0.5
    Pot.x=Math.round(random(Torch.x+100,Torch2.x))
    Pot.velocityY=+10
    Pot.lifetime=40
    PotGrp.add(Pot)
    //Pot.debug="true";
    Pot.setCollider("Rectangle",-125,0,100,90)
   }
 }
 function spawnBirds(){
   if(frameCount%60===0){
  bird=createSprite(800,200,20,20);
  bird.addAnimation("Fly",birdLoad);
  bird.y=Math.round(random(0,360))
  bird.lifetime=180
  bird.velocityX=-7
  bird.depth=PotGrp.depth
  bird.scale=0.2
  BirdGrp.add(bird)
  bird.setCollider("Rectangle",0,0,380,330)
  

}
}

