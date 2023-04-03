import React from 'react';
import AProgress from '@/materials/absolute-antd/media/Progress';

const attr = {
  text: '%',
  percent: 20,
  showInfo: true,
  type: 'line',
  status: 'success',
  strokeColor: 'rgb(60,129,239)',
  strokeLinecap: 'round',
  trailColor: 'rgb(201,199,199)',
  steps: 0,
  strokeWidth: 6,
  circleWidth: 132,
  gapDegree: 75,
  gapPosition: 'bottom',
  dashboardWidth: 132,
};
export default () => (
  /*@ts-ignore*/
  <AProgress isTpl={false} {...attr} />
);
