/**
 * API 端点编辑器插件
 *
 * 将 ApiEndpointEditor 包装为插件，
 * 通过 skeleton 注册到 main-area 和 left-nav 插槽。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 */

import type { PluginCreator } from "@envelope/engine";
import { ApiEndpointEditor } from "./api-endpoint-editor";

/**
 * API 端点编辑器插件创建函数
 */
export const ApiPlugin: PluginCreator = (ctx) => {
  ctx.skeleton.register('main-area', {
    name: 'api',
    label: 'API 端点',
    component: ApiEndpointEditor,
    priority: 40,
  });

  ctx.skeleton.register('left-nav', {
    name: 'api',
    label: 'API 端点',
    icon: 'Plug',
    component: () => null,
    priority: 40,
  });

  return {
    init() {
      ctx.logger.info('ApiPlugin 已初始化');
    },
    destroy() {
      ctx.skeleton.unregister('main-area', 'api');
      ctx.skeleton.unregister('left-nav', 'api');
    },
  };
};
