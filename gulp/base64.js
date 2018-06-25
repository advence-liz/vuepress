const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const rename = require('gulp-rename')
const base64 = require('gulp-base64')

gulp.task('pre:base64', done => {
  let fileNames = glob.sync('images/*.png')
  let iconNames = fileNames.map(filePath => {
    let fileName = path.parse(filePath).name
    let className = `q-${fileName.replace(/@/, '').replace(/_/, '-')}`

    return `.${className}{background-image: url("/${
      path.parse(filePath).base
    }");}`
  })
  let value = iconNames.join('\n')
  // let html = template(path.join(__dirname, 'template', 'icon.ejs'), { value })
  fs.writeFileSync(path.join('src', 'images', 'base64.less'), value)
  done()
})
gulp.task('base64', ['pre:base64'], () => {
  return gulp
    .src('src/images/base64.less')
    .pipe(
      base64({
        baseDir: 'images',
        extensions: ['png'],
        maxImageSize: 20 * 1024, // bytes
        debug: true
      })
    )
    .pipe(rename('index.less'))
    .pipe(gulp.dest('src/images/'))
})
