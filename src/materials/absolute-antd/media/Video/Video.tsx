import React, { FC, memo } from 'react';
import './index.css';
import { Player, BigPlayButton } from 'video-react';
import { IVideoConfig } from './schema';
import logo from '../../../../assets/video.png';
import { Image } from 'antd';

interface IVideoProProps extends IVideoConfig {
  isTpl: boolean;
}

const AVideo:FC<IVideoProProps> = props => {
  const {
    poster,
    url,
    isTpl
  } = props;

  return(
    <React.Fragment>
      {
        isTpl &&
          <div>
            <Image src={logo} alt={''} preview={false}/>
          </div>
      }
      {
        !isTpl &&
        <div>
          <Player
            playsInline
            poster={poster[0].url}
            src={url || 'https://gossv.vcg.com/cmsUploadVideo/creative/1移轴/7月移轴.mp4'}
          >
            <BigPlayButton position="center" />
          </Player>
        </div>
      }
    </React.Fragment>
  )
}


export default memo(AVideo);

