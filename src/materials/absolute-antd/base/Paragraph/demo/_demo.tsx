import React from 'react';
import AParagraph from '@/materials/absolute-antd/base/Paragraph';
const attr = {
  text:
    'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant\n' +
    '        Design, a design language for background applications, is refined by Ant UED Team. Ant\n' +
    '        Design, a design language for background applications, is refined by Ant UED Team. Ant\n' +
    '        Design, a design language for background applications, is refined by Ant UED Team. Ant\n' +
    '        Design, a design language for background applications, is refined by Ant UED Team. Ant\n' +
    '        Design, a design language for background applications, is refined by Ant UED Team.',
  disabled: false,
  code: false,
  delete: false,
  strong: false,
  italic: false,
  underline: false,
  mark: false,
  color: 'rgba(60, 60, 60, 1)',
  fontSize: 14,
  indent: 20,
  lineHeight: 1.8,
  textAlign: 'left',
  bgColor: 'rgba(255, 255, 255, 0)',
  padding: 0,
  radius: 0,
  rows: 2,
  expendable: true,
  symbol: 'more',
};
export default () => (
  /*@ts-ignore*/
  <AParagraph isTpl={false} {...attr} />
);
