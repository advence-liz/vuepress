const gulp = require('gulp')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const path = require('path')
const pkg = require('../../package')
const plumber = require('gulp-plumber')
const lessChannel = require('./lessChannel')
const handleErrors = require('../util/handleErrors')
const template = require('gulp-template')
// const chalk = require('chalk')

const CurrentModulePath = path.join('src', 'components', pkg.module)
// https://libraries.io/npm/postcss-pxtorem
// defaults: Browserslist’s default browsers (> 0.5%, last 2 versions, Firefox ESR, not dead).

gulp.task('html', function() {
  console.log(pkg.module, CurrentModulePath)
  return gulp
    .src([path.join(CurrentModulePath, '*.html')])
    .pipe(template({ name: pkg.module }))
    .pipe(gulp.dest('app'))
    // .on('end', () => {
    //   browserSync.reload()
    // })
})
/**
 * 如果有必要可以可以扩展js 预编译
 */
gulp.task('js', function() {
  return gulp
    .src(path.join(CurrentModulePath, '*.js'))
    .pipe(gulp.dest('app'))
    .pipe(reload({ stream: true }))
})

gulp.task('less', function() {
  return gulp
    .src(path.join(CurrentModulePath, '*.less'))
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(lessChannel())
    .pipe(gulp.dest('app'))
    .pipe(reload({ stream: true }))
})
gulp.task('refresh', ['less', 'js', 'html'], reload)

// 监视 less 文件的改动，如果发生变更，运行 'less' 任务，并且重载文件
gulp.task('start', ['less', 'js', 'html'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })

  gulp.watch(path.join('src', '**', '*.less'), ['less'])
  gulp.watch(path.join(CurrentModulePath, '*.js'), ['js'])
  gulp.watch(path.join(CurrentModulePath, '*.html'), ['html'], reload)
})
