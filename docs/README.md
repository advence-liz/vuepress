---
home: true
title: 'Module'
description: JavaScript 模块加载机制
heroImage: /banner.jpg
actionText: 发车 →
actionLink: /commonjs/
footer: MIT Licensed | Copyright © liz
---

## 历史

JavaScript 随着时间的推移所负责的责任越来越重从最开始的添加表单验证功能之类的脚本到angular 应用开发框架，随着js任务越来越重就急需模块化的解决方案。

模块化的基础条件就是开辟一片独立的上下文,那些拥有模块化功能的语言或通过物理文件组织模块，或以抽象的 namespace package 组织模块，
而JavaScript 并没这种能力只能从语法上开辟独立的上下文，就目前浏览器端运行的js来说能开辟独立上下文的方式只有一种方式 function

- 传说中最开始的刀耕火种用闭包各种全局变量组织结构
- AMD UMD commonjs es6

- [kmath](https://sharpgui.github.io/keditor/demos/kmath.editor.html)
- [webpack analyse](http://webpack.github.io/analyse)
- 现在webpack 支持 AMD commonjs es6 ，因为webpack只是格式上的支持
## Code 对比

### AMD
```js
define(['requrie','exports','module'],function(require, exports, module) {
        var a = require('a'),
            b = require('b');

        exports.A=a
    }）
;
```
### angular
```js
angular.module('myApp', [])
  .controller('Ctl', ['$scope', '$log', function ($scope, $log) {
  $scope.name = 'leonwgc';
  $log.log('hello,world');
}]);
```
### webpack
```js
(function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/
    /******/ 		// Check if module is in cache
    /******/ 		if(installedModules[moduleId]) {
    /******/ 			return installedModules[moduleId].exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
    /******/ 			i: moduleId,
    /******/ 			l: false,
    /******/ 			exports: {}
    /******/ 		};
    /******/
    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.l = true;
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 81);
    /******/ })
    /************************************************************************/
    /******/ ([
    /* 0 */
/***/ (function(module, exports, __webpack_require__) {

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {
"use strict";
;
exports.cla = cla;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var e = 2.71828182846;
function math(x) {
  return Math.exp(x);
}

module.exports = math;

/***/ })
        
    ]);
```








