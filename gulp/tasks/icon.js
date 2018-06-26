const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const template = require('art-template')
template.defaults.root = '.'
/**
 * 根据images目录生成 icons demo 模板
 *@desc
 * var myFilePath = '/someDir/someFile.json';
 * path.parse(myFilePath).base
 * // "someFile.json"
 * path.parse(myFilePath).name
 * // "someFile"
 * path.parse(myFilePath).ext
 * // ".json"
 *'/someDir/someFile.json'
 */
gulp.task('icon', done => {
  let rootPath = path.join('.')
  let fileNames = glob.sync(path.join(rootPath, 'images/*.png'))
  // console.log(process.cwd())
  // console.log(template.defaults.root)
  let iconNames = fileNames.map(filePath => {
    let fileName = path.parse(filePath).name
    let className = `q-${fileName.replace(/@/, '').replace(/_/, '-')}`
    return `<div class="${className}"></div>`
  })
  let value = iconNames.join('\n')
  let html = template(path.join('template', 'icon.ejs'), { value })
  fs.writeFileSync(path.join('src', 'images', 'demo.html'), html)
  done()
})
