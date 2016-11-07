function interpolateBetweenColors(color1, color2, ratio) {
  const newColor = {};
  ['r', 'g', 'b', 'a'].forEach((c) => {
    newColor[c] = Math.round(color1[c] + (color2[c] - color1[c]) * ratio);
  });
  return newColor;
}

function clampToColorRange(value) {
  return Math.min(Math.max(value, 0), 255);
}

function getColorWithOffset(color, rOffset, gOffset, bOffset, aOffset) {
  return {
    r: clampToColorRange(color.r + rOffset),
    g: clampToColorRange(color.g + gOffset),
    b: clampToColorRange(color.b + bOffset),
    a: clampToColorRange(color.a + aOffset)
  }
}

function getRandomColorValue() {
  return Math.round(Math.random() * 255);
}

function getRandomColor() {
  return {
    r: getRandomColorValue(),
    g: getRandomColorValue(),
    b: getRandomColorValue(),
    a: 255
  }
}

function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

module.exports = {getColorWithOffset, getRandomColor, getRandomColorValue, interpolateBetweenColors, shuffle}
