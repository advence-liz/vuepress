
const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const gulpIf = require('gulp-if')
const spritesmith = require('gulp.spritesmith')
/**
 * 生成sprite图,
 */

gulp.task('sprite', function() {
    return gulp
      .src(path.join('images', '*.png'))
      .pipe(
        spritesmith({
          imgName: 'sprite.png', // 合并后大图的名称
          cssName: 'index.less',
          padding: 2, // 每个图片之间的间距，默认为0px
          cssTemplate: data => {
            // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
            let arr, width, height, url
            arr = []
            width = data.spritesheet.px.width
            height = data.spritesheet.px.height
            url = data.spritesheet.image
            // console.log(data)
            data.sprites.forEach(function(sprite) {
              arr.push(
                '.q-' +
                  sprite.name.replace(/@/, '').replace(/_/, '-') +
                  '{' +
                  "background: url('" +
                  url +
                  "') " +
                  'no-repeat ' +
                  sprite.px.offset_x +
                  ' ' +
                  sprite.px.offset_y +
                  ';' +
                  'background-size: ' +
                  width +
                  ' ' +
                  height +
                  ';' +
                  'width: ' +
                  sprite.px.width +
                  ';' +
                  'height: ' +
                  sprite.px.height +
                  ';' +
                  '}\n'
              )
            })
            // return "@fs:108rem;\n"+arr.join("")
            return arr.join('')
          }
        })
      )
      .pipe(gulp.dest('src/images/'))
      .pipe(gulpIf('*.png', gulp.dest('dist/')))
  })
