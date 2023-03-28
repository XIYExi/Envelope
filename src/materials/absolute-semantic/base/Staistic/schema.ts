import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TStatisticSize = 'mini' | 'tiny' | 'small' | 'large' | 'huge';

type TStatisticColor =
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

type TStatisticEditData = Array<
  | ITextConfigType
  | ISelectConfigType<TStatisticSize>
  | ISelectConfigType<TStatisticColor>
  | ISwitchConfigType
>;

export interface IStatisticConfig {
  label: TTextDefaultType;
  value: TTextDefaultType;
  color: TSelectDefaultType<TStatisticColor>;
  horizontal: TSwitchDefaultType;
  inverted: TSwitchDefaultType;
  size: TSelectDefaultType<TStatisticSize>;
}

interface IStatisticSchema {
  editData: TStatisticEditData;
  config: IStatisticConfig;
  [key: string]: any;
}

const Statistic: IStatisticSchema = {
  editData: [
    {
      key: 'label',
      name: '标签',
      type: 'Text',
    },
    {
      key: 'value',
      name: '静态统计值',
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
      key: 'horizontal',
      name: '水平排列',
      type: 'Switch',
    },
    {
      key: 'inverted',
      name: '反色',
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
          key: 'huge',
          text: 'huge',
        },
      ],
    },
  ],
  config: {
    label: 'Label',
    value: '50,000',
    color: 'black',
    horizontal: false,
    inverted: false,
    size: 'small',
  },
  templateStr,
};

export default Statistic;
