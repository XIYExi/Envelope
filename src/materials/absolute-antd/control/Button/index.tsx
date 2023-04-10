import React, { FC, memo } from 'react';
import { IButtonConfig } from '@/materials/absolute-antd/control/Button/schema';
import logo from '../../../../assets/absolute/Button.svg';
import { Button, Image } from 'antd';
import * as Icon from '@ant-design/icons';

/*begin to delete*/
interface IButtonProProp extends IButtonConfig {
  isTpl: boolean;
  onClick?: (e: any) => void;
}
/*end to delete*/

const AButton: FC<IButtonProProp> = (props) => {
  const { isTpl, ...restProps } = props;

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
  } = restProps;

  return (
    <React.Fragment>
      {isTpl && (
        <div>
          <Image preview={false} src={logo} alt={'Antd Button'} />
        </div>
      )}
      {!isTpl && (
        <Button
          id="antd button"
          block={block}
          ghost={ghost}
          danger={danger}
          disabled={disabled}
          loading={loading}
          shape={shape}
          onClick={props.onClick}
        >
          {icon.length > 0 &&
            iconLocation === 'left' &&
            /*<div dangerouslySetInnerHTML={{__html: icon}}/>*/
            // @ts-ignore
            React.createElement(Icon[icon])}
          {text}
          {icon.length > 0 &&
            iconLocation === 'right' &&
            // @ts-ignore
            React.createElement(Icon[icon])}
        </Button>
      )}
    </React.Fragment>
  );
};

export default memo(AButton);
