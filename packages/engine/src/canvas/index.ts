/**
 * 画布模块入口
 *
 * 统一导出画布编辑器的所有公共 API：
 * - types: 类型定义（CanvasComponent、CanvasState、CanvasActions、DragItem）
 * - store: Zustand 状态管理（useCanvasStore、createCanvasComponent）
 * - dnd: 拖拽工具函数和网格对齐常量
 * - renderer: 画布渲染器组件（CanvasRenderer）
 *
 * @author xiye
 * @date 2026/6/13
 */
export * from "./types";
export * from "./store";
export * from "./dnd";
export * from "./renderer";
