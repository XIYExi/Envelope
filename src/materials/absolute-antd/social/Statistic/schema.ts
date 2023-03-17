import {
  INumberConfigType,
  IRadioConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TNumberDefaultType,
  TRadioDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TStatisticValueType = 'string' | 'number';

type TStatisticEditData = Array<
  | ISwitchConfigType
  | ITextConfigType
  | IRadioConfigType<TStatisticValueType>
  | INumberConfigType
>;

export interface IStatisticConfig {
  title: TTextDefaultType;
  valueType: TRadioDefaultType<TStatisticValueType>;
  value: TTextDefaultType;
  decimalSeparator: TTextDefaultType;
  groupSeparator: TTextDefaultType;
  loading: TSwitchDefaultType;
  precision: TNumberDefaultType;
  prefix: TTextDefaultType;
}

interface IStatisticSchema {
  editData: TStatisticEditData;
  config: IStatisticConfig;
  [key: string]: any;
}

const Statistic: IStatisticSchema = {
  editData: [
    {
      key: 'title',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'valueType',
      name: '输入类型',
      type: 'Radio',
      range: [
        {
          key: 'string',
          text: 'string',
        },
        {
          key: 'number',
          text: 'number',
        },
      ],
    },
    {
      key: 'value',
      name: '数值内容',
      type: 'Text',
    },
    {
      key: 'decimalSeparator',
      name: '设置小数点',
      type: 'Text',
    },
    {
      key: 'groupSeparator',
      name: '设置千分位标识符',
      type: 'Text',
    },
    {
      key: 'loading',
      name: '数值是否加载',
      type: 'Switch',
    },
    {
      key: 'precision',
      name: '数值精度',
      type: 'Number',
    },
    {
      key: 'prefix',
      name: '前缀',
      type: 'Text',
    },
  ],
  config: {
    title: 'Feedback',
    valueType: 'number',
    value: '99999.9',
    decimalSeparator: '.',
    groupSeparator: ',',
    loading: false,
    precision: 4,
    prefix: 'LikeOutlined',
  },
  templateStr,
};

export default Statistic;
