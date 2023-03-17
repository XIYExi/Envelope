import {
  INumberConfigType,
  ISwitchConfigType,
  ITextAreaConfigType,
  ITextConfigType,
  TNumberDefaultType,
  TSwitchDefaultType,
  TTextAreaDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TCardEditData = Array<
  INumberConfigType | ITextConfigType | ITextAreaConfigType | ISwitchConfigType
>;

export interface ICardConfig {
  actions: TTextAreaDefaultType;
  width: TNumberDefaultType;
  bordered: TSwitchDefaultType;
  coverUrl: TTextDefaultType;
  hoverable: TSwitchDefaultType;
  loading: TSwitchDefaultType;
  title: TTextDefaultType;
  avatarUrl: TTextDefaultType;
  description: TTextAreaDefaultType;
}

interface ICardSchema {
  editData: TCardEditData;
  config: ICardConfig;
  [key: string]: any;
}

const Card: ICardSchema = {
  editData: [
    {
      key: 'actions',
      name: '位于底部的卡片操作组',
      type: 'TextArea',
    },
    {
      key: 'width',
      name: '宽度',
      type: 'Number',
    },
    {
      key: 'bordered',
      name: '是否有边框',
      type: 'Switch',
    },
    {
      key: 'coverUrl',
      name: '封面url',
      type: 'Text',
    },
    {
      key: 'hoverable',
      name: '鼠标移过时可浮起',
      type: 'Switch',
    },
    {
      key: 'loading',
      name: '加载中是否占位',
      type: 'Switch',
    },
    {
      key: 'title',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'avatarUrl',
      name: '头像url',
      type: 'Text',
    },
    {
      key: 'description',
      name: '卡片描述',
      type: 'TextArea',
    },
  ],
  config: {
    actions: 'SettingOutlined-EditOutlined-EllipsisOutlined',
    width: 300,
    bordered: true,
    coverUrl:
      'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    hoverable: false,
    loading: false,
    title: 'Card Title',
    avatarUrl: 'https://joeschmoe.io/api/v1/random',
    description: 'This is the description',
  },
  templateStr,
};

export default Card;
