import {
  INumberConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TNumberDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TRateEditData = Array<
  | ITextConfigType
  | INumberConfigType
  | ISwitchConfigType
  >


export interface IRateConfig{
  allowClear: TSwitchDefaultType;
  allowHalf:TSwitchDefaultType;
  autoFocus: TSwitchDefaultType;
  character: TTextDefaultType;
  count: TNumberDefaultType;
  defaultValue: TNumberDefaultType;
  disabled: TSwitchDefaultType;
}

interface IRateSchema{
  editData: TRateEditData;
  config: IRateConfig;
}

const Rate: IRateSchema = {
  editData: [
    {
      key: 'allowClear',
      name: '再次点击允许清除',
      type: 'Switch'
    },
    {
      key: 'allowHalf',
      name: '允许半选',
      type: 'Switch'
    },
    {
      key: 'autoFocus',
      name: '自动聚焦',
      type: 'Switch'
    },
    {
      key: 'character',
      name: '自定义字符',
      type: 'Text'
    },
    {
      key: 'count',
      name: '数量',
      type: 'Number'
    },
    {
      key: 'defaultValue',
      name: '默认分数',
      type: 'Number'
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch'
    }
  ],
  config:{
    allowClear: false,
    allowHalf: false,
    autoFocus: false,
    character: 'StarFilled',
    count: 5,
    defaultValue: 0,
    disabled: false,
  }
}

export default Rate;
