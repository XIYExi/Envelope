import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TEmbedSource = 'youtube' | 'vimeo';

type TEmbedAspectRatio = '4:3' | '16:9' | '21:9';

type TEmbedEditData = Array<
  | ITextConfigType
  | ISwitchConfigType
  | ISelectConfigType<TEmbedAspectRatio>
  | ISelectConfigType<TEmbedSource>
>;

export interface IEmbedConfig {
  placeholder: TTextDefaultType;
  source: TSelectDefaultType<TEmbedSource>;
  url: TTextDefaultType;
  aspectRatio: TSelectDefaultType<TEmbedAspectRatio>;
  autoplay: TSwitchDefaultType;
  brandedUI: TSwitchDefaultType;
  defaultActive: TSwitchDefaultType;
  hd: TSwitchDefaultType;
}

interface IEmbedSchema {
  editData: TEmbedEditData;
  config: IEmbedConfig;
  [key: string]: any;
}

const Embed: IEmbedSchema = {
  editData: [
    {
      key: 'placeholder',
      name: '缺省文本',
      type: 'Text',
    },
    {
      key: 'source',
      name: '资源类型',
      type: 'Select',
      range: [
        {
          key: 'youtube',
          text: 'youtube',
        },
        {
          key: 'vimeo',
          text: 'vimeo',
        },
      ],
    },
    {
      key: 'url',
      name: '资源链接',
      type: 'Text',
    },
    {
      key: 'aspectRatio',
      name: '比率',
      type: 'Select',
      range: [
        {
          key: '4:3',
          text: '4:3',
        },
        {
          key: '16:9',
          text: '16:9',
        },
        {
          key: '21:9',
          text: '21:9',
        },
      ],
    },
    {
      key: 'autoplay',
      name: '是否自动播放',
      type: 'Switch',
    },
    {
      key: 'brandedUI',
      name: '显示平台UI',
      type: 'Switch',
    },
    {
      key: 'defaultActive',
      name: '是否默认播放',
      type: 'Switch',
    },
    {
      key: 'hd',
      name: 'HD内容',
      type: 'Switch',
    },
  ],
  config: {
    placeholder: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
    source: 'youtube',
    url: 'O6Xo21L0ybE',
    aspectRatio: '4:3',
    autoplay: false,
    brandedUI: false,
    defaultActive: false,
    hd: false,
  },
  templateStr,
};

export default Embed;
