import React from 'react';
import AImage from '@/materials/absolute-antd/base/Image';

const attr = {
  translate: [0, 0],
  align: 'center',
  titText: '',
  titFontSize: 20,
  titColor: 'rgba(0,0,0,1)',
  titFontWeight: '400',
  subTitText: '',
  subTitFontSize: 16,
  subTitColor: 'rgba(0,0,0,1)',
  subTitFontWeight: '400',
  imgUrl: [
    {
      uid: '001',
      name: 'image.png',
      status: 'done',
      url: 'http://49.234.61.19/uploads/bg_174e470dc22.png',
    },
    {
      uid: '002',
      name: 'image.png2',
      status: 'done',
      url: 'http://49.234.61.19/uploads/bg_174e470dc22.png',
    },
    {
      uid: '003',
      name: 'image.png3',
      status: 'done',
      url: 'http://49.234.61.19/uploads/bg_174e470dc22.png',
    },
    {
      uid: '004',
      name: 'image.png4',
      status: 'done',
      url: 'http://49.234.61.19/uploads/bg_174e470dc22.png',
    },
  ],
  round: 0,
};
export default () => (
  /*@ts-ignore*/
  <AImage isTpl={false} {...attr} />
);
