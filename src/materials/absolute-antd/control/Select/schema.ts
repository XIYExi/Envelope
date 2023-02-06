import {
  INumberConfigType,
  ISelectConfigType,
  ISwitchConfigType, ITextAreaConfigType,
  ITextConfigType, TNumberDefaultType, TSelectDefaultType, TSwitchDefaultType, TTextAreaDefaultType, TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TSelectModeType = 'multiple' | 'tags';

type TSelectPlacementType = 'bottomLeft'| 'bottomRight'| 'topLeft'| 'topRight';

type TSelectEditData = Array<
  | ITextAreaConfigType
  | ISwitchConfigType
  | ITextConfigType
  | INumberConfigType
  | ISelectConfigType<TSelectModeType>
  | ISelectConfigType<TSelectPlacementType>
  >

export interface ISelectConfig {
  options: TTextAreaDefaultType;
  allowClear: TSwitchDefaultType;
  autoFocus: TSwitchDefaultType;
  bordered: TSwitchDefaultType;
  clearIcon: TTextDefaultType;
  defaultActiveFirstOption: TSwitchDefaultType;
  defaultOpen: TSwitchDefaultType;
  disabled: TSwitchDefaultType;
  listHeight: TNumberDefaultType;
  loading: TSwitchDefaultType;
  maxTagCount: TNumberDefaultType;
  maxTagPlaceholder: TTextDefaultType;
  maxTagTextLength: TNumberDefaultType;
  mode: TSelectDefaultType<TSelectModeType>;
  placeholder: TTextDefaultType;
  placement: TSelectDefaultType<TSelectPlacementType>;
  showArrow: TSwitchDefaultType;
  showSearch: TSwitchDefaultType;
  suffixIcon: TTextDefaultType;
  virtual: TSwitchDefaultType;
}

interface ISelectSchema {
  editData: TSelectEditData;
  config: ISelectConfig;
}

const Select: ISelectSchema = {
  editData: [
    {
      key: 'options',
      name: '内容',
      type:'TextArea',
    },
    {
      key: 'allowClear',
      name: '支持清除',
      type: 'Switch'
    },
    {
      key: 'autoFocus',
      name: '默认获取焦点',
      type: 'Switch'
    },
    {
      key: 'bordered',
      name: '边框',
      type: 'Switch'
    },
    {
      key: 'clearIcon',
      name: '多选框清空图标',
      type: 'Text'
    },
    {
      key: 'defaultActiveFirstOption',
      name: '默认高亮第一个选项',
      type: 'Switch'
    },
    {
      key: 'defaultOpen',
      name: '默认展开下拉菜单',
      type: 'Switch'
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch'
    },
    {
      key: 'listHeight',
      name: '弹窗滚动高度',
      type: 'Number'
    },
    {
      key: 'loading',
      name: '加载中状态',
      type: 'Switch'
    },
    {
      key: 'maxTagCount',
      name: '最多显示多少个 tag',
      type: 'Number'
    },
    {
      key: 'maxTagPlaceholder',
      name: '隐藏 tag 时显示的内容',
      type: 'Text'
    },
    {
      key: 'maxTagTextLength',
      name: '最大显示的 tag 文本长度',
      type: 'Number'
    },
    {
      key: 'mode',
      name: '模式',
      type: 'Select',
      range: [
        {
          key: 'multiple',
          text: '多选'
        },
        {
          key: 'tags',
          text: '标签'
        }
      ]
    },
    {
      key: 'placeholder',
      name: '默认文本',
      type: 'Text'
    },
    {
      key: 'placement',
      name: '选择框弹出的位置',
      type: 'Select',
      range: [
        {
          key: 'bottomLeft',
          text: '左下'
        },
        {
          key: 'bottomRight',
          text: '右下'
        },
        {
          key: 'topLeft',
          text: '左上'
        },
        {
          key: 'topRight',
          text: '右上'
        }
      ]
    },
    {
      key: 'showArrow',
      name: '是否显示下拉小箭头',
      type: 'Switch'
    },
    {
      key: 'showSearch',
      name: '配置是否可搜索',
      type: 'Switch'
    },
    {
      key: 'suffixIcon',
      name: '自定义的选择框后缀图标',
      type: 'Text'
    },
    {
      key: 'virtual',
      name: '虚拟滚动',
      type: 'Switch'
    },
  ],
  config: {
    options: 'aaaa-bbbb-cccc-d-e-f-g',
    allowClear: true,
    autoFocus: false,
    bordered: true,
    clearIcon: 'MinusCircleOutlined',
    defaultActiveFirstOption: true,
    defaultOpen: false,
    disabled: false,
    listHeight: 256,
    loading: false,
    maxTagCount: 5,
    maxTagPlaceholder: '...',
    maxTagTextLength: 3,
    mode: 'multiple',
    placeholder: '请选择...',
    placement: 'bottomLeft',
    showArrow: true,
    showSearch: true,
    suffixIcon: 'MinusCircleOutlined',
    virtual: true,
  }
}

export default Select;
