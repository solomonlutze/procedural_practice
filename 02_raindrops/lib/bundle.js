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
/***/ function(module, exports) {

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;

	function init() {
	  setInterval(update, 2500);
	}

	function update() {
	  const raindrops = [];
	  if (Math.random() > .9 && raindrops.length < 5) {}
	  const vector = getRandomVectorInCanvas(canvas);
	  const color = getRandomColor();
	  const imageData = ctx.createImageData(1, 1);
	  setPixelWithColor(imageData, 0, color);
	  ctx.putImageData(imageData, vector.x, vector.y);
	}

	function getRandomColor() {
	  return {
	    r: Math.random() * 255,
	    g: Math.random() * 255,
	    b: Math.random() * 255,
	    a: 255
	  };
	}

	function setPixelWithColor(imageData, index, colorData) {
	  imageData.data[index + 0] = colorData.r;
	  imageData.data[index + 1] = colorData.g;
	  imageData.data[index + 2] = colorData.b;
	  imageData.data[index + 3] = colorData.a;
	}

	function getRandomVectorInCanvas(canvas) {
	  return {
	    x: Math.random() * canvas.width,
	    y: Math.random() * canvas.height
	  };
	}

	window.onload = init;

/***/ }
/******/ ]);