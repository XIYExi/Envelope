import React from 'react';
import SEmbed from '@/materials/absolute-semantic/media/Embed';

const attr = {
  placeholder: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
  source: 'youtube',
  url: 'O6Xo21L0ybE',
  aspectRatio: '4:3',
  autoplay: false,
  brandedUI: false,
  defaultActive: false,
  hd: false,
};

export default () => (
  /*@ts-ignore*/
  <SEmbed isTpl={false} {...attr} />
);
