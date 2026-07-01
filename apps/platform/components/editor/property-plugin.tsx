/**
 * 属性面板插件
 *
 * 将 RightPanel 包装为插件，通过 skeleton 注册到 right-panel 插槽。
 * 仅在 pages 模式下渲染（由 editor-layout 控制显隐）。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-07-01
 */

import type { PluginCreator } from "@envelope/engine";
import type { EventBus, EditorEventMap } from "@envelope/engine";
import { RightPanel } from "./right-panel";

/**
 * 属性面板插件创建函数
 *
 * options 需要传入 editorBus 实例，
 * 因为 RightPanel 通过 editorBus 订阅 canvas:select 事件。
 */
export const PropertyPlugin: PluginCreator = (ctx, options) => {
  const editorBus = options?.editorBus as EventBus<EditorEventMap> | null | undefined;
  const width = options?.width as number | undefined;

  const RightPanelWrapper = () => (
    <RightPanel width={width} editorBus={editorBus ?? null} />
  );

  ctx.skeleton.register('right-panel', {
    name: 'property',
    label: '属性',
    component: RightPanelWrapper,
    priority: 10,
  });

  return {
    init() {
      ctx.logger.info('PropertyPlugin 已初始化');
    },
    destroy() {
      ctx.skeleton.unregister('right-panel', 'property');
    },
  };
};
