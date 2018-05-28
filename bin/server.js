const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const chalk = require('chalk')
const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = path.join('..', 'docs', '.vuepress', 'dist')

app.use(static(path.join(__dirname, staticPath)))

// app.use( async ( ctx ) => {
//   ctx.body = 'hello world'
// })

app.listen(3001, () => {
  console.log(
    chalk.green('[blog]') + ' is starting at ' + chalk.blue('http://localhost:3001/')
  )
})
