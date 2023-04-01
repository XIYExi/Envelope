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
import templateStr from '!raw-loader!./index';

type TAdvertisementUnit =
  | 'medium rectangle'
  | 'large rectangle'
  | 'vertical rectangle'
  | 'small rectangle'
  | 'mobile rectangle'
  | 'banner'
  | 'vertical banner'
  | 'top banner'
  | 'half banner'
  | 'button'
  | 'square button'
  | 'small button'
  | 'skyscraper'
  | 'wide skyscraper'
  | 'leaderboard'
  | 'large leaderboard'
  | 'mobile leaderboard'
  | 'billboard'
  | 'panorama'
  | 'netboard'
  | 'half page'
  | 'square'
  | 'small square';

type TAdvertisementEditData = Array<
  | ITextConfigType
  | IRichTextConfigType
  | ISwitchConfigType
  | ISelectConfigType<TAdvertisementUnit>
>;

export interface IAdvertisementConfig {
  centered: TSwitchDefaultType;
  src: TTextDefaultType;
  test: TRichTextDefaultType;
  unit: TSelectDefaultType<TAdvertisementUnit>;
}

interface IAdvertisementSchema {
  editData: TAdvertisementEditData;
  config: IAdvertisementConfig;
  [key: string]: any;
}

const Ad: IAdvertisementSchema = {
  editData: [
    {
      key: 'centered',
      name: '居中',
      type: 'Switch',
    },
    {
      key: 'src',
      name: '图片链接',
      type: 'Text',
    },
    {
      key: 'test',
      name: '显示文本',
      type: 'RichText',
    },
    {
      key: 'unit',
      name: '广告种类',
      type: 'Select',
      range: [
        {
          key: 'medium rectangle',
          text: 'medium rectangle',
        },
        {
          key: 'large rectangle',
          text: 'large rectangle',
        },
        {
          key: 'vertical rectangle',
          text: 'vertical rectangle',
        },
        {
          key: 'small rectangle',
          text: 'small rectangle',
        },
        {
          key: 'mobile rectangle',
          text: 'mobile rectangle',
        },
        {
          key: 'banner',
          text: 'banner',
        },
        {
          key: 'vertical banner',
          text: 'vertical banner',
        },
        {
          key: 'top banner',
          text: 'top banner',
        },
        {
          key: 'half banner',
          text: 'half banner',
        },
        {
          key: 'button',
          text: 'button',
        },
        {
          key: 'square button',
          text: 'square button',
        },
        {
          key: 'small button',
          text: 'small button',
        },
        {
          key: 'skyscraper',
          text: 'skyscraper',
        },
        {
          key: 'wide skyscraper',
          text: 'wide skyscraper',
        },
        {
          key: 'leaderboard',
          text: 'leaderboard',
        },
        {
          key: 'large leaderboard',
          text: 'large leaderboard',
        },
        {
          key: 'mobile leaderboard',
          text: 'mobile leaderboard',
        },
        {
          key: 'billboard',
          text: 'billboard',
        },
        {
          key: 'panorama',
          text: 'panorama',
        },
        {
          key: 'netboard',
          text: 'netboard',
        },
        {
          key: 'half page',
          text: 'half page',
        },
        {
          key: 'square',
          text: 'square',
        },
        {
          key: 'small square',
          text: 'small square',
        },
      ],
    },
  ],
  config: {
    centered: false,
    src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
    test: '这是一个广告',
    unit: 'medium rectangle',
  },
  templateStr,
};

export default Ad;
