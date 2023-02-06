import {
  IColorConfigType,
  INumberConfigType,
  ISelectConfigType,
  ISwitchConfigType,
  ITextAreaConfigType,
  ITextConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextAreaDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

export type TLongTextSelectKeyType = 'left' | 'right' | 'center';

export type TLongTextEditData = Array<
  | ITextAreaConfigType
  | INumberConfigType
  | IColorConfigType
  | ISelectConfigType<TLongTextSelectKeyType>
  | ISwitchConfigType
  | ITextConfigType
  >

export interface ILongTextConfig {
  text: TTextAreaDefaultType;
  disabled: TSwitchDefaultType;
  code: TSwitchDefaultType;
  delete: TSwitchDefaultType;
  strong: TSwitchDefaultType;
  italic: TSwitchDefaultType;
  mark: TSwitchDefaultType;
  underline: TSwitchDefaultType;
  color: TColorDefaultType;
  fontSize: TNumberDefaultType;
  indent: TNumberDefaultType;
  lineHeight: TNumberDefaultType;
  textAlign: TSelectDefaultType<TLongTextSelectKeyType>;
  bgColor: TColorDefaultType;
  padding: TNumberDefaultType;
  radius: TNumberDefaultType;
  rows: TNumberDefaultType;
  expendable: TSwitchDefaultType;
  symbol: TTextDefaultType;
}


export interface ILongTextSchema {
  editData: TLongTextEditData;
  config: ILongTextConfig;
}

const Paragraph: ILongTextSchema = {
  editData: [
    {
      key: 'text',
      name: '文字',
      type: 'TextArea'
    },
    {
      key: 'disabled',
      name: '禁用文本',
      type: 'Switch'
    },
    {
      key: 'code',
      name: '添加代码样式',
      type: 'Switch'
    },
    {
      key: 'delete',
      name: '删除线样式',
      type: 'Switch'
    },
    {
      key: 'strong',
      name: '加粗',
      type: 'Switch'
    },
    {
      key: 'italic',
      name: '斜体',
      type: 'Switch'
    },
    {
      key: 'mark',
      name: '添加标记',
      type: 'Switch'
    },
    {
      key: 'underline',
      name: '下划线',
      type: 'Switch'
    },
    {
      key: 'color',
      name: '颜色',
      type: 'Color'
    },
    {
      key: 'fontSize',
      name: '字体大小',
      type: 'Number'
    },
    {
      key: 'indent',
      name: '首行缩进',
      type: 'Number'
    },
    {
      key: 'lineHeight',
      name: '行高',
      type: 'Number'
    },
    {
      key: 'textAlign',
      name: '对齐方式',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: '左对齐'
        },
        {
          key: 'right',
          text: '右对齐'
        },
        {
          key: 'center',
          text: '居中'
        }
      ]
    },
    {
      key: 'bgColor',
      name: '背景颜色',
      type: 'Color'
    },
    {
      key: 'padding',
      name: '填充间距',
      type: 'Number'
    },
    {
      key: 'radius',
      name: '背景圆角',
      type: 'Number'
    },
    {
      key: 'rows',
      name: '最大行数',
      type: 'Number'
    },
    {
      key: 'expendable',
      name: '是否可展开',
      type: 'Switch'
    },
    {
      key: 'symbol',
      name: '展开标志',
      type: 'Text'
    }
  ],
  config: {
    text: 'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant\n' +
      '        Design, a design language for background applications, is refined by Ant UED Team. Ant\n' +
      '        Design, a design language for background applications, is refined by Ant UED Team. Ant\n' +
      '        Design, a design language for background applications, is refined by Ant UED Team. Ant\n' +
      '        Design, a design language for background applications, is refined by Ant UED Team. Ant\n' +
      '        Design, a design language for background applications, is refined by Ant UED Team.',
    disabled: false,
    code: false,
    delete: false,
    strong: false,
    italic: false,
    underline: false,
    mark: false,
    color: 'rgba(60, 60, 60, 1)',
    fontSize: 14,
    indent: 20,
    lineHeight: 1.8,
    textAlign: 'left',
    bgColor: 'rgba(255, 255, 255, 0)',
    padding: 0,
    radius: 0,
    rows: 2,
    expendable: true,
    symbol: 'more'
  }
}

export default Paragraph;
