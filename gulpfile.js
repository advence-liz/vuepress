'use strict'
const gulp = require('gulp')
const less = require('gulp-less')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const path = require('path')
const pkg = require('./package.json')
const sourcemaps = require('gulp-sourcemaps')
const fs = require('fs')
const shell = require('shelljs')
const argv = require('yargs').argv
const chalk = require('chalk')
/**
 * @var {String} CurrentRootPath
 */
const CurrentRootPath = path.join('src', 'components')
const CurrentModulePath = path.join('src', 'components', pkg.module)
const CurrentModule = pkg.module
const AllModules = fs.readdirSync(path.join('src', 'components'))

gulp.task('html', function() {
  return gulp
    .src([
      path.join(CurrentModulePath, 'favicon.ico'),
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

// gulp.src(path.join('less','dust.less'))
//         .pipe(sourcemaps.init())
//         .pipe(less())
//         .pipe(sourcemaps.write('./maps'))
//         .pipe(gulp.dest(build))
gulp.task('less', function() {
  return gulp
    .src(path.join(CurrentModulePath, 'index.less'))
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

  gulp.watch(path.join(CurrentModulePath, '*.less'), ['less'])
  gulp.watch(path.join(CurrentModulePath, '*.js'), ['js'])
  gulp.watch(path.join(CurrentModulePath, '*.html'), ['html', reload])
})

gulp.task('build', function() {
  return gulp
    .src(path.join(__dirname, 'src', 'index.less'))
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
  let currentModule = CurrentModule
  let nextModule = argv.b
  switchModule(currentModule, nextModule)
})
/**
 * gulp branch -n
 *  -n -b -d
 */
gulp.task('branch', function() {
  // console.log(argv)
  if (argv.b) {
    switchModule(CurrentModule, argv.b)
    return
  } else if (argv.n) {
    switchModule('demo', argv.n)
    return
  } else if (argv.d) {
    deleteModule(argv.d)
    return
  }
  printModule()
})
function printModule() {
  AllModules.forEach(item => {
    if (item === CurrentModule) {
      console.info(chalk.green(item))
    } else {
      console.info(item)
    }
  })
}
function switchModule(currentModule, nextModule) {
  // console.log(currentModule, nextModule)
  if (currentModule === nextModule) {
    console.info(
      chalk.red('The target module cannot be equal to the current module!')
    )
    return
  }
  if (AllModules.indexOf(nextModule) > -1) {
    pkg.module = nextModule
    let packageText = beautify(JSON.stringify(pkg))
    fs.writeFileSync(path.join(__dirname, 'package.json'), packageText)
    console.info(chalk.green('Successfully written to Package.json'))
    return
  }
  if (nextModule) {
    createModule(currentModule, nextModule)
  }
}
function createModule(sourceModule, targetModule) {
  if (sourceModule === targetModule) {
    console.info(
      chalk.red('The target module cannot be equal to the current module!')
    )
    return
  }
  return gulp
    .src(path.join(CurrentRootPath, sourceModule, '**'))
    .pipe(gulp.dest(path.join(CurrentRootPath, targetModule)))
    .on('end', () => {
      console.info(chalk.green(`create ${targetModule} from ${sourceModule}`))
    })
}
function deleteModule(targetModule) {
  if (targetModule === 'demo') {
    console.info(chalk.red('The demo directory should not be removed!'))
    return
  }
  shell.rm('-rf', path.join(CurrentRootPath, targetModule))
  console.info(chalk.green(`${targetModule} successfully deleted`))
}

gulp.task('beautify', function() {
  gulp
    .src('package.json')
    .pipe(beautify())
    .pipe(gulp.dest('./package.json'))
})
// gulp.task()
