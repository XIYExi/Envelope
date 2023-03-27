import {
  ISwitchConfigType,
  ITextConfigType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TRadioEditData = Array<ITextConfigType | ISwitchConfigType>;

export interface IRadioConfig {
  label: TTextDefaultType;
  defaultChecked: TSwitchDefaultType;
  disabled: TSwitchDefaultType;
  readOnly: TSwitchDefaultType;
  fitted: TSwitchDefaultType;
}

interface IRadioSchema {
  editData: TRadioEditData;
  config: IRadioConfig;
  [key: string]: any;
}

const Radio: IRadioSchema = {
  editData: [
    {
      key: 'label',
      name: '标签',
      type: 'Text',
    },
    {
      key: 'defaultChecked',
      name: '是否默认选中',
      type: 'Switch',
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch',
    },
    {
      key: 'readOnly',
      name: '只读',
      type: 'Switch',
    },
    {
      key: 'fitted',
      name: '紧凑型',
      type: 'Switch',
    },
  ],
  config: {
    label: 'Radio',
    defaultChecked: false,
    disabled: false,
    readOnly: false,
    fitted: false,
  },
  templateStr,
};

export default Radio;
