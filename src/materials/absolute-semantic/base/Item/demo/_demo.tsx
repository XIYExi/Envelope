import React from 'react';
import SItem from '@/materials/absolute-semantic/base/Item';

const attr = {
  src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
  imageSize: 'small',
  title: 'Item标题',
  meta: 'Meta-Data,关于Item内容的简短描述',
  desc: '这是Item需要渲染的具体内容，虽然是长文本，但是不建议过长。',
  extra: '其余信息',
};

export default () => (
  /*@ts-ignore*/
  <SItem isTpl={false} {...attr} />
);
