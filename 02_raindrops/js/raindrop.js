'use es6';

module.exports = class Raindrop {
  constructor(xPos, yPos) {
    this.age = 0;
    this.lifespan = 1 + (Math.random() - .5);
    this.radius = 150;
    this.x = xPos;
    this.y = yPos;
  }

  drawCircle(dt, ctx) {
    ctx.beginPath();
    const radius = this.radius * this.age/this.lifespan;
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = `rgba(20,20,250,${1 - this.age/this.lifespan})`;
    ctx.stroke();
    this.age += dt/1000;
    console.log("age: "+this.age);
  }
};
