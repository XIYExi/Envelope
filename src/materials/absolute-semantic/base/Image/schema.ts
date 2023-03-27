import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TImageSize =
  | 'mini'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'big'
  | 'huge'
  | 'massive';

type TImageVerticalAlign = 'bottom' | 'middle' | 'top';

type TImageEditData = Array<
  | ITextConfigType
  | ISwitchConfigType
  | ISelectConfigType<TImageSize>
  | ISelectConfigType<TImageVerticalAlign>
>;

export interface IImageConfig {
  src: TTextDefaultType;
  alt: TTextDefaultType;
  avatar: TSwitchDefaultType;
  bordered: TSwitchDefaultType;
  centered: TSwitchDefaultType;
  circular: TSwitchDefaultType;
  disabled: TSwitchDefaultType;
  fluid: TSwitchDefaultType;
  hidden: TSwitchDefaultType;
  inline: TSwitchDefaultType;
  rounded: TSwitchDefaultType;
  size: TSelectDefaultType<TImageSize>;
  verticalAlign: TSelectDefaultType<TImageVerticalAlign>;
  wrapper: TSwitchDefaultType;
}

interface IImageSchema {
  editData: TImageEditData;
  config: IImageConfig;
  [key: string]: any;
}

const Image: IImageSchema = {
  editData: [
    {
      key: 'src',
      name: '图片链接',
      type: 'Text',
    },
    {
      key: 'alt',
      name: '描述文本',
      type: 'Text',
    },
    {
      key: 'avatar',
      name: '渲染为头像',
      type: 'Switch',
    },
    {
      key: 'bordered',
      name: '边框',
      type: 'Switch',
    },
    {
      key: 'circular',
      name: '圆形图片',
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
      key: 'hidden',
      name: '隐藏',
      type: 'Switch',
    },
    {
      key: 'inline',
      name: '内联',
      type: 'Switch',
    },
    {
      key: 'rounded',
      name: '圆角',
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
      key: 'verticalAlign',
      name: '对齐方式',
      type: 'Select',
      range: [
        {
          key: 'bottom',
          text: '底部对齐',
        },
        {
          key: 'middle',
          text: '中线对齐',
        },
        {
          key: 'top',
          text: '顶部对齐',
        },
      ],
    },
    {
      key: 'wrapper',
      name: '使用div包裹',
      type: 'Switch',
    },
  ],
  config: {
    src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
    alt: '这是一个Image',
    avatar: false,
    bordered: false,
    centered: false,
    circular: false,
    disabled: false,
    fluid: false,
    hidden: false,
    inline: false,
    rounded: false,
    size: 'medium',
    verticalAlign: 'middle',
    wrapper: false,
  },
  templateStr,
};

export default Image;
