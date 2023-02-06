import React, { FC, memo, useEffect, useState } from 'react';
import logo from '../../../../assets/absolute/Statistic.svg';
import {Image, Statistic} from 'antd';
import {IStatisticConfig} from '@/materials/absolute-antd/social/Statistic/schema';
import * as Icon from '@ant-design/icons';

type IStatisticProps = IStatisticConfig & {
  isTpl: boolean;
}

const AStatistic:FC<IStatisticProps> = props => {

  const {
    title,
    valueType,
    value,
    decimalSeparator,
    groupSeparator,
    loading,
    precision,
    prefix,
    isTpl
  } = props;

  const [tValue, setTValue] = useState<string | number>();

  useEffect(()=>{
    if(valueType === 'number'){
      setTValue(Number(value));

    }
    else{
      setTValue(value);
    }
  }, [value, valueType])


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
            <Statistic
              title={title}
              value={tValue}
              decimalSeparator={decimalSeparator}
              groupSeparator={groupSeparator}
              loading={loading}
              precision={precision}
              // @ts-ignore
              prefix={React.createElement(Icon[prefix])}
              />
          </div>
      }
    </React.Fragment>
  )

}

export default memo(AStatistic);
