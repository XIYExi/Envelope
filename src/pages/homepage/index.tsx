import React, { useContext } from 'react';
import SvgAnimate from '@/pages/homepage/svg/SvgAnimate';
import { Home } from './Home';
import { ctx } from '@/layout';

const HomePage = (props: any) => {
  const show = useContext(ctx);

  return (
    <React.Fragment>
      {/*TODO 检测屏幕是否为PC，为PC就显示完整动画，手机只显示 Envelope*/}
      {!show && (
        <div style={{ width: '100vw', height: '100vh' }}>
          <SvgAnimate />
        </div>
      )}
      {show && <Home />}
    </React.Fragment>
  );
};

export default HomePage;
