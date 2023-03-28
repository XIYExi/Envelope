import templateStr from '!raw-loader!./index';
import {
  IDataListConfigType,
  ISelectConfigType,
  ISwitchConfigType,
  TDataListCommentListType,
  TDataListDefaultType,
  TSelectDefaultType,
  TSwitchDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TCommentSize =
  | 'mini'
  | 'tiny'
  | 'small'
  | 'large'
  | 'big'
  | 'huge'
  | 'massive';

type TCommentEditData = Array<
  ISwitchConfigType | ISelectConfigType<TCommentSize> | IDataListConfigType
>;

export interface ICommentConfig {
  collapsed: TSwitchDefaultType;
  minimal: TSwitchDefaultType;
  size: TSelectDefaultType<TCommentSize>;
  threaded: TSwitchDefaultType;
  dataSource: TDataListCommentListType;
}

interface ICommentSchema {
  editData: TCommentEditData;
  config: ICommentConfig;
  [key: string]: any;
}

const Comment: ICommentSchema = {
  editData: [
    {
      key: 'collapsed',
      name: '是否可折叠',
      type: 'Switch',
    },
    {
      key: 'minimal',
      name: '隐藏额外信息',
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
      key: 'threaded',
      name: '串接列表',
      type: 'Switch',
    },
    {
      key: 'dataSource',
      name: '数据源',
      type: 'DataList',
    },
  ],
  config: {
    collapsed: false,
    minimal: false,
    size: 'large',
    threaded: false,
    dataSource: [
      {
        id: '1000',
        avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        author: 'Matt',
        meta: 'Today at 5:42PM',
        content: 'How artistic!',
        actions: 'Reply-Open',
        child: [],
      },
      {
        id: '1001',
        avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        author: 'Elliot Fu',
        meta: 'Yesterday at 12:30AM',
        content: 'This has been very useful for my research. Thanks as well!',
        actions: 'Reply-Open',
        child: [
          {
            id: '1002',
            avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
            author: 'Jenny Hess',
            meta: 'Just now',
            content: 'Elliot you are always so right :)',
            actions: 'Reply-Open',
            child: [],
          },
        ],
      },
      {
        id: '1003',
        avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        author: 'Joe Henderson',
        meta: '5 days ago',
        content: 'Dude, this is awesome. Thanks so much',
        actions: 'Reply-Open',
        child: [],
      },
    ],
  },
  templateStr,
};

export default Comment;
