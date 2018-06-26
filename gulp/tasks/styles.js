const gulp = require('gulp')
const config = require('../config')
const lessChannel = require('./lessChannel')
const handleErrors = require('../util/handleErrors')
let { src, dest } = config.styles
gulp.task('styles', function() {
  return gulp
    .src(src)
    .pipe(lessChannel())
    .on('error', handleErrors)
    .pipe(gulp.dest(dest))
})
