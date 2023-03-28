import React from 'react';
import SRating from '@/materials/absolute-semantic/social/Rate';

const attr = {
  defaultRating: '3',
  disabled: false,
  maxRating: '5',
  size: 'large',
  icon: 'heart',
  onRate: (e: any) => {
    console.log(e);
  },
};

export default () => (
  /*@ts-ignore*/
  <SRating isTpl={false} {...attr} />
);
