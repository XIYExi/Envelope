import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import SDivider from '@/materials/absolute-semantic/control/Divider';

const attr = {
  text: 'Divider',
  fitted: false,
  hidden: false,
  inverted: false,
  section: false,
};

export default () => <SDivider isTpl={false} {...attr} />;
