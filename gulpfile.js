'use strict'
const gulp = require('gulp')
const less = require('gulp-less')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const path = require('path')
const pkg = require('./package.json')
const sourcemaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const chalk = require('chalk')

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const requireDir = require('require-dir')
requireDir('gulp')

const CurrentModulePath = path.join('src', 'components', pkg.module)

gulp.task('html', function() {
  return gulp
    .src([
      path.join(__dirname, 'static', 'favicon.ico'),
      path.join(CurrentModulePath, '*.html')
    ])
    .pipe(gulp.dest('app'))
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
  // defaults: Browserslist’s default browsers (> 0.5%, last 2 versions, Firefox ESR, not dead).
  let plugins = [autoprefixer({ browsers: ['last 2 version', '> 1%'] })]
  return gulp
    .src(path.join(CurrentModulePath, 'index.less'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss(plugins))
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

  gulp.watch(path.join(__dirname, 'src', '**', '*.less'), ['less'])
  gulp.watch(path.join(CurrentModulePath, '*.js'), ['js'])
  gulp.watch(path.join(CurrentModulePath, '*.html'), ['html', reload])
})

gulp.task('build', function() {
  let plugins = [autoprefixer({ browsers: ['last 2 version', '> 1%'] })]
  return gulp
    .src(path.join(__dirname, 'src', 'index.less'))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['build'], () => {
  console.log(chalk.green('^_^ ^_^ ^_^ ^_^ ^_^ ^_^ ^_^'))
})
