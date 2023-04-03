import React from 'react';
import ATabs from '@/materials/absolute-antd/base/Tabs';
const attr = {
  tabs: ['Tab 1', 'Tab 2'],
  centered: false,
  size: 'middle',
  tabBarGutter: 30,
  tabPosition: 'top',
  destroyInactiveTabPane: false,
  type: 'line',
  hideAdd: false,
  sourceData: [
    {
      id: '1',
      title: 'Panel 1',
      desc: 'Panel Desc 1',
      link: 'xxxxx',
      type: 0,
      imgUrl: [
        {
          uid: '001',
          name: 'image.png',
          status: 'done',
          url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
        },
      ],
    },
    {
      id: '2',
      title: 'Panel 2',
      desc: 'Panel Desc 2',
      link: 'xxxxx',
      type: 0,
      imgUrl: [
        {
          uid: '001',
          name: 'image.png',
          status: 'done',
          url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
        },
      ],
    },
    {
      id: '3',
      title: 'Panel 3',
      desc: 'Panel Desc 3',
      link: 'xxxxx',
      type: 1,
      imgUrl: [
        {
          uid: '001',
          name: 'image.png',
          status: 'done',
          url: 'https://s1.ax1x.com/2023/01/15/pSQdf8U.png',
        },
      ],
      html: `<button>Button</button>`,
    },
  ],
};
export default () => (
  /*@ts-ignore*/
  <ATabs isTpl={false} {...attr} />
);
