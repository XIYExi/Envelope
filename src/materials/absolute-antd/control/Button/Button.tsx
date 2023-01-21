import React,{FC, memo} from 'react';
import { IButtonConfig } from '@/materials/absolute-antd/control/Button/schema';
import logo from '../../../../assets/absolute/Button.svg';
import { Button, Image } from 'antd';
import * as Icon from '@ant-design/icons';

interface IButtonProProp extends IButtonConfig {
  isTpl: boolean;
}

const AButton:FC<IButtonProProp> = (props) => {

  const {
    text,
    block,
    danger,
    disabled,
    ghost,
    href,
    iconLocation,
    icon,
    loading,
    shape,
    isTpl
  } = props;


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
          <Button
            block={block}
            ghost={ghost}
            danger={danger}
            disabled={disabled}
            loading={loading}
            shape={shape}
          >
            {
              icon.length > 0 && iconLocation==='left' &&
              /*<div dangerouslySetInnerHTML={{__html: icon}}/>*/
              // @ts-ignore
              React.createElement(Icon[icon])
            }
            {text}
            {
              icon.length > 0 && iconLocation === 'right' &&
              // @ts-ignore
                React.createElement(Icon[icon])
            }
          </Button>
      }
    </React.Fragment>
  )

}

export default memo(AButton);
