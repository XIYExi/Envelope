import React from 'react';
import ACalendar from '@/materials/absolute-antd/media/Calendar';
const attr = {
  time: '2023-01-21',
  range: '2022-01-01,2023-12-30',
  width: 300,
  color: 'rgba(0,0,0,1)',
  selectedColor: 'rgba(22,40,212,1)',
  fullscreen: false,
  round: 10,
};
export default () => (
  /*@ts-ignore*/
  <ACalendar isTpl={false} {...attr} />
);
