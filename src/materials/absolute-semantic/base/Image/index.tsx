import React, { FC } from 'react';
import { IImageConfig } from '@/materials/absolute-semantic/base/Image/schema';
import logo from '../../../../assets/absolute/img.png';
import { Image } from 'semantic-ui-react';

/*begin to delete*/
interface IImageProps extends IImageConfig {
  isTpl: boolean;
}
/*end to delete*/

const SImage: FC<IImageProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    src,
    alt,
    avatar,
    bordered,
    centered,
    circular,
    disabled,
    fluid,
    hidden,
    inline,
    rounded,
    size,
    verticalAlign,
    wrapper,
  } = restProps;

  return (
    <React.Fragment>
      {isTpl ? (
        <Image src={logo} alt="Image" />
      ) : (
        <Image
          src={src}
          alt={alt}
          avatar={avatar}
          bordered={bordered}
          centered={centered}
          circular={circular}
          disabled={disabled}
          fluid={fluid}
          hidden={hidden}
          inline={inline}
          rounded={rounded}
          size={size}
          verticalAlign={verticalAlign}
          wrapped={wrapper}
        />
      )}
    </React.Fragment>
  );
};

export default SImage;
