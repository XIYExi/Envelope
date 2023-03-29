import templateStr from '!raw-loader!./index';
import {
  IDataListConfigType,
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TDataListDropdownType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TDropdownAdditionPosition = 'top' | 'bottom';

type TDropdownDirection = 'left' | 'right';

type TDropdownEditData = Array<
  | ISelectConfigType<TDropdownDirection>
  | ISelectConfigType<TDropdownAdditionPosition>
  | ISwitchConfigType
  | IDataListConfigType
  | ITextConfigType
>;

export interface IDropdownConfig {
  header: TTextDefaultType;
  icon: TTextDefaultType;
  text: TTextDefaultType;
  basic: TSwitchDefaultType;
  selection: TSwitchDefaultType;
  compact: TSwitchDefaultType;
  deburr: TSwitchDefaultType;
  defaultOpen: TSwitchDefaultType;
  direction: TSelectDefaultType<TDropdownDirection>;
  disabled: TSwitchDefaultType;
  error: TSwitchDefaultType;
  floating: TSwitchDefaultType;
  fluid: TSwitchDefaultType;
  inline: TSwitchDefaultType;
  item: TSwitchDefaultType;
  labeled: TSwitchDefaultType;
  lazyLoad: TSwitchDefaultType;
  dataSource: TDataListDropdownType;
}

interface IDropdownSchema {
  editData: TDropdownEditData;
  config: IDropdownConfig;
  [key: string]: any;
}

const Dropdown: IDropdownSchema = {
  editData: [
    {
      key: 'header',
      name: '下拉标题',
      type: 'Text',
    },
    {
      key: 'icon',
      name: '下拉标题图标',
      type: 'Text',
    },
    {
      key: 'text',
      name: '下拉框默认文字',
      type: 'Text',
    },
    {
      key: 'basic',
      name: '基本样式',
      type: 'Switch',
    },
    {
      key: 'selection',
      name: '选择框样式',
      type: 'Switch',
    },
    {
      key: 'compact',
      name: '紧凑模式',
      type: 'Switch',
    },
    {
      key: 'deburr',
      name: '是否删除音调',
      type: 'Switch',
    },
    {
      key: 'defaultOpen',
      name: '默认打开',
      type: 'Switch',
    },
    {
      key: 'direction',
      name: '方向',
      type: 'Select',
      range: [
        {
          key: 'right',
          text: '右侧',
        },
        {
          key: 'left',
          text: '左侧',
        },
      ],
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch',
    },
    {
      key: 'error',
      name: '错误模式',
      type: 'Switch',
    },
    {
      key: 'floating',
      name: '浮动',
      type: 'Switch',
    },
    {
      key: 'fluid',
      name: '与父元素同宽',
      type: 'Switch',
    },
    {
      key: 'inline',
      name: '选择内连',
      type: 'Switch',
    },
    {
      key: 'item',
      name: '子项格式化为菜单项',
      type: 'Switch',
    },
    {
      key: 'labeled',
      name: '标记为下拉列表',
      type: 'Switch',
    },
    {
      key: 'lazyLoad',
      name: '懒加载',
      type: 'Switch',
    },
    {
      key: 'dataSource',
      name: '数据源',
      type: 'DataList',
    },
  ],
  config: {
    header: 'Select Header',
    icon: ' home',
    text: 'Select',
    basic: true,
    selection: false,
    compact: false,
    deburr: false,
    defaultOpen: false,
    direction: 'right',
    disabled: false,
    error: false,
    floating: false,
    fluid: false,
    inline: true,
    item: true,
    labeled: true,
    lazyLoad: true,
    dataSource: [
      {
        id: '1',
        key: 'Jenny Hess',
        text: 'Jenny Hess',
        value: 'Jenny Hess',
        flag: '',
        icon: '',
        image: '',
        description: 'ctrl + o',
      },
    ],
  },
  templateStr,
};

export default Dropdown;
