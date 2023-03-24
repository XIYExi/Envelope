import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TCheckBoxType = 'checkbox' | 'toggle' | 'slider';

type TCheckBoxEditData = Array<
  ITextConfigType | ISwitchConfigType | ISelectConfigType<TCheckBoxType>
>;

export interface ICheckBoxConfig {
  label: TTextDefaultType;
  defaultChecked: TSwitchDefaultType;
  disabled: TSwitchDefaultType;
  fitted: TSwitchDefaultType;
  readOnly: TSwitchDefaultType;
  type: TSelectDefaultType<TCheckBoxType>;
}

interface ICheckBoxSchema {
  editData: TCheckBoxEditData;
  config: ICheckBoxConfig;
  [key: string]: any;
}

const CheckBox: ICheckBoxSchema = {
  editData: [
    {
      key: 'label',
      name: '标签',
      type: 'Text',
    },
    {
      key: 'defaultChecked',
      name: '默认选择',
      type: 'Switch',
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch',
    },
    {
      key: 'fitted',
      name: '紧凑型',
      type: 'Switch',
    },
    {
      key: 'readOnly',
      name: '只读',
      type: 'Switch',
    },
    {
      key: 'type',
      name: '渲染类型',
      type: 'Select',
      range: [
        {
          key: 'checkbox',
          text: 'checkbox',
        },
        {
          key: 'toggle',
          text: 'toggle',
        },
        {
          key: 'slider',
          text: 'slider',
        },
      ],
    },
  ],
  config: {
    label: 'CheckBox',
    defaultChecked: false,
    disabled: false,
    fitted: false,
    readOnly: false,
    type: 'checkbox',
  },
  templateStr,
};

export default CheckBox;
