const less = require('gulp-less')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const lazypipe = require('lazypipe')
const pxtorem = require('postcss-pxtorem')
const config = require('../config')
let { options } = config.styles
const processors = [
  autoprefixer(options.autoprefixer),
  pxtorem(options.pxtorem)
]

const lessChannel = lazypipe()
  .pipe(sourcemaps.init)
  .pipe(less)
  .pipe(
    postcss,
    processors
  )
  .pipe(
    sourcemaps.write,
    './maps'
  )
module.exports = lessChannel
