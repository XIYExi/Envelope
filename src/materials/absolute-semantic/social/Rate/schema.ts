import templateStr from '!raw-loader!./index';
import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TRatingSize = 'massive' | 'huge' | 'large' | 'small' | 'tiny' | 'mini';

type TRatingIcon = 'star' | 'heart';

type TRatingEditData = Array<
  | ISelectConfigType<TRatingSize>
  | ISelectConfigType<TRatingIcon>
  | ITextConfigType
  | ISwitchConfigType
>;

export interface IRatingConfig {
  defaultRating: TTextDefaultType;
  disabled: TSwitchDefaultType;
  maxRating: TTextDefaultType;
  size: TSelectDefaultType<TRatingSize>;
  icon: TSelectDefaultType<TRatingIcon>;
}

interface IRatingSchema {
  editData: TRatingEditData;
  config: IRatingConfig;
  [key: string]: any;
}

const Rating: IRatingSchema = {
  editData: [
    {
      key: 'defaultRating',
      name: '默认星数',
      type: 'Text',
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch',
    },
    {
      key: 'maxRating',
      name: '最大数',
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
          key: 'large',
          text: 'large',
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
      key: 'icon',
      name: 'icon形状',
      type: 'Select',
      range: [
        {
          key: 'star',
          text: '星型',
        },
        {
          key: 'heart',
          text: '心型',
        },
      ],
    },
  ],
  config: {
    defaultRating: '3',
    disabled: false,
    maxRating: '5',
    size: 'large',
    icon: 'star',
  },
  templateStr,
};

export default Rating;
