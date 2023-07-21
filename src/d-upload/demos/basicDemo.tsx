import { DUpload } from 'antd-plus-ui';

export default function BasicDemo() {
  const onChange = (files) => {
    console.log('files: ', files);
  };

  return <DUpload multiple onChange={onChange} />;
}
