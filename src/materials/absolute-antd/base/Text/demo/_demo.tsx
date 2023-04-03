import React from 'react';
import AText from '@/materials/absolute-antd/base/Text';

const attr = {
  text: 'Hello World',
  disabled: false,
  code: false,
  delete: false,
  strong: true,
  italic: false,
  underline: false,
  mark: true,
  color: 'rgba(60, 60, 60, 1)',
  fontSize: 14,
  indent: 20,
  lineHeight: 1.8,
  textAlign: 'left',
  bgColor: 'rgba(255, 255, 255, 0)',
  padding: 0,
  radius: 0,
};
export default () => (
  /*@ts-ignore*/
  <AText isTpl={false} {...attr} />
);
