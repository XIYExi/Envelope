import React, { FC, memo, ReactNode, useEffect, useState } from 'react';
import logo from '../../../../assets/absolute/Card.svg';
import { Image, Card, Avatar } from 'antd';
import {ICardConfig} from '@/materials/absolute-antd/social/Card/schema';
import * as Icon from '@ant-design/icons';

const {Meta} = Card;

interface ICardProProps extends ICardConfig {
  isTpl: boolean;
}

const ACard:FC<ICardProProps> = props => {
  const {
    actions,
    width,
    bordered,
    coverUrl,
    hoverable,
    loading,
    title,
    avatarUrl,
    description,
    isTpl
  } = props;

  const [action,setAction] = useState<ReactNode[]>();

  useEffect(()=>{
    const arr = actions.split('-');
    const icons:ReactNode[] = [];

    arr.map(item => {
      // @ts-ignore
      icons.push(React.createElement(Icon[item]));
    })
    setAction(icons);
  },[])

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
            <Card
              actions={action}
              hoverable={hoverable}
              loading={loading}
              bordered={bordered}
              style={{width: width}}
              cover={
                <img alt={''}
                     src={coverUrl}/>
              }
            >
              <Meta
                title={title}
                description={description}
                avatar={<Avatar src={avatarUrl}/>}
              />
            </Card>
          </div>
      }
    </React.Fragment>
  )

}

export default memo(ACard);
