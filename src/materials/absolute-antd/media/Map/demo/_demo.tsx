import React from 'react';
import AMap from '@/materials/absolute-antd/media/Map';

const attr = {
  ak: '你的百度地图ak',
  position: [121.444017, 31.237787],
  location: '上海市',
};
export default () => (
  /*@ts-ignore*/
  <AMap isTpl={false} {...attr} />
);
