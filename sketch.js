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
var PLAY = 1
var END = 0
var gamestate = PLAY
var  gameOver
var trexCo

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
trexCo = loadImage("trex_colçided.png");
gameOver = loadImage("gameOver.png");

}

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  chao = createSprite(300,190,600,20); 
chao.addImage("chao", groundImage);
chao.velocityX=-3; 
chaoI = createSprite(50,195,20,7);
chaoI.visible= false
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
spike = new Group();
sky = new Group();

}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  
  //registrando a posição y do trex
  //console.log(frameCount)
  if(gamestate == PLAY){

  //pular quando tecla de espaço for pressionada
  if(keyDown("space")&& trex.y>=168){
    trex.velocityY = -10;



  }
  

cactos()

  trex.velocityY = trex.velocityY + 0.5;
  
 //impedir que o trex caia
  trex.collide(chaoI)
//reiniciar o solo/ nao deixar ele sair da tela
if (chao.x <0) {
chao.x = chao.width/2;

}
clouds();
  }
 else if(gamestate == END){
 chao.velocityX = 0   
  }
  drawSprites();


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

nuvem.lifetime = 330
sky.add(nuvem)
}
}

function cactos (){

if(frameCount%100==0){

cacto = createSprite(590,180,20,50)
cacto.velocityX = -3
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
cacto.scale = 0.5
spike.add(cacto)

}




}
