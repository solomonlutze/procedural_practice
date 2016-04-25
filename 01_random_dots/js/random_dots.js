var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

function init() {
  setInterval(update, 25);
}

function update() {
  const vector = getRandomVectorInCanvas(canvas);
  const color = getRandomColor();
  const imageData = ctx.createImageData(1,1);
  setPixelWithColor(imageData, 0, color);
  ctx.putImageData(imageData, vector.x, vector.y);

}

function getRandomColor() {
  return {
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255,
    a: 255
  }
}

function setPixelWithColor(imageData, index, colorData) {
   imageData.data[index+0] = colorData.r;
   imageData.data[index+1] = colorData.g;
   imageData.data[index+2] = colorData.b;
   imageData.data[index+3] = colorData.a;
}

function getRandomVectorInCanvas(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height
  }
}

window.onload = init;
