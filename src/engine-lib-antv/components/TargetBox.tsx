import React, { FC } from 'react';
import { Typography } from 'antd';

const TargetBoxAntV: FC<any> = (props) => {
  return (
    <>
      <div className={'antvListWrap'} {...props}>
        <div className={'module'}>
          <div
            style={{
              height: '45px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div style={{ transform: 'scale(0.6)' }}>{props.children}</div>
          </div>
        </div>
        <div className="antvTitle">
          <p>{props.title}</p>
        </div>
      </div>
    </>
  );
};

export default TargetBoxAntV;
