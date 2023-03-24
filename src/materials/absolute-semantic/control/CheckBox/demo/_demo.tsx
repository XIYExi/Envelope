import React from 'react';
import SCheckBox from '@/materials/absolute-semantic/control/CheckBox';
import 'semantic-ui-css/semantic.min.css';

const attr = {
  label: 'CheckBox',
  defaultChecked: false,
  disabled: false,
  fitted: false,
  readOnly: false,
  type: 'checkbox',
};

export default () => (
  /*@ts-ignore*/
  <SCheckBox isTpl={false} {...attr} />
);
