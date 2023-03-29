import {
  IDataListConfigType,
  ISwitchConfigType,
  TDataListSemanticItemType,
  TSwitchDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TItemEditData = Array<ISwitchConfigType | IDataListConfigType>;

export interface IItemConfig {
  divided: TSwitchDefaultType;
  unstackable: TSwitchDefaultType;
  dataSource: TDataListSemanticItemType;
}

interface IItemSchema {
  editData: TItemEditData;
  config: IItemConfig;
  [key: string]: any;
}

const Item: IItemSchema = {
  editData: [
    {
      key: 'divided',
      name: '是否分割',
      type: 'Switch',
    },
    {
      key: 'unstackable',
      name: '移动设备不堆叠',
      type: 'Switch',
    },
    {
      key: 'dataSource',
      name: '数据源',
      type: 'DataList',
    },
  ],
  config: {
    divided: true,
    unstackable: false,
    dataSource: [
      {
        id: '12345',
        src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        imageSize: 'tiny',
        title: 'Item标题 1',
        meta: 'Meta-Data,关于Item 1内容的简短描述',
        desc: '这是Item需要渲染的具体内容，虽然是长文本，但是不建议过长。',
        extra: '其余信息',
      },
      {
        id: '12346',
        src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        imageSize: 'tiny',
        title: 'Item标题 2',
        meta: 'Meta-Data,关于Item 2内容的简短描述',
        desc: '这是Item需要渲染的具体内容，虽然是长文本，但是不建议过长。',
        extra: '其余信息',
      },
    ],
  },
  templateStr,
};

export default Item;
