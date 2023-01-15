import React, { FC, Fragment, memo } from 'react';
import { Empty, Image } from 'antd';
import { IEmptyConfig } from '@/materials/absolute-antd/base/Empty/schema';
import logo from '../../../../assets/empty.png';

export type IEmptyProConfig = IEmptyConfig & {
  isTpl: boolean;
}

const AEmpty:FC<IEmptyProConfig>=(props)=>{
  const {isTpl,...restProps} = props;

  return(
    <Fragment>
      {
        isTpl &&
          <div>
            <Image src={logo} alt={''}/>
          </div>
      }
      {
        !isTpl &&
          <Empty {...restProps}/>
      }
    </Fragment>
  )
}

export default memo(AEmpty);

