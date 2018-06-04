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