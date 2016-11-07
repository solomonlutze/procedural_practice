// two concentric circles focused on a center point
'use es6';
const {getColorWithOffset, getRandomColor, interpolateBetweenColors} = require("../../shared/Utils.js")

module.exports = class Flowerbud {
  constructor(xPos, yPos, lifespan) {
    this.radius = 20 + 8 * (Math.random() - .5);
    this.color = getRandomColor();
    this.secondaryColorOffset = {
      r: Math.round(100 * (Math.random()- .5)),
      g: Math.round(100 * (Math.random()- .5)),
      b: Math.round(100 * (Math.random()- .5)),
      a: 0
    }
    this.wiltColor = getColorWithOffset(this.color, -150, -150, -150, 0);
  }

  // Once blooming starts,
  // create a bud centered on the top of the flower

  drawFlower(dt, ctx, x, y, growthRatio) {
    ctx.beginPath();
    const radius = this.radius * growthRatio;
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.lineWidth = radius;
    ctx.strokeStyle = `rgba(
      ${this.color.r},
      ${this.color.g},
      ${this.color.b},
      ${this.color.a}
    )`;
    ctx.stroke();
    const secondaryColor = getColorWithOffset(this.color,
      this.secondaryColorOffset.r,
      this.secondaryColorOffset.g,
      this.secondaryColorOffset.b,
      this.secondaryColorOffset.a
    );
    ctx.fillStyle = `rgba(
      ${secondaryColor.r},
      ${secondaryColor.g},
      ${secondaryColor.b},
      ${secondaryColor.a}
    )`;
    ctx.fill();
  }

  drawFlowerWilt(dt, ctx, x, y, growthRatio) {
    ctx.beginPath();
    const radius = this.radius * (1 - growthRatio/2);
    const wiltColor = interpolateBetweenColors(this.color, this.wiltColor, growthRatio)
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.lineWidth = radius;
    ctx.strokeStyle = `rgba(
      ${wiltColor.r},
      ${wiltColor.g},
      ${wiltColor.b},
      ${wiltColor.a}
    )`;
    ctx.stroke();
    const secondaryColor = getColorWithOffset(wiltColor,
      this.secondaryColorOffset.r,
      this.secondaryColorOffset.g,
      this.secondaryColorOffset.b,
      this.secondaryColorOffset.a
    );
    ctx.fillStyle = `rgba(
      ${secondaryColor.r},
      ${secondaryColor.g},
      ${secondaryColor.b},
      ${secondaryColor.a}
    )`;
    ctx.fill();
  }

};
