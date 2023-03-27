import SRadio from '@/materials/absolute-semantic/control/Radio';
import 'semantic-ui-css/semantic.min.css';

const attr = {
  label: 'Radio',
  defaultChecked: false,
  disabled: false,
  readOnly: false,
  fitted: false,
};

export default () => <SRadio isTpl={false} {...attr} />;
