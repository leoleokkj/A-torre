var trex, trex_running, edges;
var groundImage;
var chao, chaoI;
var nuvem;
var nuvemIma;
var aleatorio;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  nuvemIma = loadImage("cloud.png");
}

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  chao = createSprite(300,190,600,20); 
chao.addImage("chao", groundImage);
chao.velocityX=-1.5; 
chaoI = createSprite(50,195,20,7);
chaoI.visible= false
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  
  //registrando a posição y do trex
  //console.log(frameCount)
  
  //pular quando tecla de espaço for pressionada
  if(keyDown("space")&& trex.y>=168){
    trex.velocityY = -10;



  }
  
  trex.velocityY = trex.velocityY + 0.5;
  
 //impedir que o trex caia
  trex.collide(chaoI)
//reiniciar o solo/ nao deixar ele sair da tela
if (chao.x <0) {
chao.x = chao.width/2;

}
clouds();
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

}

 


}
