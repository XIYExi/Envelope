import React from 'react';
import { AHeader } from '@/materials/absolute-antd/base/Header';
const attr = {
  bgColor: 'rgba(0,0,0,1)',
  size: 'large',
  shape: 'square',
  logo: [
    {
      uid: '001',
      name: 'image.png',
      status: 'done',
      url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
    },
  ],
  fontSize: 20,
  color: 'rgba(255,255,255,1',
  height: 58,
  title: 'Envelope',
  user: 'xiye',
};
export default () => (
  /*@ts-ignore*/
  <AHeader isTpl={false} {...attr} />
);
