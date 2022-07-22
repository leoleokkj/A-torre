var trex, trex_running, edges;
var groundImage;
var chao, chaoI;
var nuvem;
var nuvemIma;
var aleatorio;
var cacto;
var c1, c2, c3, c4, c5, c6; 
var spike;
var sky;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameOver, gameO;
var restart, recomeçar;
var trexCo;
var pontos=0;
var somPulo, somMorte, somPontos;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  nuvemIma = loadImage("cloud.png");
  c1 = loadImage("obstacle1.png");
  c2 = loadImage("obstacle2.png");
  c3 = loadImage("obstacle3.png");
  c4 = loadImage("obstacle4.png");
  c5 = loadImage("obstacle5.png");
  c6 = loadImage("obstacle6.png");
  trexCo = loadAnimation("trex_collided.png");
  gameOver = loadImage("gameOver.png");
  somPulo = loadSound("jump.mp3");
  somMorte = loadSound("die.mp3");
  somPontos = loadSound("checkPoint.mp3");
  recomeçar = loadImage("restart.png");
}

function setup(){
  //criando a tela
  createCanvas(600,200);
gameO = createSprite(300, 60, 10, 10);
gameO.addImage(gameOver);
restart = createSprite(300,100,10,10);
restart.addImage(recomeçar);
gameO.scale = 0.7
restart.scale = 0.7

  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("scared", trexCo);
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  //raio de colisão do trex
  trex.setCollider("rectangle",0,0,60,60);
  trex.debug = false;

  edges = createEdgeSprites();
  
  chao = createSprite(300,190,600,20); 
  chao.addImage("chao", groundImage);
   
  
  chaoI = createSprite(50,195,20,7);
  chaoI.visible= false
 
  spike = new Group();
  sky = new Group();

}


function draw(){
  //definir a cor do plano de fundo 
  background("white");

  //exibindo a pontuação
  textSize(30);
  text(pontos,500,50);
  
  //registrando a posição y do trex
  //console.log(frameCount)
  if(gamestate == PLAY){
    chao.velocityX=-6-3*pontos/100
    gameO.visible = false
    restart.visible = false
   // chao.velocityX=-3; 
  //pontuação
  console.log(frameCount);
  pontos = pontos + Math.round(getFrameRate()/60);
  //pontos +=

  //pular quando tecla de espaço for pressionada
  if(keyDown("space")&& trex.y>=168){
    trex.velocityY = -10;
    somPulo.play();
  }

  //gerar cactos
  cactos();

  //gravidade
  trex.velocityY = trex.velocityY + 0.5;
  
  //impedir que o trex caia
  trex.collide(chaoI)
  
  //reiniciar o solo/ nao deixar ele sair da tela
  if (chao.x <0) {
    chao.x = chao.width/2;
  }

  //gerar nuvens
  clouds();

  //colisão do trex com os cactos
  if(spike.isTouching(trex)){
    gamestate = END;
  }

  }
  else if(gamestate == END){
    chao.velocityX = 0;
    trex.velocityY = 0;
    spike.setVelocityXEach(0);
    sky.setVelocityXEach(0);
trex.changeAnimation("scared", trexCo);
    spike.setLifetimeEach(-1);
    sky.setLifetimeEach(-1);
gameO.visible = true
restart.visible = true
if(mousePressedOver(restart)){
reset();


}


    }

  //desenhar os sprites;  
  drawSprites();


}
function reset (){

gamestate = PLAY;
trex.changeAnimation("running", trex_running)
pontos = 0
sky.destroyEach();
spike.destroyEach();


}



function clouds (){

if(frameCount%120==0){
  nuvem = createSprite (575,30,50,50);
  nuvem.velocityX = -2
  nuvem.addImage (nuvemIma);
  //aleatorio=Math.round(random (1,4))
  //console.log(aleatorio);
  nuvem.y= Math.round(random(25,120))
  console.log (trex.depth);
  console.log (nuvem.depth);
  trex.depth = nuvem.depth+1;

  nuvem.lifetime = 330;
  sky.add(nuvem);
}
}

function cactos (){

if(frameCount%100==0){

cacto = createSprite(590,180,20,50)
cacto.velocityX = -6-3*pontos/100
var cn = Math.round(random(1,6))
switch(cn){
case 1: cacto.addImage (c1);
break;
case 2: cacto.addImage (c2);
break;
case 3: cacto.addImage (c3);
break;
case 4: cacto.addImage (c4);
break;
case 5: cacto.addImage (c5);
break;
case 6: cacto.addImage (c6);
break;
default : break;
}
cacto.scale = 0.5;
cacto.lifetime=300;
spike.add(cacto);


}




}
