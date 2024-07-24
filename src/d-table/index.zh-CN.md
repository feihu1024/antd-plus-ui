---
title: DTable
description: 基于 antd 4.24.16 Table 的二次封装组件
tocDepth: 2
nav:
  title: 组件
  path: /components
group:
  title: 表单
---

## 组件特性

- 支持表格数据异步加载、实现自动分页加载，支持加载时使用额外的请求参数
- 支持表格可滚动区域百分比设置，加载时显示 loading 效果
- 支持列属性统一默认设置，操作列可单独设置

## 基础用法

<code src="./demos/basicDemo.tsx" title="基础用法" description="设置loadMore属性即可自动加载表格数据，分页变化时会自动调用该函数，如果在外部监听了分页的onChange事件，则不会触发loadMore，但如果外部onChange返回值为undefined则正常触loadMore"></code>

## 统一设置列配置

<code src="./demos/columnsPropDemo.tsx" title="统一设置列配置" description="columnsProp可以用来统一设置列的基本属性,其设置会被columns中同名属性覆盖"></code>

## 添加操作列

<code src="./demos/actionColumnDemo.tsx" title="添加操作列" description="actionColumn可以在列的最后添加一列操作列，可以是一个column对象，也可以是一个column render函数,该列默认拥有{ width:140, title:'操作', dataIndex:'action' }属性" ></code>

## 指定额外的请求参数

<code src="./demos/extraParamsDemo.tsx" title="指定额外的请求参数" description="extraParams可以指定current和size以外的其他参数,当extraParams发生变化时，自动使用默认分页参数调用loadMore方法" ></code>

## ellipsis 内容超出自动折行

<code src="./demos/cellEllipsis.tsx" title="ellipsis内容超出自动折行" description="列属性中新增cellEllipsis属性,开启后单元格内容在ellipsis为true时任然可以折行显示"></code>

## 显示错误信息

<code src="./demos/errorMsgDemo.tsx" title="显示错误信息" description="showErrorMsg可以在loadMore发生错误显示相应的提示信息,可以是布尔值（true按默认规则显示错误信息，false不显示），也可以是一个返回字符串的函数" ></code>

## API

### DTableProps

| 参数               | 说明                                                                                                | 类型                                                                                               | 默认值                                                 | 版本 |
| :----------------- | :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :----------------------------------------------------- | :--- |
| loadMore           | 表格数据的加载函数,在表格创建、分页变化、额外参数变化时自动运行，如果设置该属性，则 dataSource 失效 | `(params?: TableParamsProps,records?: DTableSourceProps['records']) => Promise<DTableSourceProps>` | -                                                      |      |
| defaultColumnProps | 表格列的基础默认配置,默认所有列居中，表头文字超出显示省略号，详见 [DColumnType](#d-column-type)     | `DColumnType`                                                                                      | { ellipsis: { showTitle: false }, cellEllipsis: true } |      |
| actionColumn       | 操作列配置,可以是一个普通列配置对象，也可以是一个 columns 的 render 函数                            | `DColumnType \| DColumnType['render']`                                                             | -                                                      |      |
| showErrorMsg       | 加载数据失败时是否显示错误信息（仅 loadMore 可用时生效）                                            | `boolean \| (err:any) => string`                                                                   | true                                                   |      |
| extraParams        | 额外的请求参数,（仅 loadMore 可用时生效）                                                           | `TableParamsProps`                                                                                 | -                                                      |      |

其他属性同 antd Table 组件，详见：https://4x.ant.design/components/table-cn/#API

<div id="d-column-type"></div>

### DColumnType

| 参数         | 说明               | 类型      | 默认值 | 版本 |
| :----------- | :----------------- | :-------- | :----- | :--- |
| cellEllipsis | 单元格内容是否省略 | `boolean` | false  |      |

其他属性同 antd Table 组件 Column，详见：https://4x.ant.design/components/table-cn/#Column

### DTableSourceProps

| 参数    | 说明                                               | 类型       | 默认值 | 版本 |
| :------ | :------------------------------------------------- | :--------- | :----- | :--- |
| records | 表格数据列表，等同于 antd table 的 datasource 属性 | `object[]` | -      |      |
| total   | 当前请求参数下的列表总数（用于分页）               | `number`   | -      |      |

### TableParamsProps

| 参数    | 说明                         | 类型     | 默认值 | 版本 |
| :------ | :--------------------------- | :------- | :----- | :--- |
| current | 当前页码                     | `number` | 1      |      |
| size    | 分页大小                     | `number` | 10     |      |
| -       | 后台接口所支持的其他任意参数 | `any`    | -      |      |
