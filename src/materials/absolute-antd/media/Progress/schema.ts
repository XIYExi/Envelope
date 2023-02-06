import {
  IColorConfigType,
  INumberConfigType,
  ISelectConfigType,
  ISwitchConfigType, ITextConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TSelectDefaultType,
  TSwitchDefaultType, TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';


type TProgressTypeType = 'line' | 'circle' | 'dashboard';

type TProgressStatusType = 'success' | 'exception' | 'normal' | 'active';

type TProgressLinecapType = 'round' | 'butt' | 'square';

type TProgressGapPositionType = 'top' | 'bottom' | 'left' | 'right';

type TProgressEditData = Array<
  | IColorConfigType
  | INumberConfigType
  | ISelectConfigType<TProgressTypeType>
  | ISelectConfigType<TProgressStatusType>
  | ISelectConfigType<TProgressLinecapType>
  | ISelectConfigType<TProgressGapPositionType>
  | ISwitchConfigType
  | ITextConfigType
  >


export interface IProgressConfig{
  text: TTextDefaultType;
  percent: TNumberDefaultType;
  showInfo: TSwitchDefaultType;
  type: TSelectDefaultType<TProgressTypeType>;
  status: TSelectDefaultType<TProgressStatusType>;
  strokeColor: TColorDefaultType;
  strokeLinecap: TSelectDefaultType<TProgressLinecapType>;
  trailColor: TColorDefaultType;
  steps: TNumberDefaultType;
  strokeWidth: TNumberDefaultType;
  circleWidth: TNumberDefaultType;
  gapDegree: TNumberDefaultType;
  gapPosition: TSelectDefaultType<TProgressGapPositionType>;
  dashboardWidth: TNumberDefaultType;
}


interface IProgressSchema {
  editData: TProgressEditData;
  config: IProgressConfig;
}

const Progress: IProgressSchema = {
  editData: [
    {
      key: 'text',
      name: '文本',
      type: 'Text'
    },
    {
      key: 'percent',
      name: '当前百分比',
      type: 'Number'
    },
    {
      key:'showInfo',
      name: '是否显示进度数值或状态图标',
      type: 'Switch'
    },
    {
      key: 'type',
      name: '进度条类型',
      type: 'Select',
      range: [
        {
          key: 'line',
          text: '线条'
        },
        {
          key: 'circle',
          text: '圆形'
        },
        {
          key: 'dashboard',
          text: '仪表盘'
        }
      ]
    },
    {
      key: 'status',
      name: '状态',
      type: 'Select',
      range: [
        {
          key: 'success',
          text: 'success'
        },
        {
          key: 'exception',
          text: 'exception'
        },
        {
          key: 'normal',
          text: 'normal'
        },
        {
          key: 'active',
          text: 'active'
        }
      ]
    },
    {
      key: 'strokeColor',
      name: '进度条的色彩',
      type: 'Color'
    },
    {
      key: 'strokeLinecap',
      name: '进度条的样式',
      type: 'Select',
      range: [
        {
          key: 'round',
          text: 'round'
        },
        {
          key: 'butt',
          text: 'butt'
        },
        {
          key: 'square',
          text: 'square'
        }
      ]
    },
    {
      key: 'trailColor',
      name: '未完成的分段的颜色',
      type: 'Color'
    },
    {
      key: 'strokeWidth',
      name: '进度条线的宽度',
      type: 'Number'
    },
    {
      key: 'steps',
      name: 'line状态下进度条总共步数',
      type: 'Number'
    },
    {
      key: 'circleWidth',
      name: 'circle状态下画布宽度',
      type: 'Number'
    },
    {
      key: 'gapDegree',
      name: 'dashboard进度条缺口角度',
      type: 'Number'
    },
    {
      key: 'gapPosition',
      name: 'dashboard缺口位置',
      type: 'Select',
      range: [
        {
          key: 'top',
          text: '顶部'
        },
        {
          key: 'bottom',
          text: '底部'
        },
        {
          key: 'left',
          text:'左侧'
        },
        {
          key: 'right',
          text:'右侧'
        }
      ]
    },
    {
      key: 'dashboardWidth',
      name: 'dashboard状态下画布宽度',
      type: 'Number'
    }
  ],
  config:{
    text: '%',
    percent: 20,
    showInfo: true,
    type: 'line',
    status: 'success',
    strokeColor: 'rgb(60,129,239)',
    strokeLinecap: 'round',
    trailColor: 'rgb(201,199,199)',
    steps: 0,
    strokeWidth: 6,
    circleWidth: 132,
    gapDegree: 75,
    gapPosition: 'bottom',
    dashboardWidth: 132,
  }
}

export default Progress;
