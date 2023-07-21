import { DTable, DTableProps } from 'antd-plus-ui';

export default function ColumnsPropDemo() {
  const commonColumnsProp: DTableProps['defaultColumnProps'] = { align: 'left', width: 120 };
  const columns: DTableProps['columns'] = [
    { dataIndex: 'id', title: 'id', width: 60, align: 'center' },
    { dataIndex: 'name', title: '标题' },
    { dataIndex: 'date', title: '时间' },
    { dataIndex: 'desc', title: '描述' },
  ];
  const loadMore = (params) => {
    const { current = 1, size = 10, type = 1 } = params;
    let total = 75;
    const records: any[] = [];
    for (let i = (current - 1) * size; i < current * size; i++) {
      if (i >= total) break;
      records.push({
        id: i,
        name: '数据' + (i + 1),
        date: '2023-05-' + (type < 10 ? '0' + type : type) + ' 12:00:00',
        desc: '测试数据' + (i + 1),
      });
    }
    return Promise.resolve({ total, records });
  };
  return <DTable style={{ height: 400 }} defaultColumnProps={commonColumnsProp} columns={columns} loadMore={loadMore} />;
}
