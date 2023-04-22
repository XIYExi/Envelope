import { Vector } from '@antv/x6';

export default (graph: any) => {
  graph.on('edge:connected', (args: any) => {
    const edge = args.edge;
    const node = args.currentCell;
    let elem = args.currentMagnet;

    if (elem.tagName === 'rect') {
      /**
       * 和graph.ts中同理，对应er节点，需要重定位到父节点g
       */
      elem = elem.parentNode;
    }

    const portId = elem.getAttribute('port');

    if (node.isNode() && node.shape === 'vue-shape') {
      const view = graph.findViewByCell(edge);
      if (view) {
        const path = view.findOne('path');
        if (path) {
          const token = Vector.create('circle', {
            r: 5,
            fill: '#5F95FF',
          });
          token.animateAlongPath(
            {
              dur: '3s',
              repeatCount: 'indefinite',
            },
            path,
          );
          token.appendTo(path.parentNode);
        }
      }
    }
    if (node.shape === 'vue-shape') return;

    // 触发 port 重新渲染
    node.setPortProp(portId, 'connected', true);
    edge.zIndex = -1;
    // 更新连线样式
    edge.attr({
      line: {
        strokeDasharray: '',
        targetMarker: 'classic',
      },
    });
    edge.appendLabel({
      attrs: {
        label: {
          text: '',
        },
      },
    });
  });
};
