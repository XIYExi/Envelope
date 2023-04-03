import React from 'react';
import ACollapse from '@/materials/absolute-antd/social/Collapse';

const attr = {
  accordion: false,
  bordered: true,
  collapsible: 'icon',
  destroyInactivePanel: false,
  expandIconPosition: 'start',
  ghost: false,
  forceRender: false,
  showArrow: true,
  panelList: [
    {
      id: '1',
      title: 'This panel can only be collapsed by clicking text',
      desc: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
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
      title: 'This panel can only be collapsed by clicking icon',
      desc: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
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
};
export default () => (
  /*@ts-ignore*/
  <ACollapse isTpl={false} {...attr} />
);
