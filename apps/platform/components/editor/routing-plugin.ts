/**
 * 路由编辑器插件
 *
 * 将 RoutingEditor 包装为插件，
 * 通过 skeleton 注册到 main-area 和 left-nav 插槽，
 * 支持 skeleton-driven 的动态渲染。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 */

import type { PluginCreator } from "@envelope/engine";
import { RoutingEditor } from "./routing-editor";

/**
 * 路由编辑器插件创建函数
 */
export const RoutingPlugin: PluginCreator = (ctx) => {
  ctx.skeleton.register('main-area', {
    name: 'routing',
    label: '路由',
    component: RoutingEditor,
    priority: 20,
  });

  ctx.skeleton.register('left-nav', {
    name: 'routing',
    label: '路由',
    icon: 'Globe',
    component: () => null,
    priority: 20,
  });

  return {
    init() {
      ctx.logger.info('RoutingPlugin 已初始化');
    },
    destroy() {
      ctx.skeleton.unregister('main-area', 'routing');
      ctx.skeleton.unregister('left-nav', 'routing');
    },
  };
};
