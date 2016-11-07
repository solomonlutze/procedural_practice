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

	var Raindrop = __webpack_require__(1);

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var maxRaindropDensity = 5;

	var lastUpdate = Date.now();
	var raindrops = [];

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
	    var raindropVector = getRandomVectorInCanvas(canvas);
	    raindrops.push(new Raindrop(raindropVector.x, raindropVector.y));
	  }
	  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	  raindrops.forEach(function (raindrop) {
	    raindrop.drawCircle(dt, ctx);
	  });
	  raindrops = raindrops.filter(function (raindrop) {
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

	"use strict";
	'use es6';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
	  function Raindrop(xPos, yPos) {
	    _classCallCheck(this, Raindrop);

	    this.age = 0;
	    this.lifespan = 1 + (Math.random() - .5);
	    this.radius = 150;
	    this.x = xPos;
	    this.y = yPos;
	  }

	  _createClass(Raindrop, [{
	    key: "drawCircle",
	    value: function drawCircle(dt, ctx) {
	      ctx.beginPath();
	      var radius = this.radius * this.age / this.lifespan;
	      ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
	      ctx.closePath();
	      ctx.lineWidth = 2;
	      ctx.strokeStyle = "rgba(20,20,250," + (1 - this.age / this.lifespan) + ")";
	      ctx.stroke();
	      this.age += dt / 1000;
	      console.log("age: " + this.age);
	    }
	  }]);

	  return Raindrop;
	}();

/***/ }
/******/ ]);