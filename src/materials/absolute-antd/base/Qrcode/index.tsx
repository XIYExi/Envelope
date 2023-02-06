import React, { FC, memo } from 'react';
import { IQrcodeConfig } from './schema';
import logo from '../../../../assets/absolute/Logo.png';
import { Image } from 'antd';
import styled from 'styled-components';
import { TColorDefaultType, TNumberDefaultType } from '@/engine-lib-absolute/core-component/type';



const QrCodeWrapper = styled.div`
  width: 100%;
  max-width: 220px;
  margin: 16px auto;
`

const QrCodeTextWrapper = styled.div<{
  $color: TColorDefaultType;
  $fontSize: TNumberDefaultType;
}>`
  text-align: center;
  color: ${props=>props.$color};
  font-size: ${props=>props.$fontSize};
  padding: 8px;
`

const AQrcode:FC<
  IQrcodeConfig &
  { isTpl: boolean }
  > = (props ) => {
  const {
    qrcode,
    text,
    color,
    fontSize = 14,
    isTpl
  } = props;

  return (
    <React.Fragment>
      {isTpl ? (
        <div>
          <Image preview={false} src={logo} alt="" />
        </div>
      ) : (
        <QrCodeWrapper>
          <Image
            preview={false}
            src={qrcode && qrcode[0].url}
            alt={text}
            style={{ width: '100%' }}
          />
          <QrCodeTextWrapper
            $color={color}
            $fontSize={fontSize}>
            {text}
          </QrCodeTextWrapper>
        </QrCodeWrapper>
      )}
    </React.Fragment>
  );
}

export default memo(AQrcode);
