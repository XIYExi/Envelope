import { ITextConfigType } from '@/engine-lib-absolute/core-component/type';


export type TEmptyEditData = Array<ITextConfigType>;

export interface IEmptyConfig {
  description: string;
  image: string;
}

export interface IEmptySchema {
  editData: TEmptyEditData;
  config: IEmptyConfig;
}

const Empty: IEmptySchema = {
  editData: [
    {
      key: 'description',
      name: '内容描述',
      type: 'Text'
    },
    {
      key: 'image',
      name: '设置显示图片',
      type: 'Text'
    }
  ],
  config: {
    description: '暂无数据',
    image: 'https://s1.ax1x.com/2023/01/15/pSQdf8U.png',
  }
}

export default Empty;
