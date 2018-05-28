const ghpages = require('gh-pages')
const path = require('path')
// process.env.vuepress_env = 'github'
const dest = path.join('..', 'docs', '.vuepress', 'dist')
ghpages.publish(dest, function(err) {
  console.log('deploy succeed!')
})
