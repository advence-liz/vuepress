'use strict'
const gulp = require('gulp')
const chalk = require('chalk')
const requireDir = require('require-dir')
requireDir('./gulp/tasks', { recurse: true })

gulp.task('default', ['styles'], () => {
  console.log(chalk.green('^_^ ^_^ ^_^ ^_^ ^_^ ^_^ ^_^'))
})
