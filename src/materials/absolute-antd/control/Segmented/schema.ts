import {
  ISwitchConfigType,
  ITextAreaConfigType,
  TSwitchDefaultType,
  TTextAreaDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TSegmentedEditData = Array<ITextAreaConfigType | ISwitchConfigType>;

export interface ISegmentedConfig {
  onlyIcon: TSwitchDefaultType;
  block: TSwitchDefaultType;
  disabled: TSwitchDefaultType;
  label: TTextAreaDefaultType;
  icon: TTextAreaDefaultType;
}

interface ISegmentedSchema {
  editData: TSegmentedEditData;
  config: ISegmentedConfig;
  [key: string]: any;
}

const Segmented: ISegmentedSchema = {
  editData: [
    {
      key: 'onlyIcon',
      name: '只显示图标',
      type: 'Switch',
    },
    {
      key: 'block',
      name: '宽度调整为父元素宽度',
      type: 'Switch',
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch',
    },
    {
      key: 'label',
      name: '内容',
      type: 'TextArea',
    },
    {
      key: 'icon',
      name: '图标',
      type: 'TextArea',
    },
  ],
  config: {
    onlyIcon: false,
    block: false,
    disabled: false,
    label: 'a-b-c-d',
    icon: 'BarsOutlined-AppstoreOutlined',
  },
  templateStr,
};

export default Segmented;
