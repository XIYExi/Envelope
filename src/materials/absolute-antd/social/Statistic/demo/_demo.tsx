import React from 'react';
import AStatistic from '@/materials/absolute-antd/social/Statistic';
const attr = {
  title: 'Feedback',
  valueType: 'number',
  value: '99999.9',
  decimalSeparator: '.',
  groupSeparator: ',',
  loading: false,
  precision: 4,
  prefix: 'LikeOutlined',
};
export default () => (
  /*@ts-ignore*/
  <AStatistic isTpl={false} {...attr} />
);
