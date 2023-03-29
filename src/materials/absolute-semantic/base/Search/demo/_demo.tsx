import React from 'react';
import SSearch from '@/materials/absolute-semantic/base/Search';

const attr = {
  placeholder: 'Search...',
  fluid: true,
  size: 'large',
  dataSource: [
    {
      id: '1',
      title: 'xiye',
      description: '这是关于xiye的描述',
      image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
      price: '100',
    },
    {
      id: '2',
      title: 'xiye Cayon',
      description: '这是关于Cayon的描述',
      image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
      price: '200',
    },
    {
      id: '3',
      title: 'Test x',
      description: '这是关于Test的描述',
      image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
      price: '300',
    },
    {
      id: '4',
      title: 'Ellus Thus',
      description: '这是关于Ellus Thus的描述',
      image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
      price: '400',
    },
  ],
};

export default () => (
  /*@ts-ignore*/
  <SSearch isTpl={false} {...attr} />
);
