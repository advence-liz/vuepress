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
  // dest:`.vuepress/dist`,
  base: vuepress_env ? `/blog/` : `/`,
  port: 3002,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Code', link: '/code/' },
      { text: 'External', link: 'https://google.com' }
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
