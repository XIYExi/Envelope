import {
  ISwitchConfigType,
  TSwitchDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TSwitchEditData = Array<ISwitchConfigType>;

export interface ISwitchConfig {
  autoFocus: TSwitchDefaultType;
  defaultChecked: TSwitchDefaultType;
  disabled: TSwitchDefaultType;
  loading: TSwitchDefaultType;
}

interface ISwitchSchema {
  editData: TSwitchEditData;
  config: ISwitchConfig;
  [key: string]: any;
}

const Switch: ISwitchSchema = {
  editData: [
    {
      key: 'autoFocus',
      name: '自动获取焦点',
      type: 'Switch',
    },
    {
      key: 'defaultChecked',
      name: '默认选中',
      type: 'Switch',
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch',
    },
    {
      key: 'loading',
      name: '加载中的开关',
      type: 'Switch',
    },
  ],
  config: {
    autoFocus: false,
    defaultChecked: false,
    disabled: false,
    loading: false,
  },
  templateStr,
};
export default Switch;
