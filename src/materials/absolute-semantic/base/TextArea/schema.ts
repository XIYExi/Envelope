import templateStr from '!raw-loader!./index';
import {
  ITextConfigType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TTextAreaEditData = Array<ITextConfigType>;

export interface ITextAreaConfig {
  rows: TTextDefaultType;
  placeholder: TTextDefaultType;
}

interface ITextAreaSchema {
  editData: TTextAreaEditData;
  config: ITextAreaConfig;
  [key: string]: any;
}

const TextArea: ITextAreaSchema = {
  editData: [
    {
      key: 'rows',
      name: '输入行数',
      type: 'Text',
    },
    {
      key: 'placeholder',
      name: '默认显示',
      type: 'Text',
    },
  ],
  config: {
    rows: '3',
    placeholder: 'Tell use more.',
  },
  templateStr,
};

export default TextArea;
