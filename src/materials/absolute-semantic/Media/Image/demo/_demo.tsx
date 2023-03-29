import React from 'react';
import SImage from '@/materials/absolute-semantic/Media/Image';

const attr = {
  src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
  alt: '这是一个Image',
  avatar: false,
  bordered: true,
  centered: false,
  circular: false,
  disabled: false,
  fluid: false,
  hidden: false,
  inline: false,
  rounded: true,
  size: 'big',
  verticalAlign: 'middle',
  wrapper: false,
};

export default () => (
  /*@ts-ignore*/
  <SImage isTpl={false} {...attr} />
);
