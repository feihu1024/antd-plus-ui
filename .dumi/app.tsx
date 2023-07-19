/*
 * @Author       : wangfeihu
 * @Date         : 2023-07-13 17:43:36
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-07-13 18:09:45
 * @Description  : 全局运行时配置，主要添加ntd组件的国际化配置
 */
import { defineApp } from 'dumi';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

export default defineApp({
  rootContainer(lastRootContainer) {
    return <ConfigProvider locale={zhCN}>{lastRootContainer}</ConfigProvider>;
  },
}) as any;
