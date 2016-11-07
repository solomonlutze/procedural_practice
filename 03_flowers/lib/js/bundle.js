/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use es6';

	var Flower = __webpack_require__(1);

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var maxFlowerDensity = 36;

	var lastUpdate = Date.now();
	var flowers = [];

	function init() {
	  // ctx.globalCompositeOperation=
	  ctx.fillStyle = "rgba(116, 69, 10, 255)";
	  ctx.fillRect(0, canvasHeight * 4 / 5, canvasWidth, canvasHeight * 1 / 5);
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
	  // console.log("fixedUpdate!");
	}

	function animationUpdate(dt) {
	  if (flowers.length < maxFlowerDensity && Math.random() > .99) {
	    var flowerVector = getRandomPointOnDirtLine(canvas); // spot somewhere on the dirt line
	    flowers.push(new Flower(flowerVector.x, flowerVector.y)); // add to list
	  }
	  ctx.clearRect(0, 0, canvasWidth, canvasHeight * 4 / 5);
	  ctx.fillStyle = "rgba(44, 122, 255, 255)";
	  ctx.fillRect(0, 0, canvasWidth, canvasHeight * 4 / 5);
	  flowers.forEach(function (flower) {
	    flower.grow(dt, ctx); // draw flower
	  });
	  flowers = flowers.filter(function (flower) {
	    return flower.age < flower.lifespan;
	  });
	}

	function getRandomPointOnDirtLine(canvas) {
	  return {
	    x: Math.random() * canvas.width,
	    y: canvas.height * 4 / 5
	  };
	}

	window.onload = init;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use es6';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Flowerbud = __webpack_require__(2);

	var _require = __webpack_require__(3);

	var interpolateBetweenColors = _require.interpolateBetweenColors;


	module.exports = function () {
	  function Flower(xPos, yPos) {
	    _classCallCheck(this, Flower);

	    this.age = 0;
	    this.lifespan = 10 + 16 * (Math.random() - .5);
	    this.bloomWiltRatio = .75;
	    this.width = 4;
	    this.height = 200 + 150 * (Math.random() - .5);
	    this.color = { r: 0, g: 255, b: 0, a: 255 };
	    this.wiltColor = { r: 140, g: 105, b: 10, a: 255 };
	    this.flowerbud = new Flowerbud();
	    this.x = xPos;
	    this.y = yPos;
	  }

	  // Once blooming starts,
	  // create a bud centered on the top of the flower

	  _createClass(Flower, [{
	    key: "grow",
	    value: function grow(dt, ctx) {
	      if (this.age <= this.lifespan * this.bloomWiltRatio) {
	        this.bloom(dt, ctx);
	      } else {
	        this.wilt(dt, ctx);
	      }
	    }
	  }, {
	    key: "bloom",
	    value: function bloom(dt, ctx) {
	      var growthRatio = this.age / (this.lifespan * this.bloomWiltRatio);
	      var currentHeight = Math.round(this.height * growthRatio) || 1; // grow to full height
	      var imageData = ctx.createImageData(this.width, currentHeight);
	      for (var i = 0; i < imageData.data.length; i += 4) {
	        this.setPixelWithColor(imageData, i, this.color);
	      }
	      ctx.putImageData(imageData, this.x, this.y - currentHeight);
	      this.flowerbud.drawFlower(dt, ctx, this.x + this.width / 2, this.y - currentHeight, growthRatio);
	      this.age += dt / 1000;
	    }
	  }, {
	    key: "wilt",
	    value: function wilt(dt, ctx) {
	      // const currentHeight = this.height * this.bloomWiltRatio;
	      var timeSinceWilt = this.age - this.lifespan * this.bloomWiltRatio; // kinda gross
	      var totalWiltTime = this.lifespan * (1 - this.bloomWiltRatio); // real gross
	      var ratioOfWiltTime = timeSinceWilt / totalWiltTime;
	      var currentHeight = Math.round(this.height - this.height * (1 - this.bloomWiltRatio) * ratioOfWiltTime); // shrink to 75% height??
	      var imageData = ctx.createImageData(3, currentHeight);
	      for (var i = 0; i < imageData.data.length; i += 4) {
	        this.setPixelWithColor(imageData, i, interpolateBetweenColors(this.color, this.wiltColor, ratioOfWiltTime));
	      }
	      ctx.putImageData(imageData, this.x, this.y - currentHeight);
	      this.flowerbud.drawFlowerWilt(dt, ctx, this.x + this.width / 2, this.y - currentHeight, ratioOfWiltTime);
	      this.age += dt / 1000;
	    }
	  }, {
	    key: "setPixelWithColor",
	    value: function setPixelWithColor(imageData, index, colorData) {
	      imageData.data[index + 0] = colorData.r;
	      imageData.data[index + 1] = colorData.g;
	      imageData.data[index + 2] = colorData.b;
	      imageData.data[index + 3] = colorData.a;
	    }
	  }]);

	  return Flower;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// two concentric circles focused on a center point
	'use es6';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _require = __webpack_require__(3);

	var getColorWithOffset = _require.getColorWithOffset;
	var getRandomColor = _require.getRandomColor;
	var interpolateBetweenColors = _require.interpolateBetweenColors;


	module.exports = function () {
	  function Flowerbud(xPos, yPos, lifespan) {
	    _classCallCheck(this, Flowerbud);

	    this.radius = 20 + 8 * (Math.random() - .5);
	    // const colorOptions = [235, 127, 56];
	    this.color = getRandomColor();
	    this.secondaryColorOffset = {
	      r: Math.round(100 * (Math.random() - .5)),
	      g: Math.round(100 * (Math.random() - .5)),
	      b: Math.round(100 * (Math.random() - .5)),
	      a: 0
	    };
	    this.wiltColor = getColorWithOffset(this.color, -150, -150, -150, 0);
	    // this.wiltColor = {r: 140, g: 105, b: 10, a: 255}
	  }

	  // Once blooming starts,
	  // create a bud centered on the top of the flower

	  _createClass(Flowerbud, [{
	    key: "drawFlower",
	    value: function drawFlower(dt, ctx, x, y, growthRatio) {
	      ctx.beginPath();
	      var radius = this.radius * growthRatio;
	      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	      ctx.closePath();
	      ctx.lineWidth = radius;
	      ctx.strokeStyle = "rgba(\n      " + this.color.r + ",\n      " + this.color.g + ",\n      " + this.color.b + ",\n      " + this.color.a + "\n    )";
	      ctx.stroke();
	      var secondaryColor = getColorWithOffset(this.color, this.secondaryColorOffset.r, this.secondaryColorOffset.g, this.secondaryColorOffset.b, this.secondaryColorOffset.a);
	      ctx.fillStyle = "rgba(\n      " + secondaryColor.r + ",\n      " + secondaryColor.g + ",\n      " + secondaryColor.b + ",\n      " + secondaryColor.a + "\n    )";
	      ctx.fill();
	    }
	  }, {
	    key: "drawFlowerWilt",
	    value: function drawFlowerWilt(dt, ctx, x, y, growthRatio) {
	      ctx.beginPath();
	      var radius = this.radius * (1 - growthRatio / 2);
	      var wiltColor = interpolateBetweenColors(this.color, this.wiltColor, growthRatio);
	      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	      ctx.closePath();
	      ctx.lineWidth = radius;
	      ctx.strokeStyle = "rgba(\n      " + wiltColor.r + ",\n      " + wiltColor.g + ",\n      " + wiltColor.b + ",\n      " + wiltColor.a + "\n    )";
	      ctx.stroke();
	      var secondaryColor = getColorWithOffset(wiltColor, this.secondaryColorOffset.r, this.secondaryColorOffset.g, this.secondaryColorOffset.b, this.secondaryColorOffset.a);
	      ctx.fillStyle = "rgba(\n      " + secondaryColor.r + ",\n      " + secondaryColor.g + ",\n      " + secondaryColor.b + ",\n      " + secondaryColor.a + "\n    )";
	      ctx.fill();
	    }
	  }]);

	  return Flowerbud;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	function interpolateBetweenColors(color1, color2, ratio) {
	  var newColor = {};
	  ['r', 'g', 'b', 'a'].forEach(function (c) {
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
	  };
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
	  };
	}

	function shuffle(array) {
	  var i = 0,
	      j = 0,
	      temp = null;

	  for (i = array.length - 1; i > 0; i -= 1) {
	    j = Math.floor(Math.random() * (i + 1));
	    temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	  }
	}

	module.exports = { getColorWithOffset: getColorWithOffset, getRandomColor: getRandomColor, getRandomColorValue: getRandomColorValue, interpolateBetweenColors: interpolateBetweenColors, shuffle: shuffle };

/***/ }
/******/ ]);