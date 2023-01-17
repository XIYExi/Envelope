import { ISelectConfigType, ISwitchConfigType, ITextConfigType } from '@/engine-lib-absolute/core-component/type';


export type TAlertSelectKeyType = 'success' | 'info' | 'warning'| 'error';


export type TAlertEditData = Array<
  | ITextConfigType
  | ISelectConfigType<TAlertSelectKeyType>
  | ISwitchConfigType
  >

export interface IAlertConfig {
  message: string;
  type: TAlertSelectKeyType;
  closable: boolean;
  banner: boolean;
  showIcon: boolean;
}


export interface IAlertSchema {
  editData: TAlertEditData;
  config: IAlertConfig;
}

const Alert: IAlertSchema = {
  editData: [
    {
      key: 'message',
      name: '警告提示内容',
      type: 'Text'
    },
    {
      key: 'type',
      name: '警告类型',
      type: 'Select',
      range: [
        {
          key: 'success',
          text: '成功'
        },
        {
          key: 'info',
          text: '通知'
        },
        {
          key: 'warning',
          text: '警告'
        },
        {
          key: 'error',
          text: '错误'
        }
      ]
    },
    {
      key: 'closable',
      name: '是否可关闭',
      type: 'Switch'
    },
    {
      key: 'banner',
      name: '是否用作顶部公告',
      type: 'Switch'
    },
    {
      key: 'showIcon',
      name: '是否显示图标',
      type: 'Switch'
    }
  ],
  config:{
    message: 'Alert',
    type: 'success',
    closable: true,
    banner: false,
    showIcon: false,
  }
}

export default Alert;
