import React from 'react';
import SMessage from '@/materials/absolute-semantic/base/Message';

const attr = {
  header: '消息通知',
  content: '这是一条重要通知，请务必认真阅读',
  color: 'black',
  compact: false,
  error: false,
  floating: false,
  hidden: false,
  icon: 'inbox',
  info: false,
  negative: false,
  positive: false,
  success: false,
  visible: true,
  warning: false,
  size: 'small',
};

export default () => (
  /*@ts-ignore*/
  <SMessage isTpl={false} {...attr} />
);
