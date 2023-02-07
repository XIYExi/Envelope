import React, { FC, useEffect, useState } from 'react';
import './index.less';
import { plugins } from '@alilc/lowcode-engine';

const Lowcode: FC<any> = (props) => {
  const [hasPluginInited, setHasPluginInited] = useState<boolean>(false);

  useEffect(() => {}, []);

  return <div>{hasPluginInited && <></>}</div>;
};

export default Lowcode;
