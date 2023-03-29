import React from 'react';
import SInput from '@/materials/absolute-semantic/base/Input';

const attr = {
  placeholder: 'Input...',
  disabled: false,
  error: false,
  fluid: true,
  focus: false,
  icon: 'search',
  iconPosition: 'right',
  action: '',
  inverted: false,
  label: 'http://',
  tag: false,
  labelPosition: 'left',
  loading: false,
  size: 'small',
};

export default () => (
  /*@ts-ignore*/
  <SInput isTpl={false} {...attr} />
);
