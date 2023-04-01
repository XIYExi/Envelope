import React from 'react';
import STextArea from '@/materials/absolute-semantic/base/TextArea';

const attr = {
  rows: '3',
  placeholder: 'Tell use more.',
};

export default () => <STextArea isTpl={false} {...attr} />;
