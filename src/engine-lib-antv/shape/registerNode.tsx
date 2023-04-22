import { Graph, Path } from '@antv/x6';
import '@antv/x6-react-shape';

import { AlgoNode } from '@/engine-lib-antv/components/react-static-shape/AlgoNode';
import React from 'react';

export default () => {
  // 渲染React节点
  // https://x6.antv.vision/zh/docs/tutorial/advanced/react

  Graph.registerConnector(
    'algo-connector',
    (s, e) => {
      const offset = 4;
      const deltaY = Math.abs(e.y - s.y);
      const control = Math.floor((deltaY / 3) * 2);

      const v1 = { x: s.x, y: s.y + offset + control };
      const v2 = { x: e.x, y: e.y - offset - control };

      return Path.normalize(
        `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `,
      );
    },
    true,
  );

  // 注册人工智能dag图
  Graph.registerNode(
    'dag-node',
    {
      // @ts-ignore
      inherit: 'react-shape',
      width: 180,
      height: 36,
      component: <AlgoNode />,
      ports: {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#C2C8D5',
                strokeWidth: 1,
                fill: '#fff',
              },
            },
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#C2C8D5',
                strokeWidth: 1,
                fill: '#fff',
              },
            },
          },
        },
      },
    },
    true,
  );

  // 注册e-r图连接桩
  Graph.registerPortLayout(
    'er-PortPosition',
    (portsPositionArgs) => {
      return portsPositionArgs.map((_, index) => {
        return {
          position: {
            x: 0,
            y: (index + 1) * 24,
          },
          angle: 0,
        };
      });
    },
    true,
  );

  // 注册e-r节点
  Graph.registerNode(
    'er-rect',
    {
      inherit: 'rect',
      flag: 'er',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        rect: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#5F95FF',
        },
        label: {
          fontWeight: 'bold',
          fill: '#ffffff',
          fontSize: 12,
        },
      },
      ports: {
        groups: {
          'er-list': {
            markup: [
              {
                tagName: 'rect',
                selector: 'portBody',
              },
              {
                tagName: 'text',
                selector: 'portNameLabel',
              },
              {
                tagName: 'text',
                selector: 'portTypeLabel',
              },
            ],
            attrs: {
              portBody: {
                width: 150,
                height: 24,
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
                magnet: true,
              },
              portNameLabel: {
                ref: 'portBody',
                refX: 6,
                refY: 6,
                fontSize: 10,
              },
              portTypeLabel: {
                ref: 'portBody',
                refX: 95,
                refY: 6,
                fontSize: 10,
              },
            },
            position: 'er-PortPosition',
          },
        },
      },
    },
    true,
  );
};
