'use es6';

const Raindrop = require("./Raindrop.js");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const maxRaindropDensity = 5;

let lastUpdate = Date.now();
let raindrops = [];

function init() {
  // ctx.globalCompositeOperation=
  setInterval(tick, 0);
}

function tick() {
  var now = Date.now();
  var dt = now - lastUpdate;
  lastUpdate = now;

  fixedUpdate(dt);
  animationUpdate(dt);
}

function fixedUpdate() {
  console.log("fixedUpdate!");
}

function animationUpdate(dt) {
  if (raindrops.length <= maxRaindropDensity && Math.random() > .9) {
    const raindropVector = getRandomVectorInCanvas(canvas);
    raindrops.push(new Raindrop(raindropVector.x, raindropVector.y));
  }
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  raindrops.forEach((raindrop) => {
    raindrop.drawCircle(dt, ctx);
  });
  raindrops = raindrops.filter((raindrop) => {
		return raindrop.age < raindrop.lifespan;
	});
}

function getRandomVectorInCanvas(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height
  }
}


window.onload = init;
