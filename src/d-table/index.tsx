/*
 * @Author       : wangfeihu
 * @Date         : 2023-05-09 15:04:48
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-08-16 16:39:30
 * @Description  : 基于antd的Table组件
 */
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { message, PaginationProps, Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';

import './index.less';

export type DColumnType = ColumnType<any> & { cellEllipsis?: boolean };

export type DTableSourceProps = { records: TableProps<any>['dataSource']; total: number; loading?: boolean };
export type TableParamsProps = { current?: number; size?: number; [key: string]: any };

export type DTableProps = Omit<TableProps<any>, 'columns'> & {
  /** 表格列的基础默认配置,默认所有列居中，表头文字超出显示省略号，详见 antd columns */
  defaultColumnProps?: DColumnType;
  /** 操作列配置,可以是一个普通列配置对象，也可以是一个columns的 render 函数 */
  actionColumn?: DColumnType | DColumnType['render'];
  /** 表格数据的加载函数,在表格创建、分页变化、额外参数变化时自动运行，如果设置该属性，则 dataSource 失效 */
  // eslint-disable-next-line no-unused-vars
  loadMore?: (params?: TableParamsProps, records?: DTableSourceProps['records']) => Promise<DTableSourceProps>;
  /** 加载数据失败时是否显示错误信息（仅loadMore可用时生效） */
  // eslint-disable-next-line no-unused-vars
  showErrorMsg?: boolean | ((err: any) => string);
  /** 额外的请求参数,（仅loadMore可用时生效） */
  extraParams?: TableParamsProps;
  /** 表格列配置 */
  columns?: DColumnType[];
};

// 分页器配置项
const defaultPagination: PaginationProps = {
  hideOnSinglePage: false,
  size: 'small',
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => (
    <div className="d-pagination-total">
      共<span> {total} </span>条
    </div>
  ),
};

// 数据列
function getColumns(columns: DTableProps['columns'], defaultColumnProps: DTableProps['defaultColumnProps']) {
  return columns?.map((item) => {
    const _item: DColumnType = { align: 'center', ellipsis: { showTitle: false }, cellEllipsis: true, ...defaultColumnProps, ...item };
    if (_item.cellEllipsis === false) {
      _item.className = _item?.className ? 'd-table-cell-wrap ' + _item.className : 'd-table-cell-wrap';
    }
    return _item;
  });
}

// 操作列
function getActionColumnProps(props: DTableProps['actionColumn'], defaultColumnProps: DTableProps['defaultColumnProps']) {
  const defaultProps = { width: 140, title: '操作', dataIndex: 'action' };
  return typeof props === 'function' ? { ...defaultColumnProps, ...defaultProps, render: props } : { ...defaultColumnProps, ...defaultProps, ...props };
}

// 分页配置
function getTablePage(_pagination: DTableProps['pagination']) {
  const { current, defaultCurrent, pageSize, defaultPageSize } = _pagination || {};
  return { current: current || defaultCurrent || 1, size: pageSize || defaultPageSize || 10 };
}

function InternalTable(props: DTableProps, ref: React.Ref<HTMLDivElement>) {
  const {
    loadMore,
    defaultColumnProps,
    actionColumn,
    showErrorMsg = true,
    extraParams,
    dataSource,
    rowKey = 'id',
    scroll,
    className,
    pagination,
    columns,
    loading,
    ...otherProps
  } = props;

  const loadingParamsRef = useRef<any>(null);

  const _tableSource = loadMore ? [] : dataSource || [];
  const [tableSource, setTableSource] = useState<DTableSourceProps>({ total: _tableSource.length, loading: false, records: _tableSource });

  const _pagination: DTableProps['pagination'] = pagination === false || pagination === null ? false : { ...defaultPagination, ...pagination };

  const [tableParams, setTableParams] = useState<{ current: number; size: number; [key: string]: any }>({ ...extraParams, ...getTablePage(_pagination) });

  // 默认垂直滚动高度为 calc(100% - 56px),其中56px为表格header高度，如需修改，需要自行覆盖styles中的相关样式
  const _scroll: DTableProps['scroll'] = scroll ? { y: 'calc(100% - 56px)', ...scroll } : { y: 'calc(100% - 56px)' };

  // 合并列属性
  const _columns: DTableProps['columns'] = getColumns(columns, defaultColumnProps);

  // 加入操作列
  const _actionColumn: DTableProps['actionColumn'] = actionColumn ? getActionColumnProps(actionColumn, defaultColumnProps) : undefined;
  if (_actionColumn && _columns instanceof Array) _columns.push(_actionColumn);

  // pcf-table 样式中已经包含对_scroll的支持
  const _className = `d-table ${className || ''} ${_pagination ? 'height-on-page' : ''}`;

  // loading 默认延迟 600ms
  const _loading: DTableProps['loading'] = typeof loading === 'boolean' ? { spinning: loading, delay: 600 } : { delay: 600, spinning: false, ...loading };

  // 加载数据
  const loadData = (params?: TableParamsProps) => {
    if (typeof loadMore === 'function') {
      setTableSource({ ...tableSource, loading: true });
      const _tableQuery = { ...getTablePage(_pagination), ...params };
      const paramsString = JSON.stringify(_tableQuery);
      loadingParamsRef.current = paramsString;

      setTableParams(_tableQuery);
      loadMore(_tableQuery, tableSource.records)
        .then((response) => {
          if (loadingParamsRef.current === paramsString) {
            const { total = 0, records = [] } = response;
            setTableSource({ total, records, loading: false });
          }
        })
        .catch((err) => {
          setTableSource({ ...tableSource, loading: false });
          if (showErrorMsg) {
            const errMsg = err?.response?.data?.msg || err?.msg || err?.message;
            message.error(typeof showErrorMsg === 'function' ? showErrorMsg(err) : `数据加载异常：${errMsg}`);
          } else {
            throw err;
          }
        });
    } else if (dataSource) {
      const total = (_pagination && _pagination.total) || dataSource.length;
      setTableParams({ ...getTablePage(_pagination), ...params });
      setTableSource({ total, loading: false, records: dataSource });
    }
  };

  // 监听分页大小变化,如果外部也监听了onChange，则不会触发loadMore，但如果外部onChange返回值为undefined则正常触loadMore
  const onChange = (page: number, pageSize: number) => {
    if (_pagination && typeof _pagination?.onChange === 'function') {
      const data = _pagination.onChange(page, pageSize);
      if (data === undefined) loadData({ ...tableParams, current: page, size: pageSize });
    } else {
      loadData({ ...tableParams, current: page, size: pageSize });
    }
  };

  const _tablePagination = _pagination
    ? { ..._pagination, total: tableSource.total, current: tableParams.current, pageSize: tableParams.size, onChange }
    : _pagination;

  // 数据初始加载
  useEffect(() => loadData(extraParams), [dataSource, extraParams]);

  return (
    <Table
      {...otherProps}
      ref={ref}
      rowKey={rowKey}
      className={_className}
      columns={_columns}
      dataSource={tableSource.records}
      pagination={_tablePagination}
      scroll={_scroll}
      loading={{ ..._loading, spinning: tableSource.loading }}
    />
  );
}

const DTable = forwardRef(InternalTable);
export default DTable;
