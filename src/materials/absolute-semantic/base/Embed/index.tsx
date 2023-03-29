import React, { FC } from 'react';
import { IEmbedConfig } from '@/materials/absolute-semantic/base/Embed/schema';
import logo from '../../../../assets/absolute/video.png';
import { Image, Embed } from 'semantic-ui-react';
import { uuid } from '@/engine-lib-absolute/core-utils/tool';

/*begin to delete*/
interface IEmbedProps extends IEmbedConfig {
  isTpl: boolean;
}
/*end to delete*/

const SEmbed: FC<IEmbedProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    placeholder,
    source,
    url,
    aspectRatio,
    autoplay,
    brandedUI,
    defaultActive,
    hd,
  } = restProps;

  /*
   * Embed组件中id存放的是vimeo或者youtube视频中的id序号，
   * 如youtube视频 https://www.youtube.com/watch?v=O6Xo21L0ybE&ab_channel=homefry815，
   * 则id对应为 O6Xo21L0ybE
   * */
  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Embed" />}
      {!isTpl && (
        <div>
          {/*@ts-ignore*/}
          <Embed
            id={url}
            placeholder={placeholder}
            source={source}
            aspectRatio={aspectRatio}
            autoplay={autoplay}
            brandedUI={brandedUI}
            defaultActive={defaultActive}
            hd={hd}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default SEmbed;
