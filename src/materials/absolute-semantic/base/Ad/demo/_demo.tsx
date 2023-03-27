import React from 'react';
import SAdvertisement from '@/materials/absolute-semantic/base/Ad';
import 'semantic-ui-css/semantic.min.css';

const attr = {
  centered: false,
  src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
  test: '这是一个广告',
  unit: 'large rectangle',
};

export default () => (
  // @ts-ignore
  <SAdvertisement isTpl={false} {...attr} />
);
