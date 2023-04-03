import React from 'react';
import AComment from '@/materials/absolute-antd/social/Comment';

const attr = {
  actions: 'LikeFilled-DislikeFilled',
  author: 'xiye',
  avatar: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).',
  datetime: '8 hours ago',
};
export default () => (
  /*@ts-ignore*/
  <AComment isTpl={false} {...attr} />
);
