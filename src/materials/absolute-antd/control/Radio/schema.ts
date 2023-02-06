import {
  IRadioConfigType,
  ISelectConfigType,
  ISwitchConfigType,
  ITextAreaConfigType,
  TSelectDefaultType, TSwitchDefaultType, TTextAreaDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TRadioTypeType = 'default' | 'button';

type TRadioButtonStyleType = 'outline' | 'solid';

type TRadioEditData = Array<
  | ITextAreaConfigType
  | ISelectConfigType<TRadioTypeType>
  | ISelectConfigType<TRadioButtonStyleType>
  | ISwitchConfigType
  >

export interface IRadioConfig {
  type: TSelectDefaultType<TRadioTypeType>;
  buttonStyle: TSelectDefaultType<TRadioButtonStyleType>;
  disabled: TSwitchDefaultType;
  options: TTextAreaDefaultType;
  autoFocus: TSwitchDefaultType;
}

interface IRadioSchema {
  editData: TRadioEditData;
  config: IRadioConfig;
}

const Radio: IRadioSchema = {
  editData:[
    {
      key: 'type',
      name: '选项类型',
      type: 'Select',
      range: [
        {
          key: 'default',
          text: '默认'
        },
        {
          key: 'button',
          text: '按钮'
        }
      ]
    },
    {
      key: 'buttonStyle',
      name: 'RadioButton 的风格样式',
      type: 'Select',
      range: [
        {
          key: 'outline',
          text: '边框'
        },
        {
          key: 'solid',
          text: '流线'
        }
      ]
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch'
    },
    {
      key: 'options',
      name: '选项',
      type: 'TextArea'
    },
    {
      key: 'autoFocus',
      name: '自动聚焦',
      type: 'Switch'
    }
  ],
  config:{
    type: 'default',
    buttonStyle: 'outline',
    disabled: false,
    options: 'a-b-c-d-e',
    autoFocus: false,
  }
}
export default Radio;
