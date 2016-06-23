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

	'use es6';

	const Raindrop = __webpack_require__(1);

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
	  raindrops.forEach(raindrop => {
	    raindrop.drawCircle(dt, ctx);
	  });
	  raindrops = raindrops.filter(raindrop => {
	    return raindrop.age < raindrop.lifespan;
	  });
	}

	function getRandomVectorInCanvas(canvas) {
	  return {
	    x: Math.random() * canvas.width,
	    y: Math.random() * canvas.height
	  };
	}

	window.onload = init;

/***/ },
/* 1 */
/***/ function(module, exports) {

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
	    const radius = this.radius * this.age / this.lifespan;
	    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
	    ctx.closePath();
	    ctx.lineWidth = 2;
	    ctx.strokeStyle = `rgba(20,20,250,${ 1 - this.age / this.lifespan })`;
	    ctx.stroke();
	    this.age += dt / 1000;
	    console.log("age: " + this.age);
	  }
	};

/***/ }
/******/ ]);