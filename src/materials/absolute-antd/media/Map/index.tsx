import React, { FC, memo } from 'react';
import { Map, Marker, Label, APILoader } from '@uiw/react-baidu-map';
import styled from 'styled-components';
import logo from '../../../../assets/absolute/map@2x.png';
import { Image } from 'antd';
import { IMapConfig } from '@/materials/absolute-antd/media/Map/schema';

/*begin to delete*/
export interface IMapProProps extends IMapConfig {
  isTpl: boolean;
}
/*end to delete*/

const MapWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  & > div {
    width: 100%;
  }
`;

const MapLabel = styled(Label)`
  color: #000;
  border-color: #06c;
  padding: 3px 10px;
  border-radius: 6px;
`;

const AMap: FC<IMapProProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { ak, location, position } = restProps;

  return (
    <React.Fragment>
      {isTpl && (
        <div>
          <Image
            preview={false}
            src={logo}
            style={{ width: '100%' }}
            alt="地图组件"
          />
        </div>
      )}
      {!isTpl && (
        <MapWrapper>
          {/*@ts-ignore*/}
          <APILoader akay={ak}>
            <Map widget={['NavigationControl']} zoom={13}>
              <Marker
                animation={2}
                position={{
                  lng: Number(position[0]),
                  lat: Number(position[1]),
                }}
              />
              <MapLabel
                content={location}
                position={{
                  lng: Number(position[0]),
                  lat: Number(position[1]),
                }}
              />
            </Map>
          </APILoader>
        </MapWrapper>
      )}
    </React.Fragment>
  );
};

export default memo(AMap);
