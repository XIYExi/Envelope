import {
  IDataListConfigType,
  ISelectConfigType,
  ISwitchConfigType,
  TDataListDefaultType,
  TSelectDefaultType,
  TSwitchDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TCollapseCollapsibleType = 'icon' | 'disabled' |'header';

type TCollapseExpendIconType = 'start'| 'end';

type TCollapseEditData = Array<
  | ISwitchConfigType
  | ISelectConfigType<TCollapseCollapsibleType>
  | ISelectConfigType<TCollapseExpendIconType>
  | IDataListConfigType
  >

export interface ICollapseConfig{
  accordion: TSwitchDefaultType;
  bordered: TSwitchDefaultType;
  collapsible: TSelectDefaultType<TCollapseCollapsibleType>;
  destroyInactivePanel: TSwitchDefaultType;
  expandIconPosition: TSelectDefaultType<TCollapseExpendIconType>;
  ghost: TSwitchDefaultType;
  forceRender: TSwitchDefaultType;
  showArrow: TSwitchDefaultType;
  panelList: TDataListDefaultType;
}

interface ICollapseSchema{
  editData: TCollapseEditData;
  config:ICollapseConfig;
}


const Collapse: ICollapseSchema = {
  editData: [
    {
      key: 'accordion',
      name: '手风琴模式',
      type: 'Switch',
    },
    {
      key: 'bordered',
      name: '是否有边框',
      type: 'Switch'
    },
    {
      key: 'collapsible',
      name: '所有子面板是否可折叠的区域',
      type: 'Select',
      range: [
        {
          key: 'header',
          text: '顶部'
        },
        {
          key: 'icon',
          text: '图标'
        },
        {
          key: 'disabled',
          text:'不可展开'
        }
      ]
    },
    {
      key: 'destroyInactivePanel',
      name:'销毁折叠隐藏的面板',
      type: 'Switch'
    },
    {
      key: 'expandIconPosition',
      name: '设置图标位置',
      type:'Select',
      range: [
        {
          key: 'start',
          text:'前面'
        },
        {
          key:'end',
          text:'后面'
        }
      ]
    },
    {
      key:'ghost',
      name:'背景透明无边框',
      type:'Switch'
    },
    {
      key:'forceRender',
      name:'描述被隐藏时是否销毁dom结构',
      type:'Switch'
    },
    {
      key:'showArrow',
      name:'是否展示当前面板上的箭头',
      type: 'Switch'
    },
    {
      key: 'panelList',
      name: '折叠列表',
      type: 'DataList',
    },
  ],
  config: {
    accordion: false,
    bordered: true,
    collapsible: 'icon',
    destroyInactivePanel: false,
    expandIconPosition: 'start',
    ghost: false,
    forceRender: false,
    showArrow: true,
    panelList: [
      {
        id: '1',
        title: 'This panel can only be collapsed by clicking text',
        desc: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
        link: 'xxxxx',
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
          },
        ],
      },
      {
        id: '2',
        title: 'This panel can only be collapsed by clicking icon',
        desc: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
        link: 'xxxxx',
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
          },
        ],
      },
    ]
  },
};

export default Collapse;
