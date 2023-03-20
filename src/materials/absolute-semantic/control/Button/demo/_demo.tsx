import React from 'react';
import SButton from '@/materials/absolute-semantic/control/Button';
import 'semantic-ui-css/semantic.min.css';

const attr = {
  text: 'Button',
  basic: true,
  circular: false,
  color: 'teal',
  compact: false,
  disabled: false,
  fluid: false,
  inverted: false,
  label: 'Label',
  labelPosition: 'left',
  pointing: 'right',
  loading: false,
  negative: false,
  positive: false,
  size: 'medium',
  toggle: false,
  type: 'button',
};

export default () => (
  // @ts-ignore
  <SButton isTpl={false} {...attr} />
);
