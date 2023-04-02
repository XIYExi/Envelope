export default (graph: any) => {
  graph.on('cell:removed', () => {
    graph.getNodes()?.forEach((node: any) => {
      // 移除html模板
      if (node.shape === 'html') graph.removeNode(node);
    });
  });
};
