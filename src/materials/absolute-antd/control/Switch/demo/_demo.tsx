import React from 'react';
import ASwitch from '@/materials/absolute-antd/control/Switch';

const attr = {
  autoFocus: false,
  defaultChecked: false,
  disabled: false,
  loading: false,
};
export default () => (
  /*@ts-ignore*/
  <ASwitch isTpl={false} {...attr} />
);
