import React from 'react';
import AAudio from '@/materials/absolute-antd/media/Audio';

const attr = {
  height: 32,
  url: 'http://io.nainor.com/audio.mp3',
};
export default () => (
  /*@ts-ignore*/
  <AAudio isTpl={false} {...attr} />
);
