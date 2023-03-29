import templateStr from '!raw-loader!./index';
import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TInputSize = 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';

type TInputPosition = 'left' | 'right';

type TInputEditData = Array<
  | ISwitchConfigType
  | ITextConfigType
  | ISelectConfigType<TInputSize>
  | ISelectConfigType<TInputPosition>
>;

export interface IInputConfig {
  placeholder: TTextDefaultType;
  disabled: TSwitchDefaultType;
  error: TSwitchDefaultType;
  fluid: TSwitchDefaultType;
  focus: TSwitchDefaultType;
  icon: TTextDefaultType;
  iconPosition: TSelectDefaultType<TInputPosition>;
  action: TTextDefaultType;
  inverted: TSwitchDefaultType;
  label: TTextDefaultType;
  tag: TSwitchDefaultType;
  labelPosition: TSelectDefaultType<TInputPosition>;
  loading: TSwitchDefaultType;
  size: TSelectDefaultType<TInputSize>;
}

interface IInputSchema {
  editData: TInputEditData;
  config: IInputConfig;
  [key: string]: any;
}

const Input: IInputSchema = {
  editData: [
    {
      key: 'placeholder',
      name: '默认显示',
      type: 'Text',
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch',
    },
    {
      key: 'error',
      name: '错误类型',
      type: 'Switch',
    },
    {
      key: 'fluid',
      name: '与父元素同宽',
      type: 'Switch',
    },
    {
      key: 'focus',
      name: '持续获得焦点',
      type: 'Switch',
    },
    {
      key: 'icon',
      name: '图标名称',
      type: 'Text',
    },
    {
      key: 'iconPosition',
      name: '图标位置',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: 'left',
        },
        {
          key: 'right',
          text: 'right',
        },
      ],
    },
    {
      key: 'action',
      name: '操作',
      type: 'Text',
    },
    {
      key: 'inverted',
      name: '反色',
      type: 'Switch',
    },
    {
      key: 'label',
      name: '标签',
      type: 'Text',
    },
    {
      key: 'tag',
      name: 'label是否为标签',
      type: 'Switch',
    },
    {
      key: 'labelPosition',
      name: '标签位置',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: 'left',
        },
        {
          key: 'right',
          text: 'right',
        },
      ],
    },
    {
      key: 'loading',
      name: '加载中',
      type: 'Switch',
    },
    {
      key: 'size',
      name: '尺寸',
      type: 'Select',
      range: [
        {
          key: 'mini',
          text: 'mini',
        },
        {
          key: 'small',
          text: 'small',
        },
        {
          key: 'large',
          text: 'large',
        },
        {
          key: 'big',
          text: 'big',
        },
        {
          key: 'huge',
          text: 'huge',
        },
        {
          key: 'massive',
          text: 'massive',
        },
      ],
    },
  ],
  config: {
    placeholder: 'Input...',
    disabled: false,
    error: false,
    fluid: true,
    focus: true,
    icon: 'search',
    iconPosition: 'right',
    action: 'Search',
    inverted: false,
    label: 'http://',
    tag: false,
    labelPosition: 'left',
    loading: false,
    size: 'small',
  },
  templateStr,
};

export default Input;
