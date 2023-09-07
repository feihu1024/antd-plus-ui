import { DTable, DTableProps } from 'antd-plus-ui';

export default function CellEllipsis() {
  const columns: DTableProps['columns'] = [
    { dataIndex: 'id', title: 'id' },
    { dataIndex: 'name', title: '标题' },
    { dataIndex: 'date', title: '时间' },
    { dataIndex: 'desc', title: '描述', ellipsis: true },
    { dataIndex: 'explain', title: '说明', cellEllipsis: false },
  ];
  const loadMore = (params) => {
    const { current = 1, size = 10, type = 1 } = params;
    const defaultText =
      '默认情况下，当column设置ellipsis=true或ellipsis = { showTitle:true }时，超出单元格的内容会自动跟表头一样显示省略号，但现在可以通过设置cellEllipsis=false使得表头超出省略但单元格任可折行的效果';
    let total = 75;
    const records: any[] = [];
    for (let i = (current - 1) * size; i < current * size; i++) {
      if (i >= total) break;
      records.push({
        id: i,
        name: '数据' + (i + 1),
        date: '2023-05-' + (type < 10 ? '0' + type : type) + ' 12:00:00',
        desc: '这是测试数据' + (i + 1) + '的详细描述信息',
        explain: i === 4 ? defaultText : '',
      });
    }
    return Promise.resolve({ total, records });
  };
  return (
    <div style={{ height: 400 }}>
      <DTable style={{ height: '100%' }} columns={columns} loadMore={loadMore} />
    </div>
  );
}
