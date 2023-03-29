import React from 'react';
import SProgress from '@/materials/absolute-semantic/control/Progress';

const attr = {
  defaultValue: '77',
  total: '100',
  color: 'teal',
  disabled: false,
  indicating: true,
  inverted: false,
  label: '这是一个进度条',
  progress: 'progress',
  size: 'medium',
  error: false,
  success: false,
  warning: false,
};

export default () => (
  /*@ts-ignore*/
  <SProgress isTpl={false} {...attr} />
);
