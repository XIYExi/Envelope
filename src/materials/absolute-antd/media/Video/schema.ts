import {
  ITextConfigType,
  IUploadConfigType,
  TTextDefaultType,
  TUploadDefaultType,
} from '@/engine-lib-absolute/core-component/type';
import templateStr from '!raw-loader!./index';

export type TVideoEditData = Array<IUploadConfigType | ITextConfigType>;

export interface IVideoConfig {
  poster: TUploadDefaultType;
  url: TTextDefaultType;
}

interface IVideoSchema {
  editData: TVideoEditData;
  config: IVideoConfig;
  [key: string]: any;
}

const Video: IVideoSchema = {
  editData: [
    {
      key: 'poster',
      name: '视频封面',
      type: 'Upload',
    },
    {
      key: 'url',
      name: '视频链接',
      type: 'Text',
    },
  ],
  config: {
    poster: [
      {
        uid: '001',
        name: 'image.png',
        status: 'done',
        url: 'http://49.234.61.19/uploads/1_1740c6fbcd9.png',
      },
    ],
    url: '',
  },
  templateStr,
};

export default Video;
