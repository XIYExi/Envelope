import {
  ITextAreaConfigType,
  ITextConfigType,
  TTextAreaDefaultType,
  TTextDefaultType,
} from '@/engine-lib-absolute/core-component/type';

type TCommentEditData = Array<ITextConfigType | ITextAreaConfigType>

export interface ICommentConfig{
  actions: TTextAreaDefaultType;
  author: TTextDefaultType;
  avatar: TTextDefaultType;
  content:  TTextAreaDefaultType
  datetime: TTextDefaultType;
}

interface ICommentSchema {
  editData: TCommentEditData;
  config: ICommentConfig;
}

const Comment: ICommentSchema ={
  editData: [
    {
      key: 'actions',
      name: '操作图标',
      type: 'TextArea'
    },
    {
      key: 'author',
      name: '作者',
      type: 'Text'
    },
    {
      key: 'avatar',
      name: '头像url',
      type: 'Text'
    },
    {
      key: 'content',
      name:'内容',
      type: 'TextArea'
    },
    {
      key: 'datetime',
      name: '时间',
      type:'Text'
    }
  ],
  config:{
    actions: 'LikeFilled-DislikeFilled',
    author: 'xiye',
    avatar: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).',
    datetime: '8 hours ago'
  }
}

export default Comment;
