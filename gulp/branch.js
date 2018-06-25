// sparrow
const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const argv = require('yargs').argv
const chalk = require('chalk')
const shell = require('shelljs')
const pkg = require('../package.json')
const beautify = require('js-beautify').js_beautify

const CurrentRootPath = path.join('src', 'components')

const CurrentModule = pkg.module
const AllModules = fs.readdirSync(path.join('src', 'components'))

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
 *  -n <name> new
 *  -b <name> switch
 *  -d <name> delete
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
