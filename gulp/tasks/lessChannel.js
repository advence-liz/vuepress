const less = require('gulp-less')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const lazypipe = require('lazypipe')
const pxtorem = require('postcss-pxtorem')
const gulpif = require('gulp-if')
const clean = require('gulp-clean-css')
const config = require('../config')
let { options } = config.styles
const processors = [
  autoprefixer(options.autoprefixer),
  pxtorem(options.pxtorem)
]
let compressing = process.env.NODE_ENV === 'prod'
const lessChannel = lazypipe()
  .pipe(sourcemaps.init)
  .pipe(less)
  .pipe(
    postcss,
    processors
  )
  .pipe(function() {
    return gulpif(compressing, clean())
  })
  .pipe(
    sourcemaps.write,
    './maps'
  )
module.exports = lessChannel
