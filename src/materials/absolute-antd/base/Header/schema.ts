import { baseConfig, baseDefault, ICommonBaseType } from '@/core-component/common';
import {
  IColorConfigType, INumberConfigType, ISelectConfigType, ITextConfigType, IUploadConfigType,
  TColorDefaultType,
  TNumberDefaultType, TSelectDefaultType,
  TTextDefaultType,
  TUploadDefaultType,
} from '@/core-component/type';


export type THeaderSelectKeySizeType = 'small' | 'default' | 'large';

export type THeaderSelectKeyShapeType = 'circle' | 'square';


export type THeaderEditData = Array<
  | IColorConfigType
  | INumberConfigType
  | IUploadConfigType
  | ITextConfigType
  | ISelectConfigType<THeaderSelectKeySizeType>
  | ISelectConfigType<THeaderSelectKeyShapeType>
  >


export interface IHeaderConfig extends ICommonBaseType{
  bgColor: TColorDefaultType;
  logo: TUploadDefaultType;
  fontSize: TNumberDefaultType;
  color: TColorDefaultType;
  height: TNumberDefaultType;
  title: TTextDefaultType;
  user:TTextDefaultType;
  size: TSelectDefaultType<THeaderSelectKeySizeType>;
  shape: TSelectDefaultType<THeaderSelectKeyShapeType>;
}


export type IHeaderSchema = {
  editData: THeaderEditData;
  config: IHeaderConfig;
}


const Header: IHeaderSchema = {
  editData:[
    {
      key: 'bgColor',
      name: '背景色',
      type: 'Color',
    },
    {
      key: 'size',
      name: '图标尺寸',
      type: 'Select',
      range: [
        {
          key: 'small',
          text: '小号'
        },
        {
          key: 'default',
          text: '默认'
        },
        {
          key: 'large',
          text: '大号'
        }
      ]
    },
    {
      key: 'shape',
      name: '图标形状',
      type: 'Select',
      range: [
        {
          key: 'circle',
          text: '圆角'
        },
        {
          key: 'square',
          text: '方角'
        }
      ]
    },
    {
      key: 'height',
      name: '高度',
      type: 'Number',
    },
    {
      key: 'logo',
      name: 'logo',
      type: 'Upload',
      isCrop: true,
      cropRate: 1000 / 618,
    },
    {
      key: 'title',
      name: '网站名称',
      type: 'Text',
    },
    {
      key: 'user',
      name: '用户名称',
      type: 'Text',
    },
    {
      key: 'color',
      name: '文字颜色',
      type: 'Color',
    },
    {
      key: 'fontSize',
      name: '文字大小',
      type: 'Number',
    },
    ...baseConfig,
  ],
  config: {
    bgColor: 'rgba(0,0,0,1)',
    size: 'large',
    shape: 'square',
    logo: [
      {
        uid: '001',
        name: 'image.png',
        status: 'done',
        url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
      },
    ],
    fontSize: 20,
    color: 'rgba(255,255,255,1',
    height: 58,
    title: 'Envelope',
    user: 'xiye',
    ...baseDefault
  }
}

export default Header;
