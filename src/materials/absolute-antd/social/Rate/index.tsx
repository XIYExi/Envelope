import React, { FC, memo, useState } from 'react';
import {Image, Rate} from 'antd';
import {IRateConfig} from '@/materials/absolute-antd/social/Rate/schema';
import * as Icon from '@ant-design/icons';
import logo from '../../../../assets/absolute/Rate.svg';

type IRateProps = IRateConfig & {
  isTpl: boolean;
  onChange?: (e:any)=>void;
}

const ARate:FC<IRateProps> = (props) => {

  const {
    allowClear,
    allowHalf,
    autoFocus,
    character,
    count,
    defaultValue,
    disabled,
    isTpl,
    onChange
  } = props;

  const [value, setValue] = useState<number>(defaultValue);


  const handleChange = (e: any) => {
    //console.log(e)
    setValue(e);

    onChange && onChange(e);
  }


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
            <Rate
              allowClear={allowClear}
              allowHalf={allowHalf}
              autoFocus={autoFocus}
              // @ts-ignore
              character={React.createElement(Icon[character])}
              count={count}
              value={value}
              disabled={disabled}
              onChange={e=>handleChange(e)}
            />
          </div>
      }

    </React.Fragment>
  )
}

export default memo(ARate);
