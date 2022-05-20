// criei um modelo de Chao
class Chao {
  constructor() {
    // fica dentro do constructor, tudo que serve para construir o objeto
    var opcoes = {
      isStatic: true
    }
  
    this.corpo = Bodies.rectangle(250, 690, 500, 20, opcoes)
    World.add(world, this.corpo)
  }

  // método responsável por desenhar o objeto
  desenha() {
    // preenche o objeto com a cor vermelha
    fill('brown')

    // desenhando um retangulo na posicao do objeto
  //  rect(this.corpo.position.x, this.corpo.position.y, 500, 20)
  }
}