const path = require('path')
module.exports = {
  styles: {
    src: 'src/index.less',
    dest: 'dist',
    options: {
      pxtorem: {
        rootValue: 16,
        unitPrecision: 5,
        propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0
      },
      autoprefixer: {
        browsers: ['> 1%', 'ios 6', 'android 4']
        // cascade: true
      }
    }
  },
  base64: {
    imagesSoucePath: 'images/*.png',
    lessName: 'index.less',
    src: path.join('src', 'images', 'base64.less'), // pre:base64 的出口，base64 的入口
    dest: 'src/images/',
    options: {
      baseDir: 'images',
      extensions: ['png'],
      maxImageSize: 20 * 1024, // bytes
      debug: true // 如果不开启debug 如果文件没有找到也没有输出静默执行
    }
  }
}
