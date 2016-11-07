'use strict';
var ECA = require("./components/ECA.jsx");
const Utils = require("./lib/Utils.js");
var React = require('react');
var ReactDOM = require('react-dom');

function init() {
  ReactDOM.render(
    <ECA/>,
    document.getElementById('main')
  );
}

window.onload = init;
