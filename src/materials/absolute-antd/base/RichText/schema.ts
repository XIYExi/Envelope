import {
  IColorConfigType,
  INumberConfigType,
  IRichTextConfigType,
  ITextConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TRichTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

export type TRicheTextEditData = Array<
  ITextConfigType | IColorConfigType | INumberConfigType | IRichTextConfigType
>;

export interface IRichTextConfig {
  round: TNumberDefaultType;
  borderWidth: TNumberDefaultType;
  padding: TNumberDefaultType;
  borderColor: TColorDefaultType;
  content: TRichTextDefaultType;
}

export interface IRichTextSchema {
  editData: TRicheTextEditData;
  config: IRichTextConfig;
  [key: string]: any;
}
const RichText: IRichTextSchema = {
  editData: [
    {
      key: 'round',
      name: '边框圆角',
      type: 'Number',
    },
    {
      key: 'borderWidth',
      name: '边框宽度',
      type: 'Number',
    },
    {
      key: 'borderColor',
      name: '边框颜色',
      type: 'Color',
    },
    {
      key: 'padding',
      name: '内边距',
      type: 'Number',
    },
    {
      key: 'content',
      name: '内容',
      type: 'RichText',
    },
  ],
  config: {
    round: 0,
    borderWidth: 0,
    borderColor: 'rgba(255,255,255,1)',
    padding: 0,
    content: '',
  },
  templateStr,
};
export default RichText;
