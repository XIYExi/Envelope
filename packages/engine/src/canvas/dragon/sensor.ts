/**
 * DragSensor — 拖拽感应器接口
 *
 * 为 Dragon 引擎的多模拟器架构预留接口。
 * 当前 Envelope 使用 dnd-kit 单画布，Phase 1 仅定义接口，
 * 未来支持 iframe 内画布拖拽时可通过 addSensor 注册新感应器。
 *
 * @reference lowcode-engine-main/packages/designer/src/designer/dragon.ts
 *   addSensor / removeSensor + ILocateEvent
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 */

/** 拖拽感应器接口 */
export interface DragSensor {
  /** 感应器是否可用（画布已挂载、视口已初始化等） */
  sensorAvailable: boolean;
  /** 判断当前鼠标事件是否进入此感应器的感应区域 */
  isEnter(e: { clientX: number; clientY: number }): boolean;
}
