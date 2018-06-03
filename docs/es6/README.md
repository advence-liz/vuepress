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