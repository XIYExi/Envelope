import React, { FC, memo } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { IAudioConfig } from './schema';
import logo from '../../../../assets/music@2x.png';
import { Image } from 'antd';
import styled from 'styled-components';


const AudioWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const AAudio:FC<
  IAudioConfig & {
  isTpl: boolean
}> = (props) => {

  const {
    height,
    url,
    isTpl
  } = props;

  return (
    <>
      {isTpl ? (
        <div>
          <Image src={logo} style={{ width: '100%' }} alt="h5-dooring音频播放组件" preview={false}/>
        </div>
      ) : (
        <AudioWrapper>
          <ReactAudioPlayer
            src={url}
            autoPlay={false}
            controls
            style={{
              width: '100%',
              height: height + 'px',
            }}
          />
        </AudioWrapper>
      )}
    </>
  );
}

export default memo(AAudio);
