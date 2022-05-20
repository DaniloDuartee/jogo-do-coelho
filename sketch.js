const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

let chao

let fruta
let corda, corda2, corda3
let conexao, conexao2, conexao3

let imagemFundo, imagemFruta

let coelho, imagemCoelho

let button, button2, button3

let coelhoSad, coelhoEat

let somCorda, somEat, somSad, sorAir,somJogo

let balao

let mute

function preload() {
  imagemFundo = loadImage("background.png")
  imagemFruta = loadImage("melon.png")
  imagemCoelho = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  coelhoSad  = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  coelhoEat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
 
 imagemCoelho.playing = true
 coelhoEat.playing = true
coelhoSad.playing = true
coelhoEat.looping = false
coelhoSad.looping = false

somSad = loadSound("sad.wav")
somEat = loadSound("eating_sound.mp3")
somAir = loadSound("air.wav")
somCorda = loadSound("rope_cut.mp3")
somJogo = loadSound("sound1.mp3")

}

function setup() {
  createCanvas(500,700);

  imagemCoelho.frameDelay = 20
  coelhoSad.frameDelay = 20
  coelhoEat.frameDelay = 20

  coelho = createSprite(250,630)
  coelho.addAnimation("piscando", imagemCoelho)
  coelho.addAnimation("triste", coelhoSad)
  coelho.addAnimation("comendo", coelhoEat)
  coelho.scale = 0.2



  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER)
  textSize(50)

  // criei um objeto do modelo Chao
  chao = new Chao()

  let frutaOpc = {
    density: 0.001
  }

  fruta = Bodies.circle(300,300,20,frutaOpc)

  corda = new Rope(4,{
    x: 375,
    y: 209
  })
  Composite.add(corda.body,fruta)

  corda2 = new Rope(7,{
    x: 345,
    y: 44
  })
  //Composite.add(corda2.body,fruta)

  corda3 = new Rope(8,{
    x: 35,
    y: 39
  })
  //Composite.add(corda3.body,fruta)

conexao = new Link(corda,fruta)
conexao2 = new Link(corda2,fruta)
conexao3 = new Link(corda3,fruta)

button = createImg("cut_btn.png")
button.position(20,30)
button.size(50,50)
button.mouseClicked(drop3)

button2 = createImg("cut_btn.png")
button2.position(330,35)
button2.size(50,50)
button2.mouseClicked(drop2)

button3 = createImg("cut_btn.png")
button3.position(360,200)
button3.size(50,50)
button3.mouseClicked(drop)

balao = createImg("balloon.png")
balao.position(10,250)
balao.size(150,100)
balao.mouseClicked(assoprar)

mute = createImg("mute.png")
mute.position(450,0)
mute.size(50,50)
mute.mouseClicked(mutar)

//somJogo.play()
somJogo.setVolume(0.2)
}

function draw() {
  background(51);
  image(imagemFundo,width/2,height/2, 500,700)
  
  Engine.update(engine);

 chao.desenha()

 if(fruta !== null){
  image(imagemFruta,fruta.position.x,fruta.position.y,80,80)
 }
 

 corda.show()
 corda2.show()
 corda3.show()



 if (collide(fruta,coelho)) {
 coelho.changeAnimation("comendo",coelhoEat)
 somEat.play()
 somEat.setVolume(1.5)
 }

 if (fruta !== null && fruta.position.y >= 650) {
   //console.log("caiu")
  coelho.changeAnimation("triste",coelhoSad)
  World.remove(world, fruta)
  fruta = null
  somSad.play()
  
  }

 drawSprites()
}

function drop() {
  corda.break()
  conexao.remove()
  conexao = null
  somCorda.play()
}

function drop2() {
  corda2.break()
  conexao2.remove()
  conexao2 = null
  somCorda.play()
}

function drop3() {
  corda3.break()
  conexao3.remove()
  conexao3 = null
  somCorda.play()
}

function assoprar() {
  somAir.play()
  Body.applyForce(fruta,{x: 0,y: 0 },{
  x: 0.01,
  y: 0  
  } )

}

function mutar (){
  if (somJogo.isPlaying()){
    somJogo.stop()
  } else {
    somJogo.play()
  }
}

function collide (bodyA,bodyB){

  if(bodyA !== null){
 
 var distance = dist(bodyA.position.x,bodyA.position.y,bodyB.position.x,bodyB.position.y)
 //console.log("chego3", distance)
 if (distance <= 80) {
  
    World.remove(world, fruta)
    fruta = null
    return true
 } else {
  return false} 
  }
}


