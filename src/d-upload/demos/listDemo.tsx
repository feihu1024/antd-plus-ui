import { Modal } from 'antd';
import { useState } from 'react';

import { DUpload, DUploadFile } from 'antd-plus-ui';

const { imageToBase64 } = DUpload;

const loadedList: DUploadFile[] = [
  { id: 0, name: '110500.jpg', thumbUrl: '/mock/dupload/pictures/110500.jpg' },
  { id: 2, name: '110504.png', status: 'done', url: '/mock/dupload/pictures/110504.png' },
  { id: 4, name: '铃声.m4a', url: '/mock/dupload/others/铃声.m4a' },
  { id: 5, name: 'antd-plus-ui文档.pdf', thumbUrl: '/mock/dupload/pictures/default.png', url: '/mock/dupload/others/antd-plus-ui文档.pdf' },
];

export default function ListDemo() {
  const [fileList, setFileList] = useState<DUploadFile[]>(loadedList);

  const onChange = (files) => {
    console.log('files: ', files);
    setFileList(files);
  };

  // 为所有图像类文件添加base64预览
  const customRequest = (file: DUploadFile, list: DUploadFile[]) => {
    if (file.type?.startsWith('image')) {
      imageToBase64(file as Blob, { width: 300, height: 200, quality: 0.7 }).then((base64) => (file.thumbUrl = base64));
    }
    list.push(file);
    return list;
  };

  // 删除前弹窗确认，如果被删除文件不是通过文件对话框上传的，则将其标记为removed，并在列表中保留
  const onRemove = (file: DUploadFile, list: DUploadFile[]) => {
    const fileName = file?.fileName || file?.name || file?.id || file?.uid || '';
    return new Promise<DUploadFile[]>((resolve) => {
      Modal.confirm({
        centered: true,
        title: '删除',
        content: `是否删除文件${fileName} ?`,
        cancelText: '取消',
        okText: '确认',
        onOk() {
          if (file.source === 'upload') {
            const index = list.findIndex((item) => item.uid === file.uid);
            if (index >= 0) list.splice(index, 1);
          } else {
            file.status = 'removed';
          }
          resolve(list);
        },
      });
    });
  };

  return <DUpload multiple enablePreview fileList={fileList} onChange={onChange} customRequest={customRequest} onRemove={onRemove} />;
}
