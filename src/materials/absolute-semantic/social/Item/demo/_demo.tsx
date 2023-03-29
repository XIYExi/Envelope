import React from 'react';
import SItem from '@/materials/absolute-semantic/social/Item';

const attr = {
  divided: true,
  unstackable: false,
  dataSource: [
    {
      id: '12345',
      src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
      imageSize: 'tiny',
      title: 'Item标题 1',
      meta: 'Meta-Data,关于Item 1内容的简短描述',
      desc: '这是Item需要渲染的具体内容，虽然是长文本，但是不建议过长。',
      extra: '其余信息',
    },
    {
      id: '12346',
      src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
      imageSize: 'tiny',
      title: 'Item标题 2',
      meta: 'Meta-Data,关于Item 2内容的简短描述',
      desc: '这是Item需要渲染的具体内容，虽然是长文本，但是不建议过长。',
      extra: '其余信息',
    },
  ],
};

export default () => (
  /*@ts-ignore*/
  <SItem isTpl={false} {...attr} />
);
