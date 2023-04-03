import React from 'react';
import AButton from '@/materials/absolute-antd/control/Button';

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
  <AButton isTpl={false} {...attr} />
);
