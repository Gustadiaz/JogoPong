// Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// Velocidade da bolinha
let velocidadeX = 5;
let velocidadeY = 5;

// Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 7;
let raqueteAltura = 70;

// Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Sons do jogo
let raquetada;
let ponto;
let trilha;

let colidiu = false;

let chanceDeErrar = 0;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  verificaColisaoMinhaRaquete();
  verificaColisaoRaquete(xRaquete, xRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeX;
  yBolinha += velocidadeY;
}

function colisaoBorda(){
   if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeX *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeY *= -1;
  }   
}

  
function mostraRaquete(x, y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
  }



function movimentaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

// Caso queira jogar com outra pessoa 
// function movimentaRaqueteOponente(){
//   if (keyIsDown(87)) {
//         yRaqueteOponente -= 10;
//     }
//     if (keyIsDown(83)) {
//         yRaqueteOponente += 10;
//     }
// }

// Caso queira jogar com o computador
function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente
    calculaChanceDeErrar()
}

function verificaColisaoMinhaRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete +           raqueteAltura && yBolinha + raio > yRaquete) {
        velocidadeX *= -1;
        raquetada.play();
    }
}


function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeX *= -1;
        raquetada.play();
    }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 35
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 40
    }
  }
}