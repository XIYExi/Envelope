import React from 'react';
import ARadio from '@/materials/absolute-antd/control/Radio';

const attr = {
  type: 'default',
  buttonStyle: 'outline',
  disabled: false,
  options: 'a-b-c-d-e',
  autoFocus: false,
};
export default () => (
  /*@ts-ignore*/
  <ARadio isTpl={false} {...attr} />
);
