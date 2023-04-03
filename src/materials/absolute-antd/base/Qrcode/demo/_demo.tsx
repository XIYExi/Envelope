import React from 'react';
import AQrcode from '@/materials/absolute-antd/base/Qrcode';
const attr = {
  qrcode: [
    {
      uid: '001',
      name: 'image.png',
      status: 'done',
      url: 'http://49.234.61.19/uploads/code_173e1705e0c.png',
    },
  ],
  text: '二维码',
  color: 'rgba(153,153,153,1)',
  fontSize: 14,
};
export default () => <AQrcode isTpl={false} {...attr} />;
