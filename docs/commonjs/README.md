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

