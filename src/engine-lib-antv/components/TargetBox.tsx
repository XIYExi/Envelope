import React, { FC } from 'react';

const TargetBoxAntV: FC<any> = (props) => {
  return (
    <>
      <div className={'listWrap'} {...props}>
        <div className={'module'}>
          <div
            style={{
              height: '110px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default TargetBoxAntV;
