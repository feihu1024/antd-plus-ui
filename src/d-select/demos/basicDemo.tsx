import { DSelect } from 'antd-plus-ui';

export default function BasicDemo() {
  const options = [
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 },
    { label: '选项4', value: 4 },
  ];

  const getOptionsAsync = () => Promise.resolve(options);

  const onChange = (value, option) => {
    console.log(value, option);
  };

  return <DSelect style={{ width: 200 }} options={getOptionsAsync} showSearch onChange={onChange} />;
}
