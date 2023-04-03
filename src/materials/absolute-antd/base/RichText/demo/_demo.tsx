import React from 'react';
import ARichText from '@/materials/absolute-antd/base/RichText';

const attr = {
  round: 0,
  borderWidth: 0,
  borderColor: 'rgba(255,255,255,1)',
  padding: 0,
  content: '',
};
export default () => <ARichText isTpl={false} {...attr} />;
