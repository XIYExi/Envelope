import {Carousel} from 'antd';
import React, {FC, memo, PropsWithChildren} from 'react';
import styled from 'styled-components';
import { ICarouselConfig } from './schema';
import logo from '../../../../assets/banner.png'

interface CarouselTypes extends ICarouselConfig {
  isTpl: boolean;
}

const PicItem = styled.div`
  display: inline-block;
  width: 100%;
  max-height: 220px;
  overflow: hidden;
  vertical-align: top;
  img {
    width: 100%;
  }
`

const ACarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`

const ACarousel:FC<CarouselTypes> = (props) => {
  const {
    direction,
    effect,
    autoPlay,
    isTpl,
    imgList,
    round
  } = props;

  const contentRender = () => {
    return imgList.map((item, i) => {
      return (
        <PicItem key={+i} style={{ borderRadius: round + 'px' }}>
          <a href={item.link}>
            <img src={item.imgUrl.length > 0 ? item.imgUrl[0].url : ''} alt="" />
          </a>
        </PicItem>
      );
    });
  };

  return (
    <ACarouselWrapper>
      {isTpl ? (
        <PicItem>
          <img src={logo} alt="?" />
        </PicItem>
      ) : (
        <Carousel
          dotPosition={direction}
          effect={effect}
          autoplay={autoPlay}
        >
          {contentRender()}
        </Carousel>
      )}
    </ACarouselWrapper>
  )
}

export default memo(ACarousel);


