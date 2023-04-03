import React from 'react';
import ARate from '@/materials/absolute-antd/social/Rate';

const attr = {
  allowClear: false,
  allowHalf: false,
  autoFocus: false,
  character: 'StarFilled',
  count: 5,
  defaultValue: 0,
  disabled: false,
};
export default () => (
  /*@ts-ignore*/
  <ARate isTpl={false} {...attr} />
);
