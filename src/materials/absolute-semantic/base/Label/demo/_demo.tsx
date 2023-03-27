import React from 'react';
import SLabel from '@/materials/absolute-semantic/base/Label';

const attr = {
  title: '标签',
  active: true,
  basic: false,
  circular: false,
  color: 'teal',
  empty: false,
  floating: false,
  horizontal: false,
  icon: 'mail',
  size: 'medium',
  tag: false,
};

export default () => (
  /*@ts-ignore*/
  <SLabel isTpl={false} {...attr} />
);
