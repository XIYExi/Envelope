import React from 'react';
import SPlaceholder from '@/materials/absolute-semantic/base/Placeholder';

const attr = {
  renderHeader: 'Line,Line,Line',
  renderParagraph: 'Image,Line,,Line',
  fluid: false,
  inverted: false,
};

export default () => <SPlaceholder isTpl={false} {...attr} />;
