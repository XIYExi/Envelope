import React from 'react';
import SvgAnimate from '@/pages/homepage/svg/SvgAnimate';

const HomePage = (props: any) => {
  return (
    <React.Fragment>
      <div style={{ width: '100vw', height: '100vh' }}>
        <SvgAnimate />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
