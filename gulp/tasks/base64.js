const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const rename = require('gulp-rename')
const base64 = require('gulp-base64')
const handleErrors = require('../util/handleErrors')
const config = require('../config')
let { imagesSoucePath, lessName, src, dest, options } = config.base64
/**
 * 读取根目录下的images folder 根据*.png文件生成base64.less
 */
gulp.task('pre:base64', done => {
  let fileNames = glob.sync(imagesSoucePath)
  let iconNames = fileNames.map(filePath => {
    let fileName = path.parse(filePath).name
    let className = `q-${fileName.replace(/@/, '').replace(/_/, '-')}`

    return `.${className}{background-image: url("/${
      path.parse(filePath).base
    }");}`
  })
  let value = iconNames.join('\n')
  fs.writeFileSync(src, value)
  done()
})
gulp.task('base64', ['pre:base64'], () => {
  return gulp
    .src(src)
    .pipe(base64(options))
    .on('error', handleErrors)
    .pipe(rename(lessName))
    .pipe(gulp.dest(dest))
})
