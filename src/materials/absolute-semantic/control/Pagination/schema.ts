import templateStr from '!raw-loader!./index';
import {
  ISwitchConfigType,
  ITextConfigType,
  TSwitchDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TPaginationEditData = Array<ITextConfigType | ISwitchConfigType>;

export interface IPaginationConfig {
  defaultActivePage: TTextDefaultType;
  disabled: TSwitchDefaultType;
  totalPages: TTextDefaultType;
  firstItemIcon: TTextDefaultType;
  lastItemIcon: TTextDefaultType;
  prevItemIcon: TTextDefaultType;
  nextItemIcon: TTextDefaultType;
  ellipsisItemIcon: TTextDefaultType;
}

interface IPaginationSchema {
  editData: TPaginationEditData;
  config: IPaginationConfig;
  [key: string]: any;
}

const Pagination: IPaginationSchema = {
  editData: [
    {
      key: 'defaultActivePage',
      name: '默认选中',
      type: 'Text',
    },
    {
      key: 'disabled',
      name: '禁用',
      type: 'Switch',
    },
    {
      key: 'totalPages',
      name: '总页数',
      type: 'Text',
    },
    {
      key: 'firstItemIcon',
      name: '第一个元素索引Icon',
      type: 'Text',
    },
    {
      key: 'lastItemIcon',
      name: '最后一个元素索引Icon',
      type: 'Text',
    },
    {
      key: 'prevItemIcon',
      name: '上一个元素索引Icon',
      type: 'Text',
    },
    {
      key: 'nextItemIcon',
      name: '下一个元素索引Icon',
      type: 'Text',
    },
    {
      key: 'ellipsisItemIcon',
      name: '省略索引Icon',
      type: 'Text',
    },
  ],
  config: {
    defaultActivePage: '1',
    disabled: false,
    totalPages: '5',
    firstItemIcon: 'angle double left',
    lastItemIcon: 'angle double right',
    prevItemIcon: 'angle left',
    nextItemIcon: 'angle right',
    ellipsisItemIcon: 'ellipsis horizontal',
  },
  templateStr,
};

export default Pagination;
