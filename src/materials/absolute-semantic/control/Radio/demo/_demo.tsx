import SRadio from '@/materials/absolute-semantic/control/Radio';

const attr = {
  label: 'Radio',
  defaultChecked: false,
  disabled: false,
  readOnly: false,
  fitted: false,
};

export default () => <SRadio isTpl={false} {...attr} />;
