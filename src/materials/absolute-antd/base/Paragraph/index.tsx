import React, { memo, FC } from 'react';
import { Image, Typography } from 'antd';
import styled from 'styled-components';
import logo from '../../../../assets/absolute/paragraph.png';
import { ILongTextConfig } from '@/materials/absolute-antd/base/Paragraph/schema';

/*begin to delete*/
export interface ILongTextProps extends ILongTextConfig {
  isTpl: boolean;
}
/*end to delete*/

type TLongTextSelectKeyType = 'left' | 'right' | 'center';
type TSelectDefaultType<KeyType> = KeyType;

const LongTextWrapper = styled(Typography.Paragraph)<{
  $color: string;
  indent: number;
  $fontSize: number;
  $lineHeight: number;
  $textAlign: TSelectDefaultType<TLongTextSelectKeyType>;
  $bgColor: string;
  $padding: number;
  radius: number;
}>`
  color: ${(props) => props.$color};
  text-indent: ${(props) => props.indent + 'px'};
  font-size: ${(props) => props.$fontSize};
  line-height: ${(props) => props.$lineHeight};
  text-align: ${(props) => props.$textAlign};
  background-color: ${(props) => props.$bgColor};
  padding: ${(props) => props.$padding};
  border-radius: ${(props) => props.radius};
`;

const AParagraph: FC<ILongTextProps> = (props) => {
  const {
    isTpl,

    ...restProps
  } = props;

  // code, delete, mark等antd配置
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
    rows,
    expendable,
    symbol,
    ...rest
  } = restProps;

  return (
    <React.Fragment>
      {isTpl && (
        <div>
          <Image src={logo} alt="" />
        </div>
      )}
      {!isTpl && (
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
            symbol: symbol,
          }}
          {...rest}
        >
          {text}
        </LongTextWrapper>
      )}
    </React.Fragment>
  );
};

export default memo(AParagraph);
