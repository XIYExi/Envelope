import React from 'react';
import AList from '@/materials/absolute-antd/base/List';
const attr = {
  bordered: true,
  header: 'Header',
  footer: '',
  itemLayout: 'vertical',
  loading: false,
  size: 'default',
  split: false,
  pagination: false,
  position: 'bottom',
  grid: [
    {
      id: 'column',
      type: 'Number',
      label: '栅格列数column',
      placeholder: '0',
    },
    {
      id: 'gutter',
      type: 'Number',
      label: '栅格间隔gutter',
      placeholder: '16',
    },
    {
      id: 'xs',
      type: 'Number',
      label: '<576px 展示的列数[xs]',
      placeholder: '1',
    },
    {
      id: 'sm',
      type: 'Number',
      label: '≥576px 展示的列数[sm]',
      placeholder: '2',
    },
    {
      id: 'md',
      type: 'Number',
      label: '≥768px 展示的列数',
      placeholder: '4',
    },
    {
      id: 'lg',
      label: '≥992px 展示的列数',
      type: 'Number',
      placeholder: '4',
    },
    {
      id: 'xl',
      label: '≥1200px 展示的列数',
      type: 'Number',
      placeholder: '6',
    },
    {
      id: 'xxl',
      type: 'Number',
      label: '≥1600px 展示的列数',
      placeholder: '3',
    },
  ],
  sourceData: [
    {
      id: '1',
      title: '趣谈小课',
      desc: '致力于打造优质小课程',
      link: 'xxxxx',
      imgUrl: [
        {
          uid: '001',
          name: 'image.png',
          status: 'done',
          url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
        },
      ],
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), ' +
        'to help people create their product prototypes beautifully and efficiently.',
    },
    {
      id: '2',
      title: '趣谈小课',
      desc: '致力于打造优质小课程',
      link: 'xxxxx',
      imgUrl: [],
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), ' +
        'to help people create their product prototypes beautifully and efficiently.',
    },
  ],
};
export default () => (
  /*@ts-ignore*/
  <AList isTpl={false} {...attr} />
);
