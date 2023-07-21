import { useState } from 'react';

import { Radio } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';

import { DSelect } from 'antd-plus-ui';

export default function LoadingDemo() {
  const options = [
    { label: '选项1', value: 1, type: '640' },
    { label: '选项2', value: 2, type: '640' },
    { label: '选项3', value: 3, type: '443' },
    { label: '选项4', value: 4, type: '443' },
  ];

  const [loading, setLoading] = useState<boolean | number>(800);
  const onRadioChange = (e) => setLoading(e.target.value);

  const getOptionsAsync = () => {
    return new Promise<DefaultOptionType[]>((resolve) => {
      resolve(options);
    });
  };

  const remoteSearch = (value?) => {
    return new Promise<DefaultOptionType[]>((resolve) => {
      const list = value ? options.filter((item) => item.label.includes(value)) : options;
      const delayTime = typeof loading === 'number' ? 2200 : 1200;
      setTimeout(() => resolve(list), delayTime);
    });
  };

  const onChange = (value, option) => {
    console.log(value, option);
  };

  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <span>切换类型：</span>
        <Radio.Group value={loading} onChange={onRadioChange}>
          <Radio value={true}>显示加载中</Radio>
          <Radio value={false}>不显示加载中</Radio>
          <Radio value={800}>延时800毫秒</Radio>
          <Radio value={2000}>延时2000毫秒</Radio>
        </Radio.Group>
      </div>
      <DSelect style={{ width: 200 }} options={getOptionsAsync} onChange={onChange} onSearch={remoteSearch} loading={loading} />
    </>
  );
}
