import templateStr from '!raw-loader!./index';
import {
  IRichTextConfigType,
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TRichTextDefaultType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TCardColor =
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

type TCardTextAlign = 'left' | 'center' | 'right';

type TCardEditData = Array<
  | ITextConfigType
  | ISwitchConfigType
  | ISelectConfigType<TCardColor>
  | ISelectConfigType<TCardTextAlign>
  | IRichTextConfigType
>;

export interface ICardConfig {
  src: TTextDefaultType;
  color: TSelectDefaultType<TCardColor>;
  title: TTextDefaultType;
  titleTextAlign: TSelectDefaultType<TCardTextAlign>;
  meta: TTextDefaultType;
  desc: TRichTextDefaultType;
  descTextAlign: TSelectDefaultType<TCardTextAlign>;
  extra: TTextDefaultType;
  metaTextAlign: TSelectDefaultType<TCardTextAlign>;
  fluid: TSwitchDefaultType;
  raised: TSwitchDefaultType;
}

interface ICardSchema {
  editData: TCardEditData;
  config: ICardConfig;
  [key: string]: any;
}

const Card: ICardSchema = {
  editData: [
    {
      key: 'src',
      name: '图片链接',
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
      key: 'title',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'titleTextAlign',
      name: '标题对齐位置',
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
    {
      key: 'meta',
      name: '元数据',
      type: 'Text',
    },
    {
      key: 'metaTextAlign',
      name: '元数据对齐位置',
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
    {
      key: 'desc',
      name: '描述',
      type: 'RichText',
    },
    {
      key: 'descTextAlign',
      name: '描述对齐位置',
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
    {
      key: 'extra',
      name: '额外内容',
      type: 'Text',
    },
    {
      key: 'fluid',
      name: '同父元素等宽',
      type: 'Switch',
    },
    {
      key: 'raised',
      name: '浮动',
      type: 'Switch',
    },
  ],
  config: {
    src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
    color: 'grey',
    title: '卡片标题',
    titleTextAlign: 'left',
    meta: '简单描述',
    metaTextAlign: 'left',
    desc: '关于卡片内容的详细表述',
    descTextAlign: 'left',
    extra: '额外内容',
    fluid: false,
    raised: false,
  },
  templateStr,
};

export default Card;
