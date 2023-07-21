import { Radio } from 'antd';
import { useState } from 'react';

import { DTable, DTableProps } from 'antd-plus-ui';

export default function ErrorMsgDemo() {
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);

  const columns: DTableProps['columns'] = [
    { dataIndex: 'id', title: 'id' },
    { dataIndex: 'name', title: '标题' },
    { dataIndex: 'date', title: '时间' },
    { dataIndex: 'desc', title: '描述' },
  ];

  const onRadioChange = (e) => setShowErrorMsg(e.target.value);

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
    if (params?.hasDesc) {
      return Promise.resolve({ total, records });
    } else {
      return Promise.reject({ message: 'hasDesc参数不可为空' });
    }
  };

  const _showErrorMsg = typeof showErrorMsg === 'boolean' ? showErrorMsg : (err) => `加载数据失败,请检查后重试: ${err?.message || ''}`;

  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <Radio.Group value={showErrorMsg} onChange={onRadioChange}>
          <Radio value={false}>不显示错误信息</Radio>
          <Radio value={true}>显示错误信息</Radio>
          <Radio value={undefined}>显示自定义错误信息</Radio>
        </Radio.Group>
      </div>
      <DTable style={{ height: 400 }} columns={columns} extraParams={{ hasDesc: showErrorMsg === false }} showErrorMsg={_showErrorMsg} loadMore={loadMore} />
    </>
  );
}
