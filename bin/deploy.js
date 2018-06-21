const ghpages = require('gh-pages')
const path = require('path')
// process.env.vuepress_env = 'github'
const dest = path.join('..', 'docs', '.vuepress', 'dist')
ghpages.publish(dest, function(err) {
  if (err) {
    console.error(err)
  } else {
    console.log('deploy succeed!')
  }
})
