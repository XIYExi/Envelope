import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TButtonShapeType = 'default' | 'round' | 'circle';

type TButtonIconLocationType = 'left' | 'right';

type TButtonEditData = Array<
  | ISelectConfigType<TButtonShapeType>
  | ISwitchConfigType
  | ITextConfigType
  | ISelectConfigType<TButtonIconLocationType>
  >


export interface IButtonConfig{
  text: TTextDefaultType;
  block: TSwitchDefaultType;
  danger: TSwitchDefaultType;
  disabled: TSwitchDefaultType;
  ghost: TSwitchDefaultType;
  href: TTextDefaultType;
  icon: TTextDefaultType;
  iconLocation: TSelectDefaultType<TButtonIconLocationType>
  loading: TSwitchDefaultType;
  shape: TSelectDefaultType<TButtonShapeType>
}

interface IButtonSchema {
  editData: TButtonEditData;
  config: IButtonConfig;
}

const Button: IButtonSchema = {
  editData: [
    {
      key: 'text',
      name: '文本',
      type: 'Text'
    },
    {
      key: 'block',
      name: '将按钮宽度调整为其父宽度',
      type: 'Switch'
    },
    {
      key: 'danger',
      name: '危险按钮',
      type: 'Switch'
    },
    {
      key: 'disabled',
      name: '设置禁用',
      type: 'Switch'
    },
    {
      key: 'ghost',
      name: '设置背景透明',
      type: 'Switch'
    },
    {
      key: 'href',
      name: '跳转链接',
      type: 'Text'
    },
    {
      key: 'icon',
      name: '图标',
      type: 'Text'
    },
    {
      key: 'iconLocation',
      name: 'icon位置',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: '左侧'
        },
        {
          key: 'right',
          text: '右侧'
        }
      ]
    },
    {
      key: 'loading',
      name: '设置按钮载入状态',
      type: 'Switch'
    },
    {
      key: 'shape',
      name: '形状',
      type: 'Select',
      range: [
        {
          key: 'default',
          text: '默认'
        },
        {
          key: 'circle',
          text: '圆角'
        },
        {
          key: 'round',
          text: '半圆'
        }
      ]
    }
  ],
  config: {
    text: 'Button',
    block: false,
    danger: false,
    disabled: false,
    ghost: false,
    href: 'xxxx',
    icon: `SearchOutlined`,
    iconLocation: 'left',
    loading: false,
    shape: 'default',
  }
}

export default Button;
