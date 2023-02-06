import {
  IColorConfigType,
  INumberConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TCalendarEditData = Array<
  | IColorConfigType
  | ITextConfigType
  | INumberConfigType
  | ISwitchConfigType
  >

export interface ICalendarConfig {
  time: TTextDefaultType;
  range: TTextDefaultType;
  width: TNumberDefaultType;
  color: TColorDefaultType;
  selectedColor: TColorDefaultType;
  fullscreen: TSwitchDefaultType;
  round: TNumberDefaultType;
}



interface ICalendarSchema {
  editData: TCalendarEditData;
  config: ICalendarConfig;
}


const Calendar: ICalendarSchema = {
  editData: [
    {
      key: 'time',
      name: '日历时间',
      type: 'Text',
      placeholder: '格式为2023-01-01 或 2023-12-30'
    },
    {
      key: 'range',
      name: '日历选中范围',
      type: 'Text',
      placeholder: '格式如01-12(几号到几号)',
    },
    {
      key: 'width',
      name: '宽度',
      type: 'Number'
    },
    {
      key: 'color',
      name: '文本颜色',
      type: 'Color'
    },
    {
      key: 'selectedColor',
      name: '选中颜色',
      type: 'Color',
    },
    {
      key: 'fullscreen',
      name: '全屏显示',
      type: 'Switch'
    },
    {
      key: 'round',
      name: '圆角',
      type: 'Number'
    }
  ],
  config: {
    time: '2023-01-21',
    range: '2022-01-01,2023-12-30',
    width: 300,
    color: 'rgba(0,0,0,1)',
    selectedColor: 'rgba(22,40,212,1)',
    fullscreen: false,
    round: 10
  }
}

export default Calendar;
