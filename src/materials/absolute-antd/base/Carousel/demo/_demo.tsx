import React from 'react';
import ACarousel from '@/materials/absolute-antd/base/Carousel';

const attr = {
  direction: 'bottom',
  effect: 'scrollx',
  round: 0,
  autoPlay: true,
  imgList: [
    {
      id: '1',
      title: '趣谈小课1',
      desc: '致力于打造优质小课程',
      link: 'xxxxx',
      imgUrl: [
        {
          uid: '001',
          name: 'image.png',
          status: 'done',
          url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
        },
      ],
    },
    {
      id: '2',
      title: '趣谈小课1',
      desc: '致力于打造优质小课程',
      link: 'xxxxx',
      imgUrl: [
        {
          uid: '001',
          name: 'image.png',
          status: 'done',
          url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
        },
      ],
    },
  ],
  tplImg: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
};
export default () => (
  /*@ts-ignore*/
  <ACarousel isTpl={false} {...attr} />
);
