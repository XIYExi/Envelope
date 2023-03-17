import {
  IColorConfigType,
  INumberConfigType,
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

export type TTextSelectKeyType = 'left' | 'right' | 'center';

export interface ITextConfig {
  text: TTextDefaultType;
  disabled: TSwitchDefaultType;
  code: TSwitchDefaultType;
  delete: TSwitchDefaultType;
  strong: TSwitchDefaultType;
  italic: TSwitchDefaultType;
  underline: TSwitchDefaultType;
  mark: TSwitchDefaultType;
  color: TColorDefaultType;
  fontSize: TNumberDefaultType;
  indent: TNumberDefaultType;
  lineHeight: TNumberDefaultType;
  textAlign: TSelectDefaultType<TTextSelectKeyType>;
  bgColor: TColorDefaultType;
  padding: TNumberDefaultType;
  radius: TNumberDefaultType;
}

export type TTextEditData = Array<
  | ITextConfigType
  | ISelectConfigType<TTextSelectKeyType>
  | INumberConfigType
  | IColorConfigType
  | ISwitchConfigType
>;

export interface ITextSchema {
  editData: TTextEditData;
  config: ITextConfig;
  [key: string]: any;
}

const Text: ITextSchema = {
  editData: [
    {
      key: 'text',
      name: '文字',
      type: 'Text',
    },
    {
      key: 'disabled',
      name: '禁用文本',
      type: 'Switch',
    },
    {
      key: 'code',
      name: '添加代码样式',
      type: 'Switch',
    },
    {
      key: 'delete',
      name: '删除线样式',
      type: 'Switch',
    },
    {
      key: 'strong',
      name: '加粗',
      type: 'Switch',
    },
    {
      key: 'italic',
      name: '斜体',
      type: 'Switch',
    },
    {
      key: 'mark',
      name: '添加标记',
      type: 'Switch',
    },
    {
      key: 'underline',
      name: '下划线',
      type: 'Switch',
    },
    {
      key: 'color',
      name: '颜色',
      type: 'Color',
    },
    {
      key: 'fontSize',
      name: '字体大小',
      type: 'Number',
    },
    {
      key: 'indent',
      name: '首行缩进',
      type: 'Number',
    },
    {
      key: 'lineHeight',
      name: '行高',
      type: 'Number',
    },
    {
      key: 'textAlign',
      name: '对齐方式',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: '左对齐',
        },
        {
          key: 'right',
          text: '右对齐',
        },
        {
          key: 'center',
          text: '居中',
        },
      ],
    },
    {
      key: 'bgColor',
      name: '背景颜色',
      type: 'Color',
    },
    {
      key: 'padding',
      name: '填充间距',
      type: 'Number',
    },
    {
      key: 'radius',
      name: '背景圆角',
      type: 'Number',
    },
  ],
  config: {
    text: 'Hello World',
    disabled: false,
    code: false,
    delete: false,
    strong: true,
    italic: false,
    underline: false,
    mark: true,
    color: 'rgba(60, 60, 60, 1)',
    fontSize: 14,
    indent: 20,
    lineHeight: 1.8,
    textAlign: 'left',
    bgColor: 'rgba(255, 255, 255, 0)',
    padding: 0,
    radius: 0,
  },
  templateStr,
};

export default Text;
