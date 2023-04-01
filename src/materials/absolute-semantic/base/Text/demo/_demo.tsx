import React from 'react';
import SText from '@/materials/absolute-semantic/base/Text';

const attr = {
  text: 'Pellentesque habitant morbi tristique senectus.',
  basic: false,
  circular: false,
  color: 'teal',
  compact: false,
  disabled: false,
  inverted: false,
  piled: false,
  placeholder: false,
  raised: false,
  size: 'large',
  stacked: false,
  textAlign: 'left',
};

export default () => (
  /*@ts-ignore*/
  <SText isTpl={false} {...attr} />
);
