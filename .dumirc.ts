import { defineConfig } from 'dumi';
import { SiteThemeConfig } from 'dumi-theme-antd-style';
import path from 'path';

import { name } from './package.json';

const themeConfig: SiteThemeConfig = {
  name: 'Antd Plus UI',
  logo: '/images/favicon.png',

  hero: {
    'zh-CN': {
      description: '基于antd的的二次封装组件库',
      actions: [
        {
          type: 'primary',
          text: '开始使用',
          link: '/guide',
        },
        {
          text: '组件概览',
          link: '/components',
        },
        {
          text: 'Github',
          link: 'https://github.com/feihu1024/antd-plus-ui',
          openExternal: true,
        },
      ],
    },
  },
  socialLinks: { github: 'https://github.com/feihu1024/antd-plus-ui' },
  apiHeader: {
    pkg: name,
    sourceUrl: `{github}/tree/master/src/components/{atomId}/index.tsx`,
    docUrl: `{github}/tree/master/example/docs/components/{atomId}.{locale}.md`,
  },
  footer: 'feihu1024',
};

export default defineConfig({
  themeConfig,
  resolve: { docDirs: ['docs'] },
  outputPath: 'docs-dist',
  favicons: ['/images/favicon.png'],
  locales: [
    { id: 'zh-CN', name: '中文', suffix: '' },
    { id: 'en-US', name: 'English', suffix: '-en' },
  ],
  alias: { 'antd-plus-ui': path.join(__dirname, './src'), antd5: path.join(__dirname, './node_modules/dumi-theme-antd-style/node_modules/antd') },
  mfsu: false,
  codeSplitting: { jsStrategy: 'granularChunks' },
  dumiThemeAlias: { antd: 'antd5' },
});
