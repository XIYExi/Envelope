/**
 * 物料面板插件
 *
 * 将 MaterialPanel 包装为插件，通过 skeleton 注册到 left-panel 插槽。
 * 仅在 pages 模式下渲染（由 editor-layout 控制显隐）。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-07-01
 */

import type { PluginCreator } from "@envelope/engine";
import type { Dragon, EventBus, EditorEventMap } from "@envelope/engine";
import { MaterialPanel } from "./material-panel";

/**
 * 物料面板插件创建函数
 *
 * options 需要传入 dragon 和 editorBus 实例，
 * 因为 MaterialPanel 需要 dragon 用于 tree-drop 落点同步，
 * editorBus 用于 ComponentTreePanel 的 canvas:select 事件订阅。
 */
export const MaterialPlugin: PluginCreator = (ctx, options) => {
  const dragon = options?.dragon as Dragon | null | undefined;
  const editorBus = options?.editorBus as EventBus<EditorEventMap> | null | undefined;
  const onAddMaterial = options?.onAddMaterial as ((name: string) => void) | undefined;

  const MaterialPanelWrapper = () => (
    <MaterialPanel
      collapsed={false}
      onAddMaterial={onAddMaterial}
      dragon={dragon ?? null}
      editorBus={editorBus ?? null}
    />
  );

  ctx.skeleton.register('left-panel', {
    name: 'material',
    label: '物料',
    component: MaterialPanelWrapper,
    priority: 10,
  });

  return {
    init() {
      ctx.logger.info('MaterialPlugin 已初始化');
    },
    destroy() {
      ctx.skeleton.unregister('left-panel', 'material');
    },
  };
};
