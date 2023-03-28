import React from 'react';
import SCard from '@/materials/absolute-semantic/social/Card';

const attr = {
  src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
  color: 'grey',
  title: '卡片标题',
  titleTextAlign: 'left',
  meta: '简单描述',
  metaTextAlign: 'left',
  desc: '关于卡片内容的详细表述',
  descTextAlign: 'left',
  extra: '额外内容',
  fluid: false,
  raised: false,
};

export default () => (
  /*@ts-ignore*/
  <SCard isTpl={false} {...attr} />
);
