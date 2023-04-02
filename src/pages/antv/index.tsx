import React, { FC, useEffect, useRef, useState } from 'react';
import ToolBar from '@/engine-lib-antv/components/ToolBar';
import NodesBar from '@/engine-lib-antv/components/NodesBar';
import './index.less';
import PanelArea from '@/engine-lib-antv/components/PanelArea';
import { Config, CustomEventTypeEnum } from '@/engine-lib-antv/common/enums';
import { Channel } from '@/engine-lib-antv/common/transmit';
import registerTool from '@/engine-lib-antv/tool/registerTool';
import { initGraph } from '@/engine-lib-antv/common/graph';

export function useStateRef(state: any) {
  const stateRef = useRef<any>();
  useEffect(() => {
    stateRef.current = state;
    return () => {};
  }, [state]);
  return stateRef;
}

const Antv: FC<any> = () => {
  const [graph, setGraph] = useState<any>('hello');
  useEffect(() => {
    registerTool();
    const g = initGraph();
    console.log('graph return ', g);
    setGraph(g);
  }, []);

  useEffect(() => {
    // 监听
    // emit 节点单击
    Channel.eventListener(CustomEventTypeEnum.NODE_CLICK, (detail: any) =>
      console.log('node-click', detail),
    );
    // emit 节点双击
    Channel.eventListener(
      CustomEventTypeEnum.DOUBLE_NODE_CLICK,
      (detail: any) => console.log('node-dblclick', detail),
    );
  }, []);

  return (
    <React.Fragment>
      <div className={'layout'}>
        {/*头部标题栏*/}
        <ToolBar />

        <div className={'container'}>
          {/*组件栏*/}
          <NodesBar graph={useStateRef(graph)} />

          {/*图容器区*/}
          <div id="container" className="graph-main-container" />

          {/*可操作区*/}
          <div className="panel-area-container">
            <PanelArea>
              <template slot-scope="{ row }">
                <slot name={Config.PANEL_AREA_SLOT} />
              </template>
            </PanelArea>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Antv;
