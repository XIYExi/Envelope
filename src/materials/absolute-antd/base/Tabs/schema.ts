import {
  IDataListConfigType,
  IMutiTextConfigType,
  INumberConfigType,
  ISelectConfigType,
  ISwitchConfigType,
  TDataListDefaultType,
  TMutiTextDefaultType,
  TNumberDefaultType,
  TSelectDefaultType,
  TSwitchDefaultType,
} from '@/engine-lib-absolute/core-component/type';


export type TTabsSelectKeySizeType = 'small' | 'middle' | 'large';

export type TTabsSelectKeyTabPositionType = 'top' | 'right' | 'left' | 'bottom';

export type TTabsSelectKeyTypeType = 'line' | 'card' | 'editable-card';

export type TTabsEditData = Array<
  | IMutiTextConfigType
  | INumberConfigType
  | IDataListConfigType
  | ISwitchConfigType
  | ISelectConfigType<TTabsSelectKeySizeType>
  | ISelectConfigType<TTabsSelectKeyTabPositionType>
  | ISelectConfigType<TTabsSelectKeyTypeType>
  >

export interface ITabsConfig {
  tabs: TMutiTextDefaultType;
  centered: TSwitchDefaultType;
  size: TSelectDefaultType<TTabsSelectKeySizeType>;
  tabBarGutter: TNumberDefaultType;
  tabPosition: TSelectDefaultType<TTabsSelectKeyTabPositionType>;
  destroyInactiveTabPane: TSwitchDefaultType;
  type: TSelectDefaultType<TTabsSelectKeyTypeType>;
  hideAdd: TSwitchDefaultType;
  sourceData: TDataListDefaultType;
}

export interface ITabsSchema {
  editData: TTabsEditData;
  config: ITabsConfig;
}


const Tabs: ITabsSchema = {
  editData: [
    {
      key: 'tabs',
      name: '项目类别',
      type: 'MutiText'
    },
    {
      key: 'centered',
      name: '标签居中展示',
      type: 'Switch'
    },
    {
      key: 'size',
      name: '大小',
      type: 'Select',
      range: [
        {
          key: 'small',
          text: '小号'
        },
        {
          key: 'middle',
          text: '中等'
        },
        {
          key: 'large',
          text: '大号'
        }
      ]
    },
    {
      key: 'tabBarGutter',
      name: 'tabs 之间的间隙',
      type: 'Number'
    },
    {
      key: 'tabPosition',
      name: '页签位置',
      type: 'Select',
      range: [
        {
          key: 'top',
          text: '顶部'
        },
        {
          key: 'right',
          text: '右侧'
        },
        {
          key: 'left',
          text: '左侧'
        },
        {
          key: 'bottom',
          text: '底部'
        }
      ]
    },
    {
      key: 'destroyInactiveTabPane',
      name: '被隐藏时是否销毁 DOM 结构',
      type: 'Switch'
    },
    {
      key: 'type',
      name: '页签的基本样式',
      type: 'Select',
      range: [
        {
          key: 'line',
          text: 'line'
        },
        {
          key: 'card',
          text: 'card'
        },
        {
          key: 'editable-card',
          text: 'editable-card'
        }
      ]
    },
    {
      key: 'hideAdd',
      name: 'type="editable-card"下是否隐藏加号图标',
      type: 'Switch'
    },
    {
      key: 'sourceData',
      name: '数据源',
      type: 'DataList',
    },
  ],
  config: {
    tabs: ['Tab 1', 'Tab 2'],
    centered: false,
    size: 'middle',
    tabBarGutter: 30,
    tabPosition: 'top',
    destroyInactiveTabPane: false,
    type: 'line',
    hideAdd: false,
    sourceData: [
      {
        id: '1',
        title: 'Panel 1',
        desc: 'Panel Desc 1',
        link: 'xxxxx',
        type: 0,
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
          },
        ],
      },
      {
        id: '2',
        title: 'Panel 2',
        desc: 'Panel Desc 2',
        link: 'xxxxx',
        type: 0,
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
          },
        ],
      },
      {
        id: '3',
        title: 'Panel 3',
        desc: 'Panel Desc 3',
        link: 'xxxxx',
        type: 1,
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url: 'https://s1.ax1x.com/2023/01/15/pSQdf8U.png',
          },
        ],
        html: `<button>Button</button>`
      }
    ]

  }

}

export default Tabs;
