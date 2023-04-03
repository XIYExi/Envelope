import React from 'react';
import ASegmented from '@/materials/absolute-antd/control/Segmented';

const attr = {
  onlyIcon: false,
  block: false,
  disabled: false,
  label: 'a-b-c-d',
  icon: 'BarsOutlined-AppstoreOutlined',
};
export default () => (
  /*@ts-ignore*/
  <ASegmented isTpl={false} {...attr} />
);
