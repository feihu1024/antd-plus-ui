import { useState } from 'react';

import { Radio } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';

import { DSelect } from 'antd-plus-ui';

export default function SearchDemo() {
  const options = [
    { label: '选项1', value: 1, type: '640' },
    { label: '选项2', value: 2, type: '640' },
    { label: '选项3', value: 3, type: '443' },
    { label: '选项4', value: 4, type: '443' },
  ];

  const [enableRemoteSearch, setEnableRemoteSearch] = useState(true);

  const onRadioChange = (e) => setEnableRemoteSearch(e.target.value);

  const getOptionsAsync = () => {
    return new Promise<DefaultOptionType[]>((resolve) => {
      resolve(options);
    });
  };

  const remoteSearch = (value?) => {
    return new Promise<DefaultOptionType[]>((resolve) => {
      const list = value ? options.filter((item) => item.label.includes(value)) : options;
      setTimeout(() => resolve(list), 1200);
    });
  };

  const otherProps = enableRemoteSearch ? { showSearch: true, onSearch: remoteSearch } : { showSearch: true };

  const onChange = (value, option) => {
    console.log(value, option);
  };

  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <span>切换类型：</span>
        <Radio.Group value={enableRemoteSearch} onChange={onRadioChange}>
          <Radio value={true}>远程搜索</Radio>
          <Radio value={false}>本地搜索</Radio>
        </Radio.Group>
      </div>
      <DSelect style={{ width: 200 }} options={getOptionsAsync} onChange={onChange} {...otherProps} />
    </>
  );
}
