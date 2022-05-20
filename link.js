class Link {
  constructor(bodyA,bodyB){
let lastLink = bodyA.body.bodies.length -2
this.link = Constraint.create({
  bodyA: bodyA.body.bodies [lastLink],
  bodyB: bodyB,
  length: -10,
  stiffness: 0.01 
})

World.add(world,this.link)

  } 
  
  remove() {
    World.remove(world,this.link)
  }
}