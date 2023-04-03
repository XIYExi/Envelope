import React from 'react';
import AAlert from '@/materials/absolute-antd/base/Alert';

const attr = {
  message: 'Alert',
  type: 'success',
  closable: true,
  banner: false,
  showIcon: false,
};

export default () => (
  /*@ts-ignore*/
  <AAlert isTpl={false} {...attr} />
);
