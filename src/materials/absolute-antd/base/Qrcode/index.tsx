import React, { FC, memo } from 'react';
import logo from '../../../../assets/absolute/qrcodeImage.png';
import { Image } from 'antd';
import styled from 'styled-components';
import { IQrcodeConfig } from '@/materials/absolute-antd/base/Qrcode/schema';

const QrCodeWrapper = styled.div`
  width: 100%;
  max-width: 220px;
  margin: 16px auto;
`;

const QrCodeTextWrapper = styled.div<{
  $color: string;
  $fontSize: number;
}>`
  text-align: center;
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fontSize};
  padding: 8px;
`;

/*begin to delete*/
interface IQrcodeProps extends IQrcodeConfig {
  isTpl: boolean;
}
/*end to delete*/

const AQrcode: FC<IQrcodeProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { qrcode, text, color, fontSize = 14 } = restProps;

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
          <QrCodeTextWrapper $color={color} $fontSize={fontSize}>
            {text}
          </QrCodeTextWrapper>
        </QrCodeWrapper>
      )}
    </React.Fragment>
  );
};

export default memo(AQrcode);
