import templateStr from '!raw-loader!./index';
import {
  IRichTextConfigType,
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TRichTextDefaultType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TMessageColor =
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

type TMessageSize =
  | 'mini'
  | 'tiny'
  | 'small'
  | 'large'
  | 'big'
  | 'huge'
  | 'massive';

type TMessageEditData = Array<
  | ITextConfigType
  | IRichTextConfigType
  | ISwitchConfigType
  | ISelectConfigType<TMessageSize>
  | ISelectConfigType<TMessageColor>
>;

export interface IMessageConfig {
  header: TTextDefaultType;
  content: TRichTextDefaultType;
  color: TSelectDefaultType<TMessageColor>;
  compact: TSwitchDefaultType;
  error: TSwitchDefaultType;
  floating: TSwitchDefaultType;
  hidden: TSwitchDefaultType;
  icon: TTextDefaultType;
  info: TSwitchDefaultType;
  negative: TSwitchDefaultType;
  positive: TSwitchDefaultType;
  success: TSwitchDefaultType;
  visible: TSwitchDefaultType;
  warning: TSwitchDefaultType;
  size: TSelectDefaultType<TMessageSize>;
}

interface IMessageSchema {
  editData: TMessageEditData;
  config: IMessageConfig;
  [key: string]: any;
}

const Message: IMessageSchema = {
  editData: [
    {
      key: 'header',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'content',
      name: '通知内容',
      type: 'RichText',
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
      key: 'compact',
      name: '紧凑型',
      type: 'Switch',
    },
    {
      key: 'error',
      name: '错误类型',
      type: 'Switch',
    },
    {
      key: 'floating',
      name: '浮动',
      type: 'Switch',
    },
    {
      key: 'hidden',
      name: '隐藏',
      type: 'Switch',
    },
    {
      key: 'icon',
      name: '图标',
      type: 'Text',
    },
    {
      key: 'info',
      name: '提示类型',
      type: 'Switch',
    },
    {
      key: 'negative',
      name: '消极类型消息',
      type: 'Switch',
    },
    {
      key: 'positive',
      name: '积极类型消息',
      type: 'Switch',
    },
    {
      key: 'success',
      name: '成功通知',
      type: 'Switch',
    },
    {
      key: 'visible',
      name: '是否可见',
      type: 'Switch',
    },
    {
      key: 'warning',
      name: '警告通知',
      type: 'Switch',
    },
  ],
  config: {
    header: '消息通知',
    content: '这是一条重要通知，请务必认真阅读',
    color: 'black',
    compact: false,
    error: false,
    floating: false,
    hidden: false,
    icon: 'inbox',
    info: false,
    negative: false,
    positive: false,
    success: false,
    visible: true,
    warning: false,
    size: 'small',
  },
  templateStr,
};

export default Message;
