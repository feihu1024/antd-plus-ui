import { DInput } from 'antd-plus-ui';

export default function BasicDemo() {
  const onChange = (value, e) => {
    console.log(value, '事件对象:', e);
  };
  return <DInput onChange={onChange} />;
}
