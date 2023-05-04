export default {
  namespace: 'rbacModal',
  state: {
    visible: false,
    user: {},
  },
  reducers: {
    changeDrawer(state, action) {
      // console.log('action: ', action);
      return {
        visible: action.payload.visible,
        user: action.payload.user,
      };
    },
  },
  effects: {},
  subscriptions: {},
};
