import React from 'react';
import SStatistic from '@/materials/absolute-semantic/base/Staistic';

const attr = {
  label: 'Label',
  value: '50,000',
  color: 'black',
  horizontal: false,
  inverted: false,
  size: 'small',
};

export default () => (
  /*@ts-ignore*/
  <SStatistic isTpl={false} {...attr} />
);
