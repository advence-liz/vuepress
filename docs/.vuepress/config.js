const { vuepress_env } = process.env
module.exports = {
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: `https://cdn.bootcss.com/bootstrap/4.1.1/css/bootstrap.css`
      }
    ]
  ],
  title: 'Module',
  // dest:`.vuepress/dist`,
  base: vuepress_env ? `/blog/` : `/`,
  port: 8080,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'AMD', link: '/amd/' },
      { text: 'Commonjs', link: '/commonjs/' },
      { text: 'es6', link: '/es6/' }
    ]
  }
}

function genSidebarConfig(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'custom-themes',
        'i18n',
        'deploy'
      ]
    }
  ]
}
