import {
  IRichTextConfigType,
  ISwitchConfigType,
  TRichTextDefaultType,
  TSwitchDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

type TPlaceholderEditData = Array<IRichTextConfigType | ISwitchConfigType>;

export interface IPlaceholderConfig {
  renderHeader: TRichTextDefaultType;
  renderParagraph: TRichTextDefaultType;
  fluid: TSwitchDefaultType;
  inverted: TSwitchDefaultType;
}

interface IPlaceholderSchema {
  editData: TPlaceholderEditData;
  config: IPlaceholderConfig;
  [key: string]: any;
}

const Placeholder: IPlaceholderSchema = {
  editData: [
    {
      key: 'renderHeader',
      name: '头部内容，使用英文逗号分割',
      type: 'RichText',
    },
    {
      key: 'renderParagraph',
      name: '渲染内容，使用英文逗号分割',
      type: 'RichText',
    },
    {
      key: 'fluid',
      name: '与父容器同宽',
      type: 'Switch',
    },
    {
      key: 'inverted',
      name: '反色',
      type: 'Switch',
    },
  ],
  config: {
    renderHeader: 'Line,Line,Line',
    renderParagraph: 'Line,Image,Line',
    fluid: false,
    inverted: false,
  },
  templateStr,
};

export default Placeholder;
