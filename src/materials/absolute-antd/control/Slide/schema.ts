import {
  INumberConfigType, IPosConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TNumberDefaultType,
  TPosDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TSlideEditData = Array<
  | ITextConfigType
  | ISwitchConfigType
  | INumberConfigType
  | IPosConfigType
  >


export interface ISlideConfig {
  allowClear: TSwitchDefaultType;
  defaultValue: TPosDefaultType;
  disabled: TSwitchDefaultType;
  dots: TSwitchDefaultType;
  included: TSwitchDefaultType;
  marks: TTextDefaultType;
  min: TNumberDefaultType;
  max: TNumberDefaultType;
  range: TSwitchDefaultType;
  reverse: TSwitchDefaultType;
  step: TNumberDefaultType;
}

interface ISlideSchema {
  editData: TSlideEditData;
  config: ISlideConfig;
}

const Slide: ISlideSchema = {
  editData: [
    {
      key: 'allowClear',
      name: '支持清除',
      type: 'Switch'
    },
    {
      key: 'defaultValue',
      name: '默认值',
      type: 'Pos'
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch'
    },
    {
      key: 'dots',
      name: '是否只能拖拽到刻度上',
      type: 'Switch'
    },
    {
      key: 'included',
      name: '是否为包含关系',
      type: 'Switch'
    },
    {
      key: 'min',
      name: '最小值',
      type: 'Number'
    },
    {
      key: 'max',
      name: '最大值',
      type: 'Number'
    },
    {
      key: 'range',
      name: '双滑块模式',
      type: 'Switch'
    },
    {
      key: 'reverse',
      name: '反转坐标系',
      type: 'Switch'
    },
    {
      key: 'step',
      name: '步长',
      type: 'Number'
    },
  ],
  config:{
    allowClear: true,
    defaultValue: [20, 50],
    disabled: false,
    dots: false,
    included: true,
    marks: '0-26-37-80',
    min: 0,
    max: 100,
    range: true,
    reverse: false,
    step: 1,
  }
}

export default Slide;
