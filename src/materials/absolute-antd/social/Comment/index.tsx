import React, { FC, memo, ReactNode, useEffect, useState } from 'react';
import logo from '../../../../assets/absolute/Comment.svg';
import { Image, Comment, Avatar } from 'antd';
import { ICommentConfig } from '@/materials/absolute-antd/social/Comment/schema';
import * as Icon from '@ant-design/icons';

interface ICommentProProps extends ICommentConfig{
  isTpl:boolean;
}

const AComment:FC<ICommentProProps> = props => {
  const {
    actions,
    author,
    avatar,
    content,
    datetime,
    isTpl
  } = props;

  const [action, setAction] = useState<ReactNode[]>();

  useEffect(()=>{
    const arr = actions.split('-');
    const icons:ReactNode[] = [];
    arr.map(item=>{
      // @ts-ignore
      icons.push(React.createElement(Icon[item]));
    })
    //console.log(icons)
    setAction(icons);
  },[actions])


  return(
    <React.Fragment>
      {
        isTpl &&
          <div>
            <Image preview={false} src={logo} alt={''}/>
          </div>
      }
      {
        !isTpl &&
          <div>
            <Comment
              content={<p>{content}</p>}
              actions={action}
              author={author}
              avatar={<Avatar src={avatar} />}
              datetime={datetime}
              />
          </div>
      }
    </React.Fragment>
  )
}

export default memo(AComment);
