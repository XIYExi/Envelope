import React, { FC, useEffect, useState } from 'react';
import './index.less';
import registerPlugins from '@/engine-lib-grid/plugin';
import EditorView from '@/engine-lib-grid/EditorView';
import { plugins } from '@alilc/lowcode-engine';

const Lowcode: FC<any> = (props) => {
  const [hasPluginInited, setHasPluginInited] = useState<boolean>(false);

  useEffect(() => {
    registerPlugins()
      .then(() => {
        setHasPluginInited(true);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      plugins.dispose().then(() => {
        console.info('plugins destroy success');
      });
    };
  }, []);

  return <div>{hasPluginInited && <EditorView />}</div>;
};

export default Lowcode;
