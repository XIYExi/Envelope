import React, { FC, useEffect, useRef, useState } from 'react';
import ToolBar from '@/engine-lib-antv/components/ToolBar';
import NodesBar from '@/engine-lib-antv/components/NodesBar';
import './index.less';
import PanelArea from '@/engine-lib-antv/components/PanelArea';
import { Config, CustomEventTypeEnum } from '@/engine-lib-antv/common/enums';
import { Channel } from '@/engine-lib-antv/common/transmit';
import registerTool from '@/engine-lib-antv/tool/registerTool';
import { initGraph } from '@/engine-lib-antv/common/graph';
import { Addon } from '@antv/x6';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
import UserController from '@/engine-lib-antv/components/UserController';

export function useStateRef(state: any) {
  const stateRef = useRef<any>();
  useEffect(() => {
    stateRef.current = state;
    return () => {};
  }, [state]);
  return stateRef;
}

const Antv: FC<any> = (props) => {
  const graph = useRef<any>(null);
  const dnd = useRef<any>(null);
  const node = useRef<any>(null);

  const { cstate, dispatch } = props;

  useEffect(() => {
    node.current = cstate.node;
  }, [cstate.node]);

  useEffect(() => {
    registerTool();
    const g = initGraph();

    const _d: any = new Addon.Dnd({
      target: g,
      validateNode() {
        return true;
      },
    });

    // 将graph数据上传至dva
    // 初始化graph后全局保存
    dispatch({
      type: 'antvModal/initializeGraph',
      payload: {
        graph: g,
        dnd: _d,
        text: 'hello dva',
      },
    });
    /*  console.log('graph return ', g);*/
    dnd.current = _d;
    graph.current = g;
  }, []);

  /*
  整合dva时用于测试
  useEffect(()=>{
    console.log('show antv dva cstate',cstate);
  }, [cstate])*/

  // 监听对 “节点” 的单词点击和双击, 拖拽不会触发函数
  useEffect(() => {
    // 监听
    // emit 节点单击
    Channel.eventListener(CustomEventTypeEnum.NODE_CLICK, (detail: any) => {
      console.log('node-click', detail);
      // 点击节点触发dva，上报供用户控制栏渲染
      dispatch({
        type: 'antvModal/singleClick',
        payload: {
          node: detail,
        },
      });
    });
  }, []);

  return (
    <React.Fragment>
      <div className={'layout'}>
        {/*头部标题栏*/}
        <ToolBar super={props} />

        <div className={'container'}>
          {/*组件栏*/}
          <NodesBar graph={graph} dnd={dnd} />

          {/*图容器区*/}
          <div id="container" className="graph-main-container" />

          {/*用户控制器 */}
          <div className="user-controller-container">
            {/*操作区域*/}
            <div className="common-actions">
              <UserController />
            </div>

            {/*小地图*/}
            <div className="panel-area-container">
              <PanelArea>
                <template slot-scope="{ row }">
                  <slot name={Config.PANEL_AREA_SLOT} />
                </template>
              </PanelArea>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

// @ts-ignore
export default connect((state: StateWithHistory<any>) => {
  return {
    cstate: state.present.antvModal,
  };
})(Antv);
