/*
 * @Author       : wangfeihu
 * @Date         : 2023-07-20 08:50:37
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-07-20 09:35:09
 * @Description  : release it 配置,主要管理git发布流程
 */

module.exports = {
  npm: {
    publish: false,
  },
  git: {
    commitMessage: 'chore: release v${version}',
  },
  github: {
    release: true,
    web: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      ignoreRecommendedBump: true,
      strictSemVer: true,
      preset: {
        name: 'conventionalcommits',
        types: [
          {
            type: 'feat',
            section: '✨ 新功能',
          },
          {
            type: 'fix',
            section: '🐛 修复bug',
          },
          {
            type: 'docs',
            section: '📚 文档变更',
          },
          {
            type: 'style',
            section: '💄 代码美化',
            hidden: true,
          },
          {
            type: 'refactor',
            section: '♻️ 重构',
            hidden: true,
          },
          {
            type: 'perf',
            section: '⚡️ 性能优化',
          },
          {
            type: 'test',
            section: '✅ 测试',
            hidden: true,
          },
          {
            type: 'build',
            section: '📦️ 打包',
            hidden: true,
          },
          {
            type: 'ci',
            section: '👷 流程变更',
            hidden: true,
          },
          {
            type: 'chore',
            section: '🚀 构建/工程依赖/工具',
            hidden: true,
          },
          {
            type: 'revert',
            section: '⏪️ 回退',
            hidden: true,
          },
        ],
      },
    },
  },
};
