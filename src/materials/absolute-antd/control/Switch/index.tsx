import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import logo from '../../../../assets/absolute/Switch.svg';
import {Image, Switch} from 'antd';
import { ISwitchConfig } from '@/materials/absolute-antd/control/Switch/schema';


interface ISwitchProProps extends ISwitchConfig {
  isTpl: boolean;
  onChange?:(e:any)=>void;
}

const ASwitch:FC<ISwitchProProps> = (props)=>{
  const {
    autoFocus,
    defaultChecked,
    disabled,
    loading,
    isTpl
  } = props;

  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const handleChange = useCallback((e:any)=>{
    setChecked(e);

    props.onChange && props.onChange(e);
  },[]);

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
            <Switch
              autoFocus={autoFocus}
              disabled={disabled}
              loading={loading}
              checked={checked}
              onChange={handleChange}
            />
          </div>
      }
    </React.Fragment>
  )
}

export default memo(ASwitch);
