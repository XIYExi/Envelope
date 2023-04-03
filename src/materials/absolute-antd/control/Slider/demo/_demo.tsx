import React from 'react';
import ASlider from '@/materials/absolute-antd/control/Slider';

const attr = {
  allowClear: true,
  defaultValue: [20, 50],
  disabled: false,
  dots: true,
  included: true,
  marks: '0-26-37-80',
  min: 0,
  max: 100,
  range: true,
  reverse: false,
  step: 0,
};
export default () => (
  /*@ts-ignore*/
  <ASlider isTpl={false} {...attr} />
);
