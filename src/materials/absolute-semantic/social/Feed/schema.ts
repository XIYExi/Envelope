import templateStr from '!raw-loader!./index';
import {
  IDataListConfigType,
  ISelectConfigType,
  TDataListDefaultType,
  TDataListFeedListType,
  TSelectDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TFeedSize = 'small' | 'large';

type TFeedEditData = Array<IDataListConfigType | ISelectConfigType<TFeedSize>>;

export interface IFeedConfig {
  size: TSelectDefaultType<TFeedSize>;
  dataSource: TDataListFeedListType;
}

interface IFeedSchema {
  editData: TFeedEditData;
  config: IFeedConfig;
}

const Feed: IFeedSchema = {
  editData: [
    {
      key: 'size',
      name: '尺寸',
      type: 'Select',
      range: [
        {
          key: 'small',
          text: '小号',
        },
        {
          key: 'large',
          text: '大号',
        },
      ],
    },
    {
      key: 'dataSource',
      name: '数据源',
      type: 'DataList',
    },
  ],
  config: {
    size: 'small',
    dataSource: [
      {
        id: '100',
        src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        user: 'Elliot Fu',
        action: 'added you as a friend',
        date: '1 Hour Ago',
        like: '4 Likes',
        extraText: '',
        extraImages: '',
        icon: 'like',
      },
      {
        id: '101',
        src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        user: 'Cayon',
        action: 'posted on his page',
        date: '1 Hour Ago',
        like: '4 Likes',
        extraText:
          "Ours is a life of constant reruns. We're always circling back to where\n" +
          "          we'd we started, then starting all over again. Even if we don't run\n" +
          '          extra laps that day, we surely will come back for more of the same\n' +
          '          another day soon.',
        extraImages: '',
        icon: 'like',
      },
      {
        id: '102',
        src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        user: 'Xiye',
        action: 'Publish a group of pictures',
        date: '1 Hour Ago',
        like: '14 Likes',
        extraText: 'Pictures is beautiful~',
        extraImages:
          'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg-https://s1.ax1x.com/2023/03/27/ppsbWan.jpg-https://s1.ax1x.com/2023/03/27/ppsbWan.jpg-https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        icon: 'like',
      },
      {
        id: '102',
        src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        user: 'Xiye',
        action: 'added 2 new illustrations',
        date: '1 Hour Ago',
        like: '14 Likes',
        extraText:
          "Ours is a life of constant reruns. We're always circling back to where we'd we started.",
        extraImages:
          'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg-https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        icon: 'like',
      },
    ],
  },
};

export default Feed;
