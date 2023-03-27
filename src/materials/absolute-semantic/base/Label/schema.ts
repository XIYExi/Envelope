import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TLabelColor =
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

type TLabelSize =
  | 'mini'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'big'
  | 'huge'
  | 'massive';

type TLabelEditData = Array<
  | ISwitchConfigType
  | ITextConfigType
  | ISelectConfigType<TLabelSize>
  | ISelectConfigType<TLabelColor>
>;

export interface ILabelConfig {
  title: TTextDefaultType;
  active: TSwitchDefaultType;
  basic: TSwitchDefaultType;
  circular: TSwitchDefaultType;
  color: TSelectDefaultType<TLabelColor>;
  empty: TSwitchDefaultType;
  floating: TSwitchDefaultType;
  horizontal: TSwitchDefaultType;
  icon: TTextDefaultType;
  size: TSelectDefaultType<TLabelSize>;
  tag: TSwitchDefaultType;
}

interface ILabelSchema {
  editData: TLabelEditData;
  config: ILabelConfig;
  [key: string]: any;
}

const Label: ILabelSchema = {
  editData: [
    {
      key: 'title',
      name: '标签内容',
      type: 'Text',
    },
    {
      key: 'active',
      name: '激活',
      type: 'Switch',
    },
    {
      key: 'basic',
      name: '基础样式',
      type: 'Switch',
    },
    {
      key: 'circular',
      name: '圆形',
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
      key: 'empty',
      name: '设置为点',
      type: 'Switch',
    },
    {
      key: 'floating',
      name: '浮动',
      type: 'Switch',
    },
    {
      key: 'horizontal',
      name: '水平标签',
      type: 'Switch',
    },
    {
      key: 'icon',
      name: '图标',
      type: 'Text',
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
      key: 'tag',
      name: '显示为标签',
      type: 'Switch',
    },
  ],
  config: {
    title: '标签',
    active: true,
    basic: false,
    circular: false,
    color: 'teal',
    empty: false,
    floating: false,
    horizontal: false,
    icon: 'mail',
    size: 'medium',
    tag: false,
  },
  templateStr,
};

export default Label;
