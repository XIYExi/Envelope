import React from 'react';
import AVideo from '@/materials/absolute-antd/media/Video';

const attr = {
  poster: [
    {
      uid: '001',
      name: 'image.png',
      status: 'done',
      url: 'http://49.234.61.19/uploads/1_1740c6fbcd9.png',
    },
  ],
  url: '',
};
export default () => <AVideo isTpl={false} {...attr} />;
