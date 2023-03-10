import React, { FC, memo, useState } from 'react';
import { IImageConfig, TTextSelectKeyType } from './schema';
import styled from 'styled-components';
import { TNumberDefaultType, TPosDefaultType, TSelectDefaultType } from '@/engine-lib-absolute/core-component/type';
import { Image } from 'antd';
import logo from '../../../../assets/absolute/img.png';

const AImageWrapper = styled.div<{
  $baseWidth:TNumberDefaultType;
  $baseHeight: TNumberDefaultType;
  $borderRadius: TNumberDefaultType;
  $baseLeft: TNumberDefaultType;
  $baseTop: TNumberDefaultType;
  $baseScale: TNumberDefaultType;
  $baseRotate: TNumberDefaultType;
}>`
  overflow: hidden;
  position: absolute;
  width: ${props=>props.$baseWidth+'%'};
  height: ${props=>props.$baseHeight+'%'};
  border-radius: ${props=>props.$borderRadius};
  transform: ${props => `translate(${props.$baseLeft}px,${props.$baseTop}px)
      scale(${props.$baseScale / 100})
      rotate(${props.$baseRotate}deg)`};
`

const AImageContainer = styled.div<{round: TNumberDefaultType}>`
  border-radius: ${props=>props.round};
  width: 100%;
  text-align: center;
  overflow: hidden;
  position: relative;
`

const ASubTextWrapper = styled.div<{
  $translate:TPosDefaultType;
  $textAlign: TSelectDefaultType<TTextSelectKeyType>;
}>`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: ${props => props.translate && props.translate[0]};
  margin-top: ${props=>props.translate && props.translate[1]};
  text-align: ${props=>props.$textAlign};
`

const AImage:FC<IImageConfig> = (props) => {
  const {
    imgUrl,
    round = 0,
    translate,
    align,
    titText,
    titFontSize,
    titColor,
    titFontWeight,
    subTitText,
    subTitFontSize,
    subTitColor,
    subTitFontWeight,
  } = props;

  const [visible, setVisible] = useState<boolean>(false);

  return(
    <React.Fragment>
      {
        props.isTpl && (
          <div>
            <img src={logo} alt="" />
          </div>
        )
      }
      {
        !props.isTpl && (
          <AImageWrapper
            $baseWidth={props.baseWidth}
            $baseHeight={props.baseHeight}
            $borderRadius={props.baseRadius}
            $baseLeft={props.baseLeft}
            $baseRotate={props.baseLeft}
            $baseScale={props.baseScale}
            $baseTop={props.baseTop}
          >
            <AImageContainer round={round}>
              <ASubTextWrapper
                $textAlign={align}
                $translate={translate}
              >
                <div style={{ fontSize: titFontSize, color: titColor, fontWeight: +titFontWeight }}>
                  {titText}
                </div>
                <div
                  style={{
                    fontSize: subTitFontSize,
                    color: subTitColor,
                    fontWeight: +subTitFontWeight,
                    lineHeight: 2.6,
                  }}
                >
                  {subTitText}
                </div>
              </ASubTextWrapper>
              {
                imgUrl.length <= 1 ? (
                  <Image src={imgUrl && imgUrl[0].url} alt="" style={{ width: '100%' }} />
                ) : (
                  <React.Fragment>
                    <Image
                      preview={{ visible: false }}
                      style={{width:'100%'}}
                      src={imgUrl && imgUrl[0].url}
                      onClick={() => setVisible(true)}
                    />
                    <div style={{ display: 'none' }}>
                      <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                        {
                          imgUrl.map((item,i)=>(
                            <Image src={item.url} key={i} style={{width: '100%'}} />
                          ))
                        }
                      </Image.PreviewGroup>
                    </div>
                  </React.Fragment>
                )
              }

            </AImageContainer>
          </AImageWrapper>
        )
      }

    </React.Fragment>
  )
}

export default memo(AImage);
