import React, { FC, memo } from 'react';
import styled from 'styled-components';
import logo from '../../../../assets/absolute/richText.png';
import { Image } from 'antd';
import { IRichTextConfig } from '@/materials/absolute-antd/base/RichText/schema';

/*begin to delete*/
interface IProps extends IRichTextConfig {
  isTpl: boolean;
}
/*end to delete*/

const RichTextWrapper = styled.div`
  :global(p) {
    margin-bottom: 0;
  }
  :global(img) {
    max-width: 100%;
    text-align: center;
  }
  :global(blockquote) {
    margin: 0 0 10px;
    padding: 12px 20px;
    background-color: #f1f2f3;
    border-left: 5px solid #ccc;
    color: #666;
    font-style: italic;
  }
`;

const ARichText: FC<IProps> = (props: IProps) => {
  const { isTpl, ...restProps } = props;

  const { borderColor, borderWidth, round, padding, content } = restProps;

  return isTpl ? (
    <div>
      <Image preview={false} style={{ width: '100%' }} src={logo} alt="" />
    </div>
  ) : (
    <RichTextWrapper
      style={{
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: round + 'px',
        padding: padding + 'px',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </RichTextWrapper>
  );
};
export default memo(ARichText);
