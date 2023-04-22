/*必须放在pages里面，不知道为什么，
在engine-lib-antv下会监听不到，之后有时间再改吧*/

export default {
  namespace: 'antvModal',
  state: {
    graph: null,
    dnd: null,
    node: null,
    /**
     * 底下这个数据其实没用，是创建流程图dva仓库的时候测试用的，
     * 但是不知道在上面地方还是用了，删掉会报错，留着不影响*/
    text: 'ok',
  },
  reducers: {
    initializeGraph(state, action) {
      //console.log('test AntV dva', state, action);

      return {
        ...state,
        graph: action.payload.graph,
        dnd: action.payload.dnd,
        text: action.payload.text + '?',
      };
    },
    singleClick(state, action) {
      //console.log("单击节点，触发事件");
      return {
        ...state,
        node: action.payload.node,
      };
    },
  },
  effects: {},
  subscriptions: {},
};
