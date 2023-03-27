import React, { FC } from 'react';
import { IAdvertisementConfig } from '@/materials/absolute-semantic/base/Ad/schema';
import logo from '../../../../assets/absolute/Logo.png';
import { Advertisement, Image } from 'semantic-ui-react';

/*begin to delete*/
interface IAdvertisementProps extends IAdvertisementConfig {
  isTpl: boolean;
}
/*end to delete*/

const SAdvertisement: FC<IAdvertisementProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { centered, src, test, unit = 'medium rectangle' } = restProps;

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Advertisement" />}
      {!isTpl && (
        <div>
          {/*@ts-ignore*/}
          <Advertisement unit={unit} centered={centered} test={test}>
            {src.length !== 0 && <img src={src} alt="" />}
            {/*TODO you master add it by yourself*/}
          </Advertisement>
        </div>
      )}
    </React.Fragment>
  );
};

export default SAdvertisement;
