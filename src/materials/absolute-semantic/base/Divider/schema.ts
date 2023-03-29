import {
  ISwitchConfigType,
  ITextConfigType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TDividerEditData = Array<ITextConfigType | ISwitchConfigType>;

export interface IDividerConfig {
  text: TTextDefaultType;
  fitted: TSwitchDefaultType;
  hidden: TSwitchDefaultType;
  inverted: TSwitchDefaultType;
  section: TSwitchDefaultType;
}

interface IDividerSchema {
  editData: TDividerEditData;
  config: IDividerConfig;
  [key: string]: any;
}

const Divider: IDividerSchema = {
  editData: [
    {
      key: 'text',
      name: '文本',
      type: 'Text',
    },
    {
      key: 'fitted',
      name: '紧凑型',
      type: 'Switch',
    },
    {
      key: 'hidden',
      name: '隐藏分割线',
      type: 'Switch',
    },
    {
      key: 'inverted',
      name: '反色',
      type: 'Switch',
    },
    {
      key: 'section',
      name: '段落分割',
      type: 'Switch',
    },
  ],
  config: {
    text: 'Divider',
    fitted: false,
    hidden: false,
    inverted: false,
    section: false,
  },
  templateStr,
};

export default Divider;
