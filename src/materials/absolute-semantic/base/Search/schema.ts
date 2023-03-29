import templateStr from '!raw-loader!./index';
import {
  IDataListConfigType,
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TDataListSearchType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TSearchSize =
  | 'mini'
  | 'tiny'
  | 'small'
  | 'large'
  | 'big'
  | 'huge'
  | 'massive';

type TSearchEditData = Array<
  | ITextConfigType
  | IDataListConfigType
  | ISwitchConfigType
  | ISelectConfigType<TSearchSize>
>;

export interface ISearchConfig {
  placeholder: TTextDefaultType;
  size: TSelectDefaultType<TSearchSize>;
  fluid: TSwitchDefaultType;
  dataSource: TDataListSearchType;
}

interface ISearchSchema {
  editData: TSearchEditData;
  config: ISearchConfig;
  [key: string]: any;
}

const Search: ISearchSchema = {
  editData: [
    {
      key: 'placeholder',
      name: '默认显示',
      type: 'Text',
    },
    {
      key: 'fluid',
      name: '与父元素同宽',
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
      key: 'dataSource',
      name: '数据源',
      type: 'DataList',
    },
  ],
  config: {
    placeholder: 'Search...',
    fluid: true,
    size: 'small',
    dataSource: [
      {
        id: '1',
        title: 'xiye',
        description: '这是关于xiye的描述',
        image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        price: '100',
      },
      {
        id: '2',
        title: 'Cayon',
        description: '这是关于Cayon的描述',
        image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        price: '200',
      },
      {
        id: '3',
        title: 'Test',
        description: '这是关于Test的描述',
        image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        price: '300',
      },
      {
        id: '4',
        title: 'Ellus Thus',
        description: '这是关于Ellus Thus的描述',
        image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
        price: '400',
      },
    ],
  },
  templateStr,
};

export default Search;
