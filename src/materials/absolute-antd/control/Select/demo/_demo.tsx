import React from 'react';
import ASelect from '@/materials/absolute-antd/control/Select';

const attr = {
  options: 'aaaa-bbbb-cccc-d-e-f-g',
  allowClear: true,
  autoFocus: false,
  bordered: true,
  clearIcon: 'MinusCircleOutlined',
  defaultActiveFirstOption: true,
  defaultOpen: false,
  disabled: false,
  listHeight: 256,
  loading: false,
  maxTagCount: 5,
  maxTagPlaceholder: '...',
  maxTagTextLength: 3,
  mode: 'multiple',
  placeholder: '请选择...',
  placement: 'bottomLeft',
  showArrow: true,
  showSearch: true,
  suffixIcon: 'MinusCircleOutlined',
  virtual: true,
};
export default () => (
  /*@ts-ignore*/
  <ASelect isTpl={false} {...attr} />
);
