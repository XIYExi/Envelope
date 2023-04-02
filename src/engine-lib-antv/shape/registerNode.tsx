import { Graph } from '@antv/x6';
import '@antv/x6-react-shape';

import ReactNode from './ReactNode';

export default () => {
  // 渲染React节点
  // https://x6.antv.vision/zh/docs/tutorial/advanced/react
  Graph.registerReactComponent('react-node', <ReactNode />);
};
