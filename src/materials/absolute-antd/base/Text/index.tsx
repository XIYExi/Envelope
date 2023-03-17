import React, { FC, memo } from 'react';
import { ITextConfig } from '@/materials/absolute-antd/base/Text/schema';
import styled from 'styled-components';
import { Image, Typography } from 'antd';
import logo from '../../../../assets/absolute/text.png';

export interface ITextConfigProps extends ITextConfig {
  isTpl: boolean;
}

type TTextSelectKeyType = 'left' | 'right' | 'center';
type TSelectDefaultType<KeyType> = KeyType;

const ATextWrapper = styled(Typography.Text)<{
  $color: string;
  $textAlign: TSelectDefaultType<TTextSelectKeyType>;
  $fontSize: number;
  $lineHeight: number;
}>`
  color: ${(props) => props.$color};
  text-align: ${(props) => props.$textAlign};
  font-size: ${(props) => props.$fontSize};
  line-height: ${(props) => props.$lineHeight};
`;

const AText: FC<ITextConfigProps> = (props: ITextConfigProps) => {
  const { isTpl, ...restProps } = props;

  const { textAlign, text, fontSize, color, lineHeight, ...rest } = restProps;

  return (
    <>
      {isTpl ? (
        <div>
          <Image src={logo} alt="" />
        </div>
      ) : (
        <ATextWrapper
          $color={color}
          $lineHeight={lineHeight}
          $fontSize={fontSize}
          $textAlign={textAlign}
          {...rest}
        >
          {text}
        </ATextWrapper>
      )}
    </>
  );
};

export default memo(AText);
