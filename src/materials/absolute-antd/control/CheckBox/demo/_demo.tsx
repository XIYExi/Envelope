import React from 'react';
import ACheckBox from '@/materials/absolute-antd/control/CheckBox';

const attr = {
  text: 'Button',
  block: false,
  danger: false,
  disabled: false,
  ghost: false,
  href: 'xxxx',
  icon: `SearchOutlined`,
  iconLocation: 'left',
  loading: false,
  shape: 'default',
};
export default () => (
  /*@ts-ignore*/
  <ACheckBox isTpl={false} {...attr} />
);
