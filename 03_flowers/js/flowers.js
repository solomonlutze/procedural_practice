'use es6';

const Flower = require("./Flower.js");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const maxFlowerDensity = 36;

let lastUpdate = Date.now();
let flowers = [];

function init() {
  ctx.fillStyle = `rgba(116, 69, 10, 255)`
  ctx.fillRect(0, canvasHeight * 4/5, canvasWidth, canvasHeight * 1/5);
  setInterval(tick, 0);
}

function tick() {
  var now = Date.now();
  var dt = now - lastUpdate;
  lastUpdate = now;

  fixedUpdate(dt);
  animationUpdate(dt);
}

function animationUpdate(dt) {
  if (flowers.length < maxFlowerDensity && Math.random() > .99) {
    const flowerVector = getRandomPointOnDirtLine(canvas); // spot somewhere on the dirt line
    flowers.push(new Flower(flowerVector.x, flowerVector.y)); // add to list
  }
  ctx.clearRect(0, 0, canvasWidth, canvasHeight * 4 / 5);
  ctx.fillStyle = `rgba(44, 122, 255, 255)`
  ctx.fillRect(0, 0, canvasWidth, canvasHeight * 4/5);
  flowers.forEach((flower) => {
    flower.grow(dt, ctx); // draw flower
  });
  flowers = flowers.filter((flower) => {
		return flower.age < flower.lifespan;
	});
}

function getRandomPointOnDirtLine(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height * 4 / 5
  }
}


window.onload = init;
