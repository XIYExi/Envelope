// 初始化 节点栏 元素列表
import { ActionType } from './enums';
import { getActionTypeTheme } from './transform';

// 基础样式
const BaseStyle = {
  // 方形 - 操作
  rect: {
    width: '100px',
    height: '50px',
    lineHeight: '36px',
    textAlign: 'center',
    border: '2px solid #5b8ffa',
    backgroundColor: '#9ec9ff',
    borderRadius: '4px',
    color: '#7D7671',
  },
  // 椭圆 - 开始 / 结束
  ellipse: {
    width: '100px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
    border: '2px solid #5b8ffa',
    backgroundColor: '#9ec9ff',
    borderRadius: '50px / 25px',
    color: '#7D7671',
  },
  // diamond 菱形 执行
  diamond: {
    width: '52px',
    height: '52px',
    lineHeight: '36px',
    textAlign: 'center',
    border: '2px solid #5b8ffa',
    backgroundColor: '#9ec9ff',
    borderRadius: '4px',
    color: '#7D7671',
    transform: 'rotateZ(45deg)',
    // transform: 'rotate(45deg)',
    // transform: 'rotate(-45deg)'
  },
  // 圆角放行，表示 可选操作
  bordered: {
    width: '100px',
    height: '50px',
    lineHeight: '36px',
    textAlign: 'center',
    border: '2px solid #5b8ffa',
    backgroundColor: '#9ec9ff',
    borderRadius: '15px',
    color: '#7D7671',
  },
  data: {
    width: '100px',
    height: '50px',
    lineHeight: '36px',
    textAlign: 'center',
    border: '2px solid #5b8ffa',
    backgroundColor: '#9ec9ff',
    color: '#7D7671',
    transform: 'skewX(-30deg)',
  },
  connect: {
    width: '60px',
    height: '60px',
    lineHeight: '36px',
    textAlign: 'center',
    border: '2px solid #5b8ffa',
    borderRadius: '50px',
    backgroundColor: '#9ec9ff',
    color: '#7D7671',
  },
};

function getStyles(type: any) {
  const { TRIGGER, CONDITION, ACTION, OPTIONAL, DATA, CONNECT } = ActionType;
  let base;
  const targetTheme = getActionTypeTheme(type);
  switch (type) {
    case TRIGGER:
      base = BaseStyle.ellipse;
      break;
    case CONDITION:
      base = BaseStyle.diamond;
      break;
    case ACTION:
      base = BaseStyle.rect;
      break;
    case OPTIONAL:
      base = BaseStyle.bordered;
      break;
    case DATA:
      base = BaseStyle.data;
      break;
    case CONNECT:
      base = BaseStyle.connect;
      break;
    default:
      break;
  }
  return {
    ...base,
    backgroundColor: targetTheme.background,
    borderColor: targetTheme.border,
  };
}

export const nodes = [
  {
    label: 'Start',
    title: '开始/结束',
    actionType: ActionType.TRIGGER,
    styles: getStyles(ActionType.TRIGGER),
    shape: 'ellipse',
  },
  {
    label: 'Condition',
    title: '条件',
    actionType: ActionType.CONDITION,
    styles: getStyles(ActionType.CONDITION),
    shape: 'diamond',
  },
  {
    label: 'Action',
    title: '操作',
    actionType: ActionType.ACTION,
    styles: getStyles(ActionType.ACTION),
    shape: 'rect',
  },
  {
    label: 'Optional',
    title: '可选操作',
    actionType: ActionType.OPTIONAL,
    styles: getStyles(ActionType.OPTIONAL),
    shape: 'rect',
  },
  {
    label: 'Data',
    title: '数据',
    actionType: ActionType.DATA,
    styles: getStyles(ActionType.DATA),
    shape: 'polygon',
  },
  {
    label: 'Connect',
    title: '连接',
    actionType: ActionType.CONNECT,
    styles: getStyles(ActionType.CONNECT),
    shape: 'circle',
  },
];
