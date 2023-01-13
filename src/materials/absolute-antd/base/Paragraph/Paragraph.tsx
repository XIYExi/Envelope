import React, {memo, FC} from 'react';
import { ILongTextConfig, TLongTextSelectKeyType } from './schema';
import { Image, Typography } from 'antd';
import styled from 'styled-components';
import {
  TColorDefaultType,
  TNumberDefaultType,
  TSelectDefaultType
} from '@/core-component/type';
import logo from '../../../../assets/paragraph.png';


export interface ILongTextProps extends ILongTextConfig{
  isTpl: boolean;
}

const LongTextWrapper = styled(Typography.Paragraph)<{
  $color: TColorDefaultType;
  indent: TNumberDefaultType;
  $fontSize: TNumberDefaultType;
  $lineHeight: TNumberDefaultType;
  $textAlign: TSelectDefaultType<TLongTextSelectKeyType>;
  $bgColor: TColorDefaultType;
  $padding: TNumberDefaultType;
  radius: TNumberDefaultType;
}>`
  color: ${props=>props.$color};
  text-indent: ${props => props.indent + 'px'};
  font-size: ${props => props.$fontSize};
  line-height: ${props => props.$lineHeight};
  text-align: ${props => props.$textAlign};
  background-color: ${props => props.$bgColor};
  padding: ${props => props.$padding};
  border-radius: ${props => props.radius};
`

const AParagraph:FC<ILongTextProps> = (props) => {

  const {
    text,
    fontSize,
    color,
    indent,
    lineHeight,
    textAlign,
    bgColor,
    padding,
    radius,
    isTpl,
    rows,
    expendable,
    symbol,
    // code, delete, mark等antd配置
    ...restProps
  } = props;


  return(
    <React.Fragment>
      {
        isTpl && (
          <div>
            <Image src={logo} alt="" />
          </div>
        )
      }
      {
        !isTpl && (
          <LongTextWrapper
            $color={color}
            indent={indent}
            $fontSize={fontSize}
            $lineHeight={lineHeight}
            $textAlign={textAlign}
            $bgColor={bgColor}
            $padding={padding}
            radius={radius}
            ellipsis={{
              rows: rows,
              expandable: expendable,
              symbol: symbol
            }}
            {...restProps}
          >
            {text}
          </LongTextWrapper>
        )
      }

    </React.Fragment>
  )

}

export default memo(AParagraph);
