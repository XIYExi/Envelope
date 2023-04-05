import React from 'react';
import SvgAnimate from '@/pages/homepage/svg/SvgAnimate';
import { Home } from './Home';

const HomePage = (props: any) => {
  return (
    <React.Fragment>
      {/*TODO 检测屏幕是否为PC，为PC就显示完整动画，手机只显示 Envelope*/}
      {/*<div style={{ width: '100vw', height: '100vh' }}>
        <SvgAnimate />
      </div>*/}

      <Home />
    </React.Fragment>
  );
};

export default HomePage;
