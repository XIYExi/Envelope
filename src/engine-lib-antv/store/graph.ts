const state = {
  graph: null,
};

export function useProvideGraph(graph: any) {
  state.graph = graph;
}

export function useGraph() {
  return state.graph;
}
