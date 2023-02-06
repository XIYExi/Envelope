import {
  IDataListConfigType,
  IFormItemsConfigType,
  INumberConfigType,
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TDataListDefaultType,
  TFormItemsDefaultType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import { baseConfig, baseDefault, ICommonBaseType } from '@/engine-lib-absolute/core-component/common';


export type TListSelectKeyLayoutType = 'horizontal' | 'vertical';

export type TListSelectKeySizeType = 'default' | 'small' | 'large';

export type TListSelectKeyPositionType = 'bottom' | 'top' | 'both';

export type TListEditData = Array<
  | ISwitchConfigType
  | ITextConfigType
  | IFormItemsConfigType
  | IDataListConfigType
  | ISelectConfigType<TListSelectKeyLayoutType>
  | ISelectConfigType<TListSelectKeySizeType>
  | ISelectConfigType<TListSelectKeyPositionType>
  | INumberConfigType
  >

export interface IListConfig extends ICommonBaseType {
  bordered: TSwitchDefaultType;
  header: TTextDefaultType;
  footer: TTextDefaultType;
  itemLayout: TSelectDefaultType<TListSelectKeyLayoutType>;
  loading: TSwitchDefaultType;
  size: TSelectDefaultType<TListSelectKeySizeType>;
  split: TSwitchDefaultType;
  pagination: TSwitchDefaultType;
  position: TSelectDefaultType<TListSelectKeyPositionType>;
  grid: TFormItemsDefaultType;
  sourceData: TDataListDefaultType;

}

export interface IListSchema {
  editData: TListEditData;
  config: IListConfig;
}

const List: IListSchema = {
  editData: [
    {
      key: 'bordered',
      name: '是否展示边框',
      type: 'Switch'
    },
    {
      key: 'header',
      name: '列表顶部',
      type: 'Text'
    },
    {
      key: 'footer',
      name: '列表底部',
      type: 'Text'
    },
    {
      key: 'itemLayout',
      name: '列表布局',
      type: 'Select',
      range: [
        {
          key: 'horizontal',
          text: '水平布局'
        },
        {
          key: 'vertical',
          text: '垂直布局'
        }
      ]
    },
    {
      key: 'loading',
      name: '加载时是否展位',
      type: 'Switch'
    },
    {
      key: 'size',
      name: '尺寸',
      type: 'Select',
      range: [
        {
          key: 'default',
          text: '默认'
        },
        {
          key: 'small',
          text: '小号'
        },
        {
          key: 'large',
          text: '大号'
        }
      ]
    },
    {
      key: 'split',
      name: '是否显示分割线',
      type: 'Switch'
    },
    {
      key: 'pagination',
      name: '是否显示分页',
      type: 'Switch'
    },
    {
      key: 'position',
      name: '分页位置',
      type: 'Select',
      range: [
        {
          key: 'bottom',
          text: '底部'
        },
        {
          key: 'top',
          text: '顶部'
        },
        {
          key: 'both',
          text: '两侧'
        }
      ]
    },
    {
      key: 'grid',
      name: '列表栅格配置',
      type: 'FormItems'
    },
    {
      key: 'sourceData',
      name: '数据源',
      type: 'DataList',
      cropRate: 1,
    },
    ...baseConfig
  ],
  config: {
    bordered: true,
    header: 'Header',
    footer: '',
    itemLayout: 'vertical',
    loading: false,
    size: 'default',
    split: false,
    pagination: false,
    position: 'bottom',
    grid: [
      {
        id: 'column',
        type: 'Number',
        label: '栅格列数column',
        placeholder: '0'
      },
      {
        id: 'gutter',
        type: 'Number',
        label: '栅格间隔gutter',
        placeholder: '16'
      },
      {
        id: 'xs',
        type: 'Number',
        label: '<576px 展示的列数[xs]',
        placeholder: '1'
      },
      {
        id: 'sm',
        type: 'Number',
        label: '≥576px 展示的列数[sm]',
        placeholder: '2'
      },
      {
        id: 'md',
        type: 'Number',
        label: '≥768px 展示的列数',
        placeholder: '4'
      },
      {
        id: 'lg',
        label: '≥992px 展示的列数',
        type: 'Number',
        placeholder: '4'
      },
      {
        id: 'xl',
        label: '≥1200px 展示的列数',
        type: 'Number',
        placeholder: '6'
      },
      {
        id: 'xxl',
        type: 'Number',
        label: '≥1600px 展示的列数',
        placeholder: '3'
      }
    ],
    sourceData: [
      {
        id: '1',
        title: '趣谈小课',
        desc: '致力于打造优质小课程',
        link: 'xxxxx',
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
          },
        ],
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), ' +
          'to help people create their product prototypes beautifully and efficiently.'
      },
      {
        id: '2',
        title: '趣谈小课',
        desc: '致力于打造优质小课程',
        link: 'xxxxx',
        imgUrl: [],
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), ' +
          'to help people create their product prototypes beautifully and efficiently.'
      },
    ],
    ...baseDefault,
  }
}

export default List;
