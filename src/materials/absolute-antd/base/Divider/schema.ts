import {
  ISelectConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSelectDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';


export type TDividerOrientationType = 'left' | 'center' | 'right';

type TDividerEditData = Array<
  | ITextConfigType
  | ISwitchConfigType
  | ISelectConfigType<TDividerOrientationType>
  >



export interface IDividerConfig {
  title: TTextDefaultType;
  dashed: TSwitchDefaultType;
  orientation: TSelectDefaultType<TDividerOrientationType>;
  plain: TSwitchDefaultType;
}


interface IDividerSchema {
  editData: TDividerEditData;
  config: IDividerConfig;
}

const Divider: IDividerSchema = {
  editData: [
    {
      key: 'title',
      name: '嵌套的标题',
      type: 'Text'
    },
    {
      key: 'dashed',
      name: '是否为虚线',
      type: 'Switch'
    },
    {
      key: 'orientation',
      name: '标题位置',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: '左侧'
        },
        {
          key: 'center',
          text:'居中'
        },
        {
          key: 'right',
          text: '右侧'
        }
      ]
    },
    {
      key: 'plain',
      name: '文字是否为普通正文样式',
      type: 'Switch'
    }
  ],
  config: {
    title: '嵌套的标题',
    dashed: false,
    orientation: 'center',
    plain: false
  }
}

export default Divider;
