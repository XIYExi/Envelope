import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type THeaderColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'olive'
  | 'green'
  | 'teal'
  | 'blue'
  | 'violet'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'grey'
  | 'black';

type THeaderSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge';

type THeaderTextAlign = 'left' | 'center' | 'right' | 'justified';

type THeaderEditData = Array<
  | ITextConfigType
  | ISwitchConfigType
  | ISelectConfigType<THeaderTextAlign>
  | ISelectConfigType<THeaderColor>
  | ISelectConfigType<THeaderSize>
>;

export interface IHeaderConfig {
  title: TTextDefaultType;
  block: TSwitchDefaultType;
  color: TSelectDefaultType<THeaderColor>;
  disabled: TSwitchDefaultType;
  dividing: TSwitchDefaultType;
  inverted: TSwitchDefaultType;
  subHeader: TTextDefaultType;
  size: TSelectDefaultType<THeaderSize>;
  textAlign: TSelectDefaultType<THeaderTextAlign>;
}

interface IHeaderSchema {
  editData: THeaderEditData;
  config: IHeaderConfig;
  [key: string]: any;
}

const Header: IHeaderSchema = {
  editData: [
    {
      key: 'title',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'block',
      name: '内容块显示',
      type: 'Switch',
    },
    {
      key: 'color',
      name: '颜色',
      type: 'Select',
      range: [
        {
          key: 'red',
          text: 'red',
        },
        {
          key: 'orange',
          text: 'orange',
        },
        {
          key: 'yellow',
          text: 'yellow',
        },
        {
          key: 'olive',
          text: 'olive',
        },
        {
          key: 'green',
          text: 'green',
        },
        {
          key: 'teal',
          text: 'teal',
        },
        {
          key: 'blue',
          text: 'blue',
        },
        {
          key: 'violet',
          text: 'violet',
        },
        {
          key: 'purple',
          text: 'purple',
        },
        {
          key: 'pink',
          text: 'pink',
        },
        {
          key: 'brown',
          text: 'brown',
        },
        {
          key: 'grey',
          text: 'grey',
        },
        {
          key: 'black',
          text: 'black',
        },
      ],
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch',
    },
    {
      key: 'dividing',
      name: '分割',
      type: 'Switch',
    },
    {
      key: 'inverted',
      name: '反色',
      type: 'Switch',
    },
    {
      key: 'subHeader',
      name: 'SubHeader',
      type: 'Text',
    },
    {
      key: 'size',
      name: '尺寸',
      type: 'Select',
      range: [
        {
          key: 'tiny',
          text: 'tiny',
        },
        {
          key: 'small',
          text: 'small',
        },
        {
          key: 'medium',
          text: 'medium',
        },
        {
          key: 'large',
          text: 'large',
        },
        {
          key: 'huge',
          text: 'huge',
        },
      ],
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
          key: 'center',
          text: '居中',
        },
        {
          key: 'right',
          text: '右对齐',
        },
        {
          key: 'justified',
          text: '两端对齐',
        },
      ],
    },
  ],
  config: {
    title: '这是一个标题',
    block: false,
    color: 'black',
    disabled: false,
    dividing: false,
    inverted: false,
    subHeader: '这是对应的副标题',
    size: 'medium',
    textAlign: 'left',
  },
  templateStr,
};

export default Header;
