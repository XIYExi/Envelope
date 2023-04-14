import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ActionType } from '@/engine-lib-antv/common/enums';
import {
  getDiamondNode,
  getEllipseNode,
  getRectNode,
  getVueNode,
} from '../common/transform';
import ReactNode from '@/engine-lib-antv/components/react-static-shape/ReactNode';
import { Tabs } from 'antd';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HighlightOutlined,
} from '@ant-design/icons';
import TargetBoxAntV from '@/engine-lib-antv/components/TargetBox';
import { nodes } from '@/engine-lib-antv/common/nodeBar';
import './index.scss';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';

const { TabPane } = Tabs;

const NodesBar: FC<any> = (props) => {
  const [data, setData] = useState({
    freeze: false,
  });
  const { cstate, dispatch } = props;
  const graph = useRef(cstate.graph);
  const dnd = useRef(cstate.dnd);
  // text是用来测试的，保证ref的值被更新了
  const text = useRef(cstate.text);

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const changeCollapse = useMemo(() => {
    return (c: boolean) => {
      setCollapsed(c);
    };
  }, []);
  const [tabsKey, setTabsKey] = useState<string>('1');
  const handleTabsChange = useCallback((e) => {
    console.log(String(e));
    setTabsKey(String(e));
  }, []);

  // 新方案，缺点是会造成大量渲染，每次modal中值变动都会导致此函数一次渲染
  // 但这是必要开销！
  useEffect(() => {
    //console.log('NodesBar cstate: ', cstate)
    graph.current = cstate.graph;
    dnd.current = cstate.dnd;
    text.current = cstate.text;
  }, [cstate]);

  /*
  废案，不通过ref传值，全部使用dva，为了保证值最新，
  在useEffect中监听最新值，之后通过组件内部的ref传递最新的画布数据
  useEffect(() => {
    console.log('initDnd', props.dnd)
    console.log('尝试得到 graph.value ',props.graph)

    /!*setData({
      dnd: d,
      freeze: data.freeze,
    });*!/
    //d = _d;
  }, [props]);*/

  // 开始拖拽函数，通过监听组件内部的ref，来判断是否需要更新函数
  // 因为函数中依赖dnd和graph的最新值，为了避免重复渲染，使用useCallBack监听，只要不拖拽创建新的节点就不会触发更新
  const startDrag = useCallback(
    (currentTarget: any, e: any) => {
      //console.log('initDnd', props.dnd)
      //console.log('尝试得到 graph.value ',props.graph.current)

      //console.log('startDrag', currentTarget, e)
      const { actionType, shape, label } = currentTarget;
      const { TRIGGER, CONDITION, ACTION } = ActionType;
      let json;
      switch (actionType) {
        // 触发器
        case TRIGGER:
          json = getEllipseNode({
            shape,
            tooltip: label,
            size: { width: 100, height: 50 },
            actionType,
            initialization: true,
          });
          break;
        // 条件
        case CONDITION:
          json = getDiamondNode({
            // x6 不存在 diamond 形状, 转义 rect
            shape: 'rect',
            tooltip: label,
            actionType,
            initialization: true,
          });
          break;
        // 动作
        case ACTION:
          json = getRectNode({
            shape,
            tooltip: label,
            size: { width: 100, height: 50 },
            actionType,
            initialization: true,
          });
          break;
        case 'Vue-node':
          json = getVueNode({
            shape: 'rect',
            tooltip: label,
            size: { width: 110, height: 50 },
            actionType,
            initialization: true,
          });
          break;
        default:
          break;
      }

      // const node = props.graph.current.createNode(json);
      const node = graph.current.createNode(json);
      if (!data.freeze) {
        // console.log('d', graph.current, dnd.current);
        // cstate.dnd.start(node, e);
        dnd.current.start(node, e);
      }
    },
    [graph.current, dnd.current],
  );

  // 左侧 Tabs 的 Icon
  const CpIcon = {
    base: <HighlightOutlined />,
  };

  // 生成头部
  const generateHeader = useMemo(() => {
    return (type: any, text: string) => {
      return (
        <div style={{ height: '10%' }}>
          {(CpIcon as any)[type]} {text}
        </div>
      );
    };
  }, [CpIcon]);

  const tabRenderAntv = useMemo(() => {
    if (collapsed) {
      return (
        <>
          <TabPane tab={generateHeader('base', '')} key="1"></TabPane>
        </>
      );
    } else {
      return (
        <>
          <TabPane tab={generateHeader('base', '')} key="1">
            <div className={'ctitle'}>基础组件</div>
            {nodes.map((node: any, index: number) => {
              return (
                <TargetBoxAntV
                  key={index}
                  onMouseDown={(e: any) => startDrag(node, e)}
                  title={node.title}
                >
                  <div
                    className={
                      data.freeze
                        ? `freeze-${node.shape}`
                        : `default-${node.shape}`
                    }
                    style={node.styles}
                  ></div>
                </TargetBoxAntV>
              );
            })}
            <div className={'ctitle'}>自定义组件</div>
            <TargetBoxAntV
              onMouseDown={(e: any) =>
                startDrag(
                  {
                    label: 'React-Node',
                    shape: 'rect',
                    actionType: 'React-Node',
                  },
                  e,
                )
              }
            >
              <div>
                <ReactNode
                  className={data.freeze ? `freeze-rect` : `static-react-node`}
                />
              </div>
            </TargetBoxAntV>
          </TabPane>
        </>
      );
    }
  }, []);

  return (
    <React.Fragment>
      <div
        className={'antvlist'}
        style={{
          transition: 'all ease-in-out 0.5s',
          position: 'fixed',
          width: collapsed ? '50px' : '350px',
          zIndex: 200,
          boxShadow: 'none',
        }}
      >
        <div className={'componentList'}>
          <Tabs
            className="editorTabclass"
            onTabClick={() => changeCollapse(false)}
            activeKey={tabsKey}
            tabPosition={'left'}
            onChange={(e) => handleTabsChange(e)}
          >
            {tabRenderAntv}
          </Tabs>
        </div>
        <div
          className={'collapsed'}
          style={{ position: 'absolute', bottom: '80px', left: '20px' }}
          onClick={() => changeCollapse(!collapsed)}
        >
          {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect((state: StateWithHistory<any>) => {
  return {
    cstate: state.present.antvModal,
  };
})(NodesBar);
