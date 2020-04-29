const path = require('path');

module.exports = {
  title: 'Nova Vue',
  description: '前端组件库 Vue 实现',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    activeHeaderLinks: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'GitHub', link: 'https://github.com/LVMM-PC/nova-vue' }
    ],
    sidebar: [
      '/',
      '/getting-started/',
      '/i18n/',
      {
        title: '数据录入',
        collapsable: false,
        children: [
          '/auto-complete/',
          '/checkbox/',
          '/date-picker/',
          '/radio/',
          '/select/'
        ]
      },
      {
        title: '数据展示',
        collapsable: false,
        children: ['/calendar/']
      },
      {
        title: '反馈',
        collapsable: false,
        children: ['/alert/', '/modal/', '/progress/']
      }
    ]
  },
  chainWebpack: config => {
    config.resolve.alias.set('nova-vue', path.resolve(__dirname, '../..'));
  }
};
