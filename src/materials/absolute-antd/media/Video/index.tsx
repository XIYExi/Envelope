import React, { FC, memo } from 'react';
import './index.css';
import { Player, BigPlayButton } from 'video-react';
import logo from '../../../../assets/absolute/video.png';
import { Image } from 'antd';
import { IVideoConfig } from '@/materials/absolute-antd/media/Video/schema';

/*begin to delete*/
interface IVideoProProps extends IVideoConfig {
  isTpl: boolean;
}
/*end to delete*/

const AVideo: FC<IVideoProProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { poster, url } = restProps;

  return (
    <React.Fragment>
      {isTpl && (
        <div>
          <Image src={logo} alt={''} preview={false} />
        </div>
      )}
      {!isTpl && (
        <div>
          <Player
            playsInline
            poster={poster[0].url}
            src={
              url ||
              'https://gossv.vcg.com/cmsUploadVideo/creative/1移轴/7月移轴.mp4'
            }
          >
            <BigPlayButton position="center" />
          </Player>
        </div>
      )}
    </React.Fragment>
  );
};

export default memo(AVideo);
