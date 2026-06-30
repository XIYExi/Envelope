/**
 * 数据模型编辑器插件
 *
 * 将 DataModelEditor 包装为插件，
 * 验证 PluginManager + PluginContext + SkeletonAPI 在编辑器中的工作流。
 * DataModelEditor 通过 skeleton 注册到 main-area 插槽，
 * 路由编辑器中通过 pluginManager.getSkeleton().getItems('main-area') 查询。
 *
 * 保留原有的 if/else 模式路由作为降级方案，
 * 此插件仅作为概念验证，不替换现有路由逻辑。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 */

import type { PluginCreator } from "@envelope/engine";
import { DataModelEditor } from "./data-model-editor";

/**
 * 数据模型编辑器插件创建函数
 *
 * 注册后，DataModelEditor 的组件和导航项会注入到骨架系统中，
 * 供 skeleton-driven 渲染使用。
 */
export const DataModelPlugin: PluginCreator = (ctx) => {
  // 注册到主内容区插槽
  ctx.skeleton.register('main-area', {
    name: 'data-models',
    label: '数据模型',
    component: DataModelEditor,
    priority: 10,
  });

  // 注册到左侧导航栏插槽（供 future 使用）
  ctx.skeleton.register('left-nav', {
    name: 'data-models',
    label: '数据模型',
    icon: 'Database',
    component: () => null,
    priority: 10,
  });

  return {
    /**
     * 插件初始化时输出日志，证明 PluginManager 生命周期工作
     */
    init() {
      ctx.logger.info('DataModelPlugin 已初始化');
    },

    /**
     * 插件销毁时清理骨架注册
     */
    destroy() {
      ctx.skeleton.unregister('main-area', 'data-models');
      ctx.skeleton.unregister('left-nav', 'data-models');
    },
  };
};
