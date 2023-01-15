import React, {FC, memo} from 'react';
import { ITextConfig, TTextSelectKeyType } from '@/materials/absolute-antd/base/Text/schema';
import styled from 'styled-components';
import { Image, Typography } from 'antd';
import { TColorDefaultType, TNumberDefaultType, TSelectDefaultType } from '@/core-component/type';
import logo from '../.././../../assets/text.png';


export interface ITextConfigProps extends ITextConfig{
  isTpl: boolean;
}


const ATextWrapper = styled(Typography.Text)<{
  $color: TColorDefaultType;
  $textAlign: TSelectDefaultType<TTextSelectKeyType>;
  $fontSize: TNumberDefaultType;
  $lineHeight: TNumberDefaultType;
}>`
  color: ${props => props.$color};
  text-align: ${props => props.$textAlign};
  font-size: ${props => props.$fontSize};
  line-height: ${props => props.$lineHeight};
`


const AText:FC<ITextConfigProps> = (props: ITextConfigProps) => {
  const {
    textAlign,
    text,
    fontSize,
    color,
    lineHeight,
    isTpl,
    ...restProps
  } = props;

  return (
    <>
      {
        isTpl ? (
        <div>
          <Image src={logo} alt=''/>
        </div>
      ) : (
        <ATextWrapper
          $color={color}
          $lineHeight={lineHeight}
          $fontSize={fontSize}
          $textAlign={textAlign}
          {...restProps}
        >
          {text}
        </ATextWrapper>
      )}
    </>
  );
}
export default memo(AText);
