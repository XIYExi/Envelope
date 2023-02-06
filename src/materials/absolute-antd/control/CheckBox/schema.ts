import {
  ISwitchConfigType,
  ITextConfigType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TCheckBoxEditData = Array< ITextConfigType | ISwitchConfigType >

export interface ICheckBoxConfig{
  text: TTextDefaultType;
  autoFocus: TSwitchDefaultType;
  defaultChecked: TSwitchDefaultType;
  disabled: TSwitchDefaultType;
}

interface ICheckBoxSchema {
  editData: TCheckBoxEditData;
  config: ICheckBoxConfig;
}


const CheckBox: ICheckBoxSchema = {
  editData: [
    {
      key: 'text',
      name: '文本',
      type: 'Text'
    },
    {
      key: 'autoFocus',
      name:'自动获得焦点',
      type:'Switch'
    },
    {
      key: 'defaultChecked',
      name: '默认状态',
      type:'Switch'
    },
    {
      key: 'disabled',
      name: '禁用',
      type:'Switch'
    }
  ],
  config: {
    text: 'checkbox',
    autoFocus: false,
    defaultChecked: false,
    disabled: false
  }
}

export default CheckBox;
