# blog

## 端口号

- 3000 browsersync
- 3001 browsersync console
- 3002 vuepress hot
- 3003 vuepress koa-static

## 问题

[问题解答](https://segmentfault.com/q/1010000009324489)

```bash
$ cross-env NODE_ENV=prod gulp  //NODE_ENV 有值
$ cross-env NODE_ENV=prod && gulp // NODE_ENV undefind
```

## TODO

[ ] copy 几个实用的 mixin
[ ] gulp 升级为 4.0.0
[ ] postcss
[ ] 优化自动生产结构的命令
[ ] 构建一个简易的生成 Demo common 组件,方便之后扩展兴许可以调整到 codepen 之类的链接，或者自定义 code minor 实现方式...
[ ] 通过命令动态执行不同的 deploy
