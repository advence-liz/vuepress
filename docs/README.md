# javascript 模块化简析
所有原创并不精彩，所有精彩并非原创
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



---
sidebar: auto
---

# AMD

  define(id?, dependencies?, factory);
## id
第一个参数，id，是个字符串。它指的是定义中模块的名字，这个参数是可选的。如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名必须是“顶级”的和绝对的（不允许相对名字）。

## 模块格式

模块名用来唯一标识定义中模块，它们同样在依赖数组中使用。AMD的模块名规范是CommonJS模块名规范的超集。引用如下：

- 模块名是由一个或多个单词以正斜杠为分隔符拼接成的字符串
- 单词须为驼峰形式，或者"."，".."
- 模块名不允许文件扩展名的形式，如".js"
- 模块名可以为 "相对的" 或 "顶级的"。如果首字符为"."或".."则为"相对的"模块名
- 顶级的模块名从根命名空间的概念模块解析
- 相对的模块名从 "require" 书写和调用的模块解析
上文引用的CommonJS模块id属性常被用于JavaScript模块。

相对模块名解析示例：

- 如果模块 "a/b/c" 请求 "../d", 则解析为"a/d"
- 如果模块 "a/b/c" 请求 "./e", 则解析为"a/b/e"


## 依赖

第二个参数，dependencies，是个定义中模块所依赖模块的数组。依赖模块必须根据模块的工厂方法优先级执行，并且执行的结果应该按照依赖数组中的位置顺序以参数的形式传入（定义中模块的）工厂方法中。

依赖的模块名如果是相对的，应该解析为相对定义中的模块。换句话来说，相对名解析为相对于模块的名字，并非相对于寻找该模块的名字的路径。

本规范定义了三种特殊的依赖关键字。如果"require","exports", 或 "module"出现在依赖列表中，参数应该按照CommonJS模块规范自由变量去解析。

依赖参数是可选的，如果忽略此参数，它应该默认为["require", "exports", "module"]。然而，如果工厂方法的形参个数小于3，加载器会选择以函数指定的参数个数调用工厂方法。

## 工厂方法

第三个参数，factory，为模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值。

如果工厂方法返回一个值（对象，函数，或任意强制类型转换为true的值），应该为设置为模块的输出值。

简单的 CommonJS 转换

如果依赖性参数被忽略，模块加载器可以选择扫描工厂方法中的require语句以获得依赖性（字面量形为require("module-id")）。第一个参数必须字面量为require从而使此机制正常工作。

在某些情况下，因为脚本大小的限制或函数不支持toString方法（Opera Mobile是已知的不支持函数的toString方法），模块加载器可以选择扫描不扫描依赖性。

如果有依赖参数，模块加载器不应该在工厂方法中扫描依赖性。

## Simple Name/Value Pairs

If the module does not have any dependencies, and it is just a collection of name/value pairs, then just pass an object literal to define():
```js
//Inside file my/shirt.js:
define({
    color: "black",
    size: "unisize"
});
```
## Definition Functions

If the module does not have dependencies, but needs to use a function to do some setup work, then define itself, pass a function to define():
```js
//my/shirt.js now does setup work
//before returning its module definition.
define(function () {
    //Do setup work here

    return {
        color: "black",
        size: "unisize"
    }
});
```
## Definition Functions with Dependencies
If the module has dependencies, the first argument should be an array of dependency names, and the second argument should be a definition function. The function will be called to define the module once all dependencies have loaded. The function should return an object that defines the module. The dependencies will be passed to the definition function as function arguments, listed in the same order as the order in the dependency array:
```js
//my/shirt.js now has some dependencies, a cart and inventory
//module in the same directory as shirt.js
define(["./cart", "./inventory"], function(cart, inventory) {
        //return an object to define the "my/shirt" module.
        return {
            color: "blue",
            size: "large",
            addToCart: function() {
                inventory.decrement(this);
                cart.add(this);
            }
        }
    }
);
```
## Define a Module with Simplified CommonJS Wrapper

If you wish to reuse some code that was written in the traditional CommonJS module format it may be difficult to re-work to the array of dependencies used above, and you may prefer to have direct alignment of dependency name to the local variable used for that dependency. You can use the simplified CommonJS wrapper for those cases:
```js
define(function(require, exports, module) {
        var a = require('a'),
            b = require('b');

        exports.A=a
    }
);

define(['requrie','exports','module'],function(require, exports, module) {
        var a = require('a'),
            b = require('b');

        exports.A=a
    }
);
```
## r.js

## babel
commonjs js 规范是 AMD 的子集 看一下demo

- babel-plugin-transform-es2015-modules-amd
- babel-plugin-transform-es2015-modules-commonjs
- babel-plugin-transform-es2015-modules-systemjs
- babel-plugin-transform-es2015-modules-umd

```bash
$ babel ES6 --out-dir AMD --plugins=transform-es2015-modules-amd
$ babel ES6 --out-dir UMD --plugins=transform-es2015-modules-umd
$ babel ES6 --out-dir common --plugins=transform-es2015-modules-commonjs

```



