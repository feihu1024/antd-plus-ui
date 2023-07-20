---
title: DInput
description: 基于 antd 4.24.10 Input 的二次封装组件
tocDepth: 2
nav:
  title: 组件
  path: /components
group:
  title: 表单
---

## 组件特性

- 提供合成输入组合事件，解决中文拼音输入也会触发 onChange 事件的问题
- 提供输入防抖功能
- 提供优化的 onChange 方法

## 基础用法

<code src="./demos/basicDemo.tsx" title="基础用法" description="默认开启输入防抖和合成输入，onChange事件相较于antd将value值作为第一个参数、事件对象e作为第二个参数，这样可以方便监听输入值的变化"></code>

## 启用合成输入

<code src="./demos/composeDemo.tsx" title="启用合成输入" description="开启合成输入后，在拼音输入未完成前不会触发onChange事件"></code>

## 启用输入防抖

<code src="./demos/debounceDemo.tsx" title="启用输入防抖" description="开启输入防抖后，onChange事件会在指定时间后才触发，debounce值为false或0代表关闭输入防抖，值为true则代表使用默认时常，即800毫秒" ></code>

## API

| 参数          | 说明                                                      | 类型                 | 默认值 | 版本 |
| :------------ | :-------------------------------------------------------- | :------------------- | :----- | :--- |
| onChange      | 输入框内容变化时的回调                                    | `(value, e) => void` | -      |      |
| enableCompose | 是否启用合成输入                                          | `boolean`            | true   |      |
| debounce      | 是否开启防抖（true 表示 800 毫秒，false 或 0 表示不开启） | `boolean \| number`  | false  |      |

其他属性同 antd Input 组件，详见：https://4x-ant-design.antgroup.com/components/input-cn/#API
