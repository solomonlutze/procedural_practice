'use es6';

const Flowerbud = require("./Flowerbud.js");
const {interpolateBetweenColors} = require("../../shared/Utils.js")

module.exports = class Flower {
  constructor(xPos, yPos) {
    this.age = 0;
    this.lifespan = 10 + 16 * (Math.random() - .5);
    this.bloomWiltRatio = .75;
    this.width = 4;
    this.height = 200 + 150 * (Math.random() - .5);
    this.color = {r: 0, g: 255, b: 0, a: 255}
    this.wiltColor = {r: 140, g: 105, b: 10, a: 255}
    this.flowerbud = new Flowerbud();
    this.x = xPos;
    this.y = yPos;
  }

  // Once blooming starts,
  // create a bud centered on the top of the flower

  grow(dt, ctx) {
    if (this.age <= this.lifespan * this.bloomWiltRatio) {
      this.bloom(dt, ctx);
    } else {
      this.wilt(dt, ctx);
    }
  }

  bloom(dt, ctx) {
    const growthRatio = this.age/(this.lifespan * this.bloomWiltRatio);
    const currentHeight = Math.round(this.height * growthRatio) || 1; // grow to full height
    const imageData = ctx.createImageData(this.width,currentHeight);
    for (let i = 0; i < imageData.data.length; i+=4) {
      this.setPixelWithColor(imageData, i, this.color);
    }
    ctx.putImageData(imageData, this.x, this.y-currentHeight);
    this.flowerbud.drawFlower(dt, ctx, this.x + this.width/2, this.y-currentHeight, growthRatio);
    this.age += dt/1000;
  }

  wilt(dt, ctx) {
    // const currentHeight = this.height * this.bloomWiltRatio;
    const timeSinceWilt = this.age - (this.lifespan * this.bloomWiltRatio); // kinda gross
    const totalWiltTime = this.lifespan * (1 - this.bloomWiltRatio); // real gross
    const ratioOfWiltTime = timeSinceWilt/totalWiltTime;
    const currentHeight = Math.round(this.height - (this.height * (1 - this.bloomWiltRatio) * ratioOfWiltTime)); // shrink to 75% height??
    const imageData = ctx.createImageData(3,currentHeight);
    for (let i = 0; i < imageData.data.length; i+=4) {
      this.setPixelWithColor(imageData, i, interpolateBetweenColors(this.color, this.wiltColor, ratioOfWiltTime));
    }
    ctx.putImageData(imageData, this.x, this.y-currentHeight);
    this.flowerbud.drawFlowerWilt(dt, ctx, this.x + this.width/2, this.y-currentHeight, ratioOfWiltTime);
    this.age += dt/1000;
  }

  setPixelWithColor(imageData, index, colorData) {
    imageData.data[index+0] = colorData.r;
    imageData.data[index+1] = colorData.g;
    imageData.data[index+2] = colorData.b;
    imageData.data[index+3] = colorData.a;
  }

};
