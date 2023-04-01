import templateStr from '!raw-loader!./index';
import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TTextColor =
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

type TTextSize =
  | 'mini'
  | 'tiny'
  | 'small'
  | 'large'
  | 'big'
  | 'huge'
  | 'massive';

type TTextTextAlign = 'left' | 'center' | 'right';

type TTextEditData = Array<
  | ITextConfigType
  | ISwitchConfigType
  | ISelectConfigType<TTextColor>
  | ISelectConfigType<TTextSize>
  | ISelectConfigType<TTextTextAlign>
>;

export interface ITextConfig {
  text: TTextDefaultType;
  basic: TSwitchDefaultType;
  circular: TSwitchDefaultType;
  color: TSelectDefaultType<TTextColor>;
  compact: TSwitchDefaultType;
  disabled: TSwitchDefaultType;
  inverted: TSwitchDefaultType;
  piled: TSwitchDefaultType;
  placeholder: TSwitchDefaultType;
  raised: TSwitchDefaultType;
  size: TSelectDefaultType<TTextSize>;
  stacked: TSwitchDefaultType;
  textAlign: TSelectDefaultType<TTextTextAlign>;
}

interface ITextSchema {
  editData: TTextEditData;
  config: ITextConfig;
  [key: string]: any;
}

const Text: ITextSchema = {
  editData: [
    {
      key: 'text',
      name: '文本',
      type: 'Text',
    },
    {
      key: 'basic',
      name: '极简风格',
      type: 'Switch',
    },
    {
      key: 'circular',
      name: '圆角',
      type: 'Switch',
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
      key: 'compact',
      name: '紧凑风格',
      type: 'Switch',
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch',
    },
    {
      key: 'inverted',
      name: '反色',
      type: 'Switch',
    },
    {
      key: 'piled',
      name: '纸张风格',
      type: 'Switch',
    },
    {
      key: 'placeholder',
      name: '用于占位',
      type: 'Switch',
    },
    {
      key: 'raised',
      name: '浮动风格',
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
      key: 'stacked',
      name: '堆叠风格',
      type: 'Switch',
    },
    {
      key: 'textAlign',
      name: '文本对齐',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: '左对齐',
        },
        {
          key: 'center',
          text: '居中',
        },
        {
          key: 'right',
          text: '右对齐',
        },
      ],
    },
  ],
  config: {
    text: 'Pellentesque habitant morbi tristique senectus.',
    basic: false,
    circular: false,
    color: 'teal',
    compact: false,
    disabled: false,
    inverted: false,
    piled: false,
    placeholder: false,
    raised: false,
    size: 'large',
    stacked: false,
    textAlign: 'left',
  },
  templateStr,
};

export default Text;
