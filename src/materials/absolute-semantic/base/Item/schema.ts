import {
  IRichTextConfigType,
  ISelectConfigType,
  ITextConfigType,
  TRichTextDefaultType,
  TSelectDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TItemImageSize =
  | 'mini'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'big'
  | 'huge'
  | 'massive';

type TItemEditData = Array<
  IRichTextConfigType | ITextConfigType | ISelectConfigType<TItemImageSize>
>;

export interface IItemConfig {
  src: TTextDefaultType;
  imageSize: TSelectDefaultType<TItemImageSize>;
  title: TTextDefaultType;
  meta: TTextDefaultType;
  desc: TRichTextDefaultType;
  extra: TTextDefaultType;
}

interface IItemSchema {
  editData: TItemEditData;
  config: IItemConfig;
  [key: string]: any;
}

const Item: IItemSchema = {
  editData: [
    {
      key: 'src',
      name: '图片链接',
      type: 'Text',
    },
    {
      key: 'imageSize',
      name: '图片尺寸',
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
      key: 'title',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'meta',
      name: '元数据',
      type: 'Text',
    },
    {
      key: 'content',
      name: '具体描述',
      type: 'RichText',
    },
    {
      key: 'extra',
      name: '额外内容',
      type: 'Text',
    },
  ],
  config: {
    src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
    imageSize: 'tiny',
    title: 'Item标题',
    meta: 'Meta-Data,关于Item内容的简短描述',
    desc: '这是Item需要渲染的具体内容，虽然是长文本，但是不建议过长。',
    extra: '其余信息',
  },
  templateStr,
};

export default Item;
