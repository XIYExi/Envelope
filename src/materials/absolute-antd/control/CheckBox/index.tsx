import React, { FC, memo, useState } from 'react';
import {Checkbox,Image} from 'antd';
import logo from '../../../../assets/absolute/CheckBox.svg';
import { ICheckBoxConfig } from '@/materials/absolute-antd/control/CheckBox/schema';

interface ICheckBoxProProps extends ICheckBoxConfig {
  isTpl: boolean;
  onChange?:(e:any)=>void;
}

const ACheckBox:FC<ICheckBoxProProps>=(props)=>{
  const {
    isTpl,
    text,
    autoFocus,
    defaultChecked,
    disabled
  } = props;

  const [checked,setChecked] = useState<boolean>(defaultChecked);

  const handleChange = (e:any) => {
    const check = e.target.checked;
    setChecked(check);

    props.onChange && props.onChange(check);
  }

  return(
    <React.Fragment>
      {
        isTpl &&
          <div>
            <Image src={logo} preview={false} alt={''}/>
          </div>
      }
      {
        !isTpl &&
          <div>
            <Checkbox
              autoFocus={autoFocus}
              checked={checked}
              disabled={disabled}
              onChange={(e)=>handleChange(e)}
            >
              {text}
            </Checkbox>
          </div>
      }
    </React.Fragment>
  )

}

export default memo(ACheckBox);
