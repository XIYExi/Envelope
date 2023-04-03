import React from 'react';
import ADivider from '@/materials/absolute-antd/base/Divider';

const attr = {
  title: '嵌套的标题',
  dashed: false,
  orientation: 'center',
  plain: false,
};
export default () => (
  /*@ts-ignore*/
  <ADivider isTpl={false} {...attr} />
);
