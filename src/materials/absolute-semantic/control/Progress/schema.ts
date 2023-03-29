import templateStr from '!raw-loader!./index';
import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TProgressColorType =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'olive'
  | 'green'
  | 'teal'
  | 'blue'
  | 'violet'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'grey'
  | 'black';

type TProgressType = 'percent' | 'ratio' | 'value';

type TProgressSize = 'tiny' | 'small' | 'medium' | 'big' | 'large';

type TProgressEditData = Array<
  | ISelectConfigType<TProgressColorType>
  | ISelectConfigType<TProgressType>
  | ISelectConfigType<TProgressSize>
  | ITextConfigType
  | ISwitchConfigType
>;

export interface IProgressConfig {
  defaultValue: TTextDefaultType;
  total: TTextDefaultType;
  color: TSelectDefaultType<TProgressColorType>;
  disabled: TSwitchDefaultType;
  indicating: TSwitchDefaultType;
  inverted: TSwitchDefaultType;
  label: TTextDefaultType;
  progress: TSelectDefaultType<TProgressType>;
  size: TSelectDefaultType<TProgressSize>;
  error: TSwitchDefaultType;
  success: TSwitchDefaultType;
  warning: TSwitchDefaultType;
}

interface IProgressSchema {
  editData: TProgressEditData;
  config: IProgressConfig;
  [key: string]: any;
}

const Progress: IProgressSchema = {
  editData: [
    {
      key: 'defaultValue',
      name: '默认数值',
      type: 'Text',
    },
    {
      key: 'total',
      name: '进度条总值',
      type: 'Text',
    },
    {
      key: 'color',
      name: '颜色',
      type: 'Select',
      range: [
        {
          key: 'red',
          text: 'red',
        },
        {
          key: 'orange',
          text: 'orange',
        },
        {
          key: 'yellow',
          text: 'yellow',
        },
        {
          key: 'olive',
          text: 'olive',
        },
        {
          key: 'green',
          text: 'green',
        },
        {
          key: 'teal',
          text: 'teal',
        },
        {
          key: 'blue',
          text: 'blue',
        },
        {
          key: 'violet',
          text: 'violet',
        },
        {
          key: 'purple',
          text: 'purple',
        },
        {
          key: 'pink',
          text: 'pink',
        },
        {
          key: 'brown',
          text: 'brown',
        },
        {
          key: 'grey',
          text: 'grey',
        },
        {
          key: 'black',
          text: 'black',
        },
      ],
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch',
    },
    {
      key: 'indicating',
      name: '显示级别',
      type: 'Switch',
    },
    {
      key: 'inverted',
      name: '反色',
      type: 'Switch',
    },
    {
      key: 'label',
      name: '进度条说明',
      type: 'Text',
    },
    {
      key: 'progress',
      name: '进度条格式',
      type: 'Select',
      range: [
        {
          key: 'percent',
          text: 'percent',
        },
        {
          key: 'ratio',
          text: 'radio',
        },
        {
          key: 'value',
          text: 'value',
        },
      ],
    },
    {
      key: 'size',
      name: '尺寸',
      type: 'Select',
      range: [
        {
          key: 'tiny',
          text: 'tiny',
        },
        {
          key: 'small',
          text: 'small',
        },
        {
          key: 'medium',
          text: 'medium',
        },
        {
          key: 'large',
          text: 'large',
        },
        {
          key: 'big',
          text: 'big',
        },
      ],
    },
    {
      key: 'error',
      name: '错误格式',
      type: 'Switch',
    },
    {
      key: 'success',
      name: '成功格式',
      type: 'Switch',
    },
    {
      key: 'warning',
      name: '警告格式',
      type: 'Switch',
    },
  ],
  config: {
    defaultValue: '50',
    total: '100',
    color: 'teal',
    disabled: false,
    indicating: false,
    inverted: false,
    label: '这是一个进度条',
    progress: 'percent',
    size: 'medium',
    error: false,
    success: false,
    warning: false,
  },
  templateStr,
};

export default Progress;
