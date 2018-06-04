'use strict'
const gulp = require('gulp')
const less = require('gulp-less')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const path = require('path')
const pkg = require('./package.json')
const sourcemaps = require('gulp-sourcemaps')
const fs = require('fs')
const argv = require('yargs').argv
const root = path.join('src', 'components', pkg.module)
const allModule = fs.readdirSync(path.join('src', 'components'))
const chalk = require('chalk')

gulp.task('html', function() {
  return gulp
    .src([path.join(root, 'favicon.ico'), path.join(root, '*.html')])
    .pipe(gulp.dest('app'))
})
/**
 * 如果有必要可以可以扩展js 预编译
 */
gulp.task('js', function() {
  return gulp
    .src(path.join(root, '*.js'))
    .pipe(gulp.dest('app'))
    .pipe(reload({ stream: true }))
})

// gulp.src(path.join('less','dust.less'))
//         .pipe(sourcemaps.init())
//         .pipe(less())
//         .pipe(sourcemaps.write('./maps'))
//         .pipe(gulp.dest(build))
gulp.task('less', function() {
  return gulp
    .src(path.join(root, 'index.less'))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('app'))
    .pipe(reload({ stream: true }))
})

// 监视 less 文件的改动，如果发生变更，运行 'less' 任务，并且重载文件
gulp.task('start', ['less', 'js', 'html'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })

  gulp.watch(path.join(root, '*.less'), ['less'])
  gulp.watch(path.join(root, '*.js'), ['js'])
  gulp.watch(path.join(root, '*.html'), ['html', reload])
})

gulp.task('build',function(){
    return gulp
    .src(path.join(__dirname,'src', 'index.less'))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist'))
})
// sparrow

const beautify = require('js-beautify').js_beautify
/**
 * gulp checkout -b <name>
 */
gulp.task('checkout', function() {
  let currentModule = pkg.module
  let nextModule = argv.b
  if (allModule.indexOf(nextModule > -1)) {
    pkg.module = nextModule
    let packageText = beautify(JSON.stringify(pkg))
    fs.writeFileSync(path.join(__dirname, 'package.json'), packageText)
  }
  if (nextModule) {
    return gulp
      .src(path.join(__dirname, 'src', currentModule, '**'))
      .pipe(gulp.dest(path.join(__dirname, 'src', nextModule)))
  }
})
/**
 * gulp branch -n
 */
gulp.task('branch', function() {
  let currentModule = pkg.module
  allModule.forEach(item => {
    if (item === currentModule) {
      console.info(chalk.green(item))
    } else {
      console.info(item)
    }
  })

  // console.log(...allModule)
})

gulp.task('beautify', function() {
  gulp
    .src('package.json')
    .pipe(beautify())
    .pipe(gulp.dest('./package.json'))
})
// gulp.task()
