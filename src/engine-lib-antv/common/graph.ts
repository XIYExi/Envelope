import { Graph, Path } from '@antv/x6';
import trigger from '../common/trigger';
import registerNode from '../shape/registerNode';
import registerGraphListener from '../eventSystems';

/**
 * x6实例化
 */
export function initGraph() {
  // 注册自定义节点
  registerNode();

  const graph = new Graph({
    // @ts-ignore
    container: document.getElementById('container'),
    // width: 600,
    // height: 600,
    // 监听容器大小改变，并自动更新画布大小
    // https://x6.antv.vision/zh/docs/api/graph/graph#autoresize
    autoResize: true,
    // 键盘快捷键 Keyboard
    // https://x6.antv.vision/zh/docs/tutorial/basic/keyboard/#gatsby-focus-wrapper
    keyboard: {
      enabled: true,
      global: true,
    },
    // 点选/框选，默认禁用。
    selecting: {
      enabled: true,
      showNodeSelectionBox: true,
      // https://x6.antv.vision/zh/docs/tutorial/basic/selection
      rubberband: true, // 启用框选
      modifiers: 'ctrl', // 组合键
    },
    // 对齐线
    snapline: true,
    // 画布平移
    // https://x6.antv.vision/zh/docs/tutorial/basic/graph/#%E7%94%BB%E5%B8%83%E5%B9%B3%E7%A7%BB
    panning: {
      enabled: true,
      eventTypes: ['leftMouseDown', 'rightMouseDown', 'mouseWheel'],
    },
    // 网格
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 渲染网格背景
    },
    // 剪切板 Clipboard
    // https://x6.antv.vision/zh/docs/tutorial/basic/clipboard
    clipboard: true,
    // 撤销/重做 Redo/Undo
    // https://x6.antv.vision/zh/docs/tutorial/basic/history/#gatsby-focus-wrapper
    history: {
      enabled: true,
      beforeAddCommand(event: any, args: any) {
        // @ts-ignore
        if (args.key) {
          // 禁止删除按钮添加到 Undo 队列中
          // @ts-ignore
          return args.key !== 'tools';
        }
      },
    },
    // 可以通过 highlighting 选项来指定触发某种交互时的高亮样式
    // https://x6.antv.vision/zh/docs/api/graph/interaction/#highlighting
    highlighting: {
      // 当链接桩可以被链接时，在链接桩外围渲染一个 2px 宽的红色矩形框
      magnetAvailable: {
        name: 'stroke',
        args: {
          padding: 4,
          attrs: {
            'stroke-width': 4,
            stroke: 'skyblue',
          },
        },
      },
      // 连线过程中，自动吸附到链接桩时被使用
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          padding: 4,
          attrs: {
            'stroke-width': 8,
            stroke: 'skyblue',
          },
        },
      },
    },
    // 滚轮缩放
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta'],
    },
    // 迷你地图
    minimap: {
      enabled: true,
      // width: 250,
      // height: 250,
      // @ts-ignore
      container: document.getElementById('minimap'),
      padding: 40,
    },
    // 定制节点和边的交互行为
    // https://x6.antv.vision/zh/docs/tutorial/basic/interacting/#%E5%AE%9A%E5%88%B6%E4%BA%A4%E4%BA%92%E8%A1%8C%E4%B8%BA
    interacting: function (cellView) {
      if (cellView.cell.getData()?.disableMove) {
        return { nodeMovable: false };
      }
      return true;
    },
    // 配置全局的连线规则
    // https://x6.antv.vision/zh/docs/api/graph/interaction
    connecting: {
      // 自动吸附
      snap: true,
      // 不允许连接到画布空白位置的点
      allowBlank: false,
      // 不允许创建循环连线
      allowLoop: false,
      // 不允许在相同的起始节点和终止之间创建多条边
      allowMulti: false,
      // 高亮显示所有可用的连接桩或节点
      // https://x6.antv.vision/zh/docs/tutorial/basic/interacting/#highlight
      highlight: true,
      // 当连接到节点时，通过 sourceAnchor 来指定源节点的锚点。
      sourceAnchor: {
        name: 'center',
      },
      // 当连接到节点时，通过 targetAnchor 来指定目标节点的锚点。
      targetAnchor: 'center',
      // 指定连接点，默认值为 boundary。
      connectionPoint: 'anchor',
      // 连接器将起点、路由返回的点、终点加工为 元素的 d 属性，决定了边渲染到画布后的样式，默认值为 normal。
      connector: 'algo-connector',
      // 路由将边的路径点 vertices 做进一步转换处理，并在必要时添加额外的点，然后返回处理后的点，默认值为 normal。
      router: {
        name: 'er',
        args: {
          offset: 25,
          direction: 'H',
        },
      },
      // https://x6.antv.vision/zh/docs/tutorial/basic/interacting/#validatemagnet
      // 判断是否新增边
      validateMagnet({ magnet }) {
        const portGroup = magnet.getAttribute('port-group');
        return portGroup !== 'in';
      },
      // 连接的过程中创建新的边
      createEdge() {
        return this.createEdge({
          zIndex: -1,
          attrs: {
            line: {
              strokeDasharray: '5 5',
              stroke: '#7c68fc',
              strokeWidth: 2,
              targetMarker: {
                name: 'block',
                args: {
                  size: '6',
                },
              },
            },
          },
        });
      },
      // https://x6.antv.vision/zh/docs/tutorial/basic/interacting/#validateconnection
      // 在移动边的时候判断连接是否有效，如果返回 false，当鼠标放开的时候，不会连接到当前元素，否则会连接到当前元素。
      validateConnection({
        targetView,
        sourceMagnet,
        targetMagnet,
        sourceCell,
      }) {
        if (!sourceMagnet || !targetMagnet) {
          return false;
        }
        // @ts-ignore
        if (sourceCell.getData()?.disableMove) return false;

        let t: any = undefined;
        if (targetMagnet.tagName === 'rect') {
          //当tagName选到rect说明，当前是er节点，拖拽后选到下一层body上去了，这里向上回溯得到g标签
          t = targetMagnet.parentNode;
        }

        // 判断目标链接桩是否可连接
        // 4.22 添加额外判断，是否为er图，如果是er图则将目标节点替换为t
        const portId =
          t === undefined
            ? targetMagnet.getAttribute('port')
            : t.getAttribute('port');

        /**
         * targetMagnet 当使用的节点时常规节点（目前除了er外）、
         * 这类节点都存在连接框，所以存在属性port，
         * 但是er图时动态生成ports连接桩，并不存在连接框，所以下述判断portId存在就直接走流程，不存在就默认存在
         */

        // @ts-ignore
        const node = targetView.cell;

        // @ts-ignore
        const port = node.getPort(portId);
        if (!port) {
          return false;
        }
        return true;
      },
    },
  });

  // 注册画布监听器
  registerGraphListener(graph);
  // 注入触发器
  trigger(graph);
  // init中不触发缓存，有容器创建完成后保存到dva
  return graph;
}
