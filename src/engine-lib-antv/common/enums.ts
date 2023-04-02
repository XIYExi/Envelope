/**
 * 基类Cell形状
 * @enum
 * */
interface IShapeEnum {
  RECT: string;
  CIRCLE: string;
  ELLIPSE: string;
  POLYGON: string;
  DIAMOND: string;
}
export const ShapeEnum: IShapeEnum = {
  /**@type {String} 矩形 */
  RECT: 'rect',
  /**@type {String} 圆形 */
  CIRCLE: 'circle',
  /**@type {String} 椭圆 */
  ELLIPSE: 'ellipse',
  /**@type {String} 多边形 */
  POLYGON: 'polygon',
  /**@type {String} 菱形 x6不存在此类型 */
  DIAMOND: 'diamond',
};

/**
 * 工具类
 * @enum
 */
export const ToolTypeEnum: { [key: string]: string } = {
  /**@type {String} 删除元素 */
  REMOVE_BUTTON: 'custom-remove-button',
};

/**
 * 事件分发类型，dva使用
 * @enum
 */
interface ICustomEventTypeEnum {
  CELL_CLICK: string;
  NODE_CLICK: string;
  DOUBLE_NODE_CLICK: string;
  HELP: string;
  FREEZE_GRAPH: string;
  RUNTIME_ERR: string;
}
export const CustomEventTypeEnum: ICustomEventTypeEnum = {
  /**@type {String} 单元点击触发 */
  CELL_CLICK: '__antv_x6_custom_event_type_cell_click__',
  /**@type {String} 节点点击触发 */
  NODE_CLICK: '__antv_x6_custom_event_type_node_click__',
  /**@type {String} 双击节点触发 */
  DOUBLE_NODE_CLICK: '__antv_x6_custom_event_type_cell_double_click__',
  /**@type {String} 帮助信息 */
  HELP: '__antv_x6_custom_event_type_help__',
  /**@type {String} 冻结画布 */
  FREEZE_GRAPH: '__antv_x6_custom_event_type_freeze_graph__',
  /**@type {String} 运行时异常 */
  RUNTIME_ERR: '__antv_x6_custom_event_type_runtime_err__',
};

/**
 * 选择状态
 * @enum
 */
interface ISelectStateEnum {
  SELECTED: string;
  UN_SELECTED: string;
}
export const SelectStateEnum: ISelectStateEnum = {
  /**@type {String} 已选中 */
  SELECTED: 'selected',
  /**@type {String} 未选中 */
  UN_SELECTED: 'unselected',
};

/**
 * 配置项
 * @enum
 */
interface IConfig {
  PANEL_AREA_SLOT: string;
  TOOLTIPS_SLOT: string;
}
export const Config: IConfig = {
  /**@type {String} 可操作Node区 插槽 */
  PANEL_AREA_SLOT: 'panel_area_slot',
  /**@type {String} Tooltips 插槽 */
  TOOLTIPS_SLOT: 'tooltips_slot',
};

/**
 * 节点触发类型
 */
interface IActionType {
  TRIGGER: string;
  CONDITION: string;
  ACTION: string;
}
export const ActionType = {
  /**@type {String} 触发器 */
  TRIGGER: 'TRIGGER',
  /**@type {String} 条件 */
  CONDITION: 'CONDITION',
  /**@type {String} 动作 */
  ACTION: 'ACTION',
};
