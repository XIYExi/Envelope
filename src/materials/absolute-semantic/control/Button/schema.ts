import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TColorType =
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
  | 'black'
  | 'facebook'
  | 'google plus'
  | 'instagram'
  | 'linkedin'
  | 'twitter'
  | 'vk'
  | 'youtube';

type TLabelPosition = 'left' | 'right';

type TSize =
  | 'mini'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'big'
  | 'huge'
  | 'massive';

type TType = 'button' | 'submit' | 'reset';

type TPointing = 'left' | 'right';

type TButtonEditData = Array<
  | ITextConfigType
  | ISwitchConfigType
  | ISelectConfigType<TColorType>
  | ISelectConfigType<TLabelPosition>
  | ISelectConfigType<TSize>
  | ISelectConfigType<TType>
  | ISelectConfigType<TPointing>
>;

export interface ISButtonConfig {
  text: TTextDefaultType;
  basic: TSwitchDefaultType;
  circular: TSwitchDefaultType;
  color: TSelectDefaultType<TColorType>;
  compact: TSwitchDefaultType;
  disabled: TSwitchDefaultType;
  fluid: TSwitchDefaultType;
  inverted: TSwitchDefaultType;
  label: TTextDefaultType;
  labelPosition: TSelectDefaultType<TLabelPosition>;
  pointing: TSelectDefaultType<TPointing>;
  loading: TSwitchDefaultType;
  negative: TSwitchDefaultType;
  positive: TSwitchDefaultType;
  size: TSelectDefaultType<TSize>;
  toggle: TSwitchDefaultType;
  type: TSelectDefaultType<TType>;
}

interface IButtonSchema {
  editData: TButtonEditData;
  config: ISButtonConfig;
  [key: string]: any;
}

const SButton: IButtonSchema = {
  editData: [
    {
      key: 'text',
      name: '文本',
      type: 'Text',
    },
    {
      key: 'basic',
      name: '基本按钮',
      type: 'Switch',
    },
    {
      key: 'circular',
      name: '圆角',
      type: 'Switch',
    },
    {
      key: 'color',
      name: '背景色',
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
        {
          key: 'facebook',
          text: 'facebook',
        },
        {
          key: 'google plus',
          text: 'google plus',
        },
        {
          key: 'instagram',
          text: 'instagram',
        },
        {
          key: 'linkedin',
          text: 'linkedin',
        },
        {
          key: 'twitter',
          text: 'twitter',
        },
        {
          key: 'vk',
          text: 'vk',
        },
        {
          key: 'youtube',
          text: 'youtube',
        },
      ],
    },
    {
      key: 'compact',
      name: '紧凑模式',
      type: 'Switch',
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch',
    },
    {
      key: 'fluid',
      name: '与父容器等宽',
      type: 'Switch',
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
      key: 'labelPosition',
      name: 'label位置',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: '左对齐',
        },
        {
          key: 'right',
          text: '右对齐',
        },
      ],
    },
    {
      key: 'pointing',
      name: 'label开口位置',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: '左侧',
        },
        {
          key: 'right',
          text: '右侧',
        },
      ],
    },
    {
      key: 'loading',
      name: '载入',
      type: 'Switch',
    },
    {
      key: 'negative',
      name: '消极类型按钮',
      type: 'Switch',
    },
    {
      key: 'positive',
      name: '积极类型按钮',
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
    {
      key: 'toggle',
      name: '开关模式',
      type: 'Switch',
    },
    {
      key: 'type',
      name: '按钮类型',
      type: 'Select',
      range: [
        {
          key: 'button',
          text: 'button',
        },
        {
          key: 'submit',
          text: 'submit',
        },
        {
          key: 'reset',
          text: 'reset',
        },
      ],
    },
  ],
  config: {
    text: 'Button',
    basic: true,
    circular: false,
    color: 'teal',
    compact: false,
    disabled: false,
    fluid: false,
    inverted: false,
    label: 'Label',
    labelPosition: 'right',
    pointing: 'right',
    loading: false,
    negative: false,
    positive: false,
    size: 'medium',
    toggle: false,
    type: 'button',
  },
  templateStr,
};

export default SButton;
