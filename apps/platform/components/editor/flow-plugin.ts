/**
 * 流程编辑器插件
 *
 * 将 ProjectFlowEditor 包装为插件，
 * 通过 skeleton 注册到 main-area 和 left-nav 插槽。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 */

import type { PluginCreator, EventBus, EditorEventMap } from "@envelope/engine";
import { ProjectFlowEditor } from "./project-flow-editor";

/**
 * 流程编辑器插件创建函数
 *
 * options.editorBus 传入编辑器事件总线，
 * 供 ProjectFlowEditor emit flow:execute/flow:complete 事件（V4-E4）。
 */
export const FlowPlugin: PluginCreator = (ctx, options) => {
  const editorBus = options?.editorBus as EventBus<EditorEventMap> | null | undefined;

  const FlowEditorWrapper = () => <ProjectFlowEditor editorBus={editorBus ?? null} />;

  ctx.skeleton.register('main-area', {
    name: 'flows',
    label: '流程',
    component: FlowEditorWrapper,
    priority: 30,
  });

  ctx.skeleton.register('left-nav', {
    name: 'flows',
    label: '流程',
    icon: 'Workflow',
    component: () => null,
    priority: 30,
  });

  return {
    init() {
      ctx.logger.info('FlowPlugin 已初始化');
    },
    destroy() {
      ctx.skeleton.unregister('main-area', 'flows');
      ctx.skeleton.unregister('left-nav', 'flows');
    },
  };
};
