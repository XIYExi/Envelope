import React from 'react';
import SHeader from '@/materials/absolute-semantic/base/Header';
import 'semantic-ui-css/semantic.min.css';

const attr = {
  title: '这是一个标题',
  block: false,
  color: 'black',
  disabled: false,
  dividing: false,
  inverted: false,
  subHeader: '这是对应的副标题',
  size: 'medium',
  textAlign: 'left',
};

export default () => (
  // @ts-ignore
  <SHeader isTpl={false} {...attr} />
);