---
sidebar: auto
---

# Commonjs

CommonJS API定义很多普通应用程序（主要指非浏览器的应用）使用的API，从而填补了这个空白。它的终极目标是提供一个类似Python，Ruby和Java标 准库。这样的话，开发者可以使用CommonJS API编写应用程序，然后这些应用可以运行在不同的JavaScript解释器和不同的主机环境中。在兼容CommonJS的系统中，你可以使用 JavaScript程序开发：

- 服务器端JavaScript应用程序
- 命令行工具
- 图形界面应用程序
- 混合应用程序（如，Titanium或Adobe AIR...)

![](/node_w3c.png)

## 基本语法

```js
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
// 上面代码通过module.exports输出变量x和函数addX。

// require方法用于加载模块。
var example = require('./example.js');

console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

## module对象
- module.id 模块的识别符，通常是带有绝对路径的模块文件名。
- module.filename 模块的文件名，带有绝对路径。
- module.loaded 返回一个布尔值，表示模块是否已经完成加载。
- module.parent 返回一个对象，表示调用该模块的模块。
- module.children 返回一个数组，表示该模块要用到的其他模块。
- module.exports 表示模块对外输出的值。
```js
{ id: '.',
  exports: { '$': [Function] },
  parent: null,
  filename: '/path/to/example.js',
  loaded: false,
  children:
   [ { id: '/path/to/node_modules/jquery/dist/jquery.js',
       exports: [Function],
       parent: [Circular],
       filename: '/path/to/node_modules/jquery/dist/jquery.js',
       loaded: true,
       children: [],
       paths: [Object] } ],
  paths:
   [ '/home/user/deleted/node_modules',
     '/home/user/node_modules',
     '/home/node_modules',
     '/node_modules' ]
}
```
## exports
exports 要注意的问题

```js
exports = function(x) {console.log(x)};

```
### 函数传参传入引用的引用

函数传参基本是两种类型 值类型和引用类型
[最早接触这个问题是在汤姆大叔的博客中](http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html)
```js
var liz={age:18}

function fun(liz){
 liz={age:19}
}

```

```js
(function (exports, require, module, __filename, __dirname) {
  // exports = module.exports
});
```


---
sidebar: auto
---

# ES6

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。
```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```
上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。
```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```
上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

除了静态加载带来的各种好处，ES6 模块还有以下好处。

- 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
- 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。
## module 语法
### 推荐
工作上的体会这种模块加载的语法，就用最简单常见的方式就好，千万不要过多操作
```js
import _default from "xxx"
import _default,{a,b,c} from "xxx"

export default class xxx{}
export class xxx{}
export {xx,xxx,xxxx}
```
### export 与 import 的复合写法
如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
上面代码中，export和import语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。

模块的接口改名和整体输出，也可以采用这种写法。

// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
默认接口的写法如下。

export { default } from 'foo';
具名接口改为默认接口的写法如下。

export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;
同样地，默认接口也可以改名为具名接口。

export { default as es6 } from './someModule';
下面三种import语句，没有对应的复合写法。

import * as someIdentifier from "someModule";
import someIdentifier from "someModule";
import someIdentifier, { namedIdentifier } from "someModule";
为了做到形式的对称，现在有提案，提出补上这三种复合写法。

export * as someIdentifier from "someModule";
export someIdentifier from "someModule";
export someIdentifier, { namedIdentifier } from "someModule";
```
### 模块的继承
模块之间也可以继承。

假设有一个circleplus模块，继承了circle模块。
```js
// circleplus.js

export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
上面代码中的export *，表示再输出circle模块的所有属性和方法。注意，export *命令会忽略circle模块的default方法。然后，上面代码又输出了自定义的e变量和默认方法。

这时，也可以将circle的属性或方法，改名后再输出。

// circleplus.js

export { area as circleArea } from 'circle';
上面代码表示，只输出circle模块的area方法，且将其改名为circleArea。

加载上面模块的写法如下。

// main.js

import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));
上面代码中的import exp表示，将circleplus模块的默认方法加载为exp方法。
```

## _components写了个脚本自动生产index

```js
const fs = require('fs')
const path = require('path')
let dirs = fs.readdirSync(path.join(__dirname))

function capitalize([first, ...rest]) {
  return first.toUpperCase() + rest.join('')
}

function getPascal(x) {
  let arr = x.split(/\b/)
  let str = capitalize(x)
  if (arr.length > 1) {
    str = arr.reduce(function(x, y) {
      return capitalize(x) + capitalize(y)
    })
  }
  return str.replace(/-/g, '')
}
dirs = dirs.filter(dir => {
  let filterReg = /(.js|.scss|list-header)$/
  return !filterReg.test(dir)
})
let result = dirs.map(function(from) {
  let name = getPascal(from)

  return `export { default as ${name} } from './${from}'`
})
console.log(result)
let str = result.join(`\n`)
fs.writeFileSync(path.join(__dirname, 'index.js'), str)

```