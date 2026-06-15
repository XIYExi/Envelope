/**
 * F15 Flow Template Registry — 模板注册与检索模块
 *
 * 提供模板的注册、按 ID 查找、按分类筛选等功能。
 * 注册表以 FlowTemplate 为基本单元，每个模板包含
 * 中文名称、描述、分类及对应的 FlowDefinition 定义。
 *
 * 分类体系：
 * - auth：认证相关（注册、登录、密码重置）
 * - crud：数据操作（增删改查）
 * - form：表单处理（联系方式、反馈、调查）
 * - notification：通知类（邮件、推送）
 * - integration：集成类（第三方 API 对接）
 *
 * @author xiye
 * @date 2026-06-14
 */

import type { FlowDefinition } from "../thing-model/types";
import {
  SIGNUP_FLOW_TEMPLATE,
  LOGIN_FLOW_TEMPLATE,
  CRUD_FLOW_TEMPLATE,
  PASSWORD_RESET_FLOW_TEMPLATE,
  CONTACT_FORM_FLOW_TEMPLATE,
} from "./templates";

// ═══════════════════════════════════════════════════════════════════
// 类型定义
// ═══════════════════════════════════════════════════════════════════

/** 模板分类枚举 */
export type FlowTemplateCategory = "auth" | "crud" | "form" | "notification" | "integration";

/**
 * 流程模板注册条目
 *
 * 包含模板的展示元数据和对应的流程定义，
 * 供 UI 面板展示和一键导入使用。
 */
export interface FlowTemplate {
  /** 模板唯一标识符 */
  id: string;
  /** 模板中文名称 */
  name: string;
  /** 模板中文描述 */
  description: string;
  /** 模板分类 */
  category: FlowTemplateCategory;
  /** 可选缩略图标（emoji） */
  thumbnail?: string;
  /** 模板对应的流程定义 */
  definition: FlowDefinition;
}

// ═══════════════════════════════════════════════════════════════════
// 内置模板注册表
// ═══════════════════════════════════════════════════════════════════

/**
 * 所有内置模板的注册表
 *
 * 每个模板包含完整的元数据和流程定义。
 * 模板 ID 使用短横线命名（kebab-case），与 FlowDefinition.thing 保持一致。
 */
const TEMPLATE_REGISTRY: FlowTemplate[] = [
  {
    id: "signup",
    name: "用户注册",
    description: "验证输入 → 检查已有用户 → 插入用户 → 发送欢迎邮件。适用于标准的 Web 应用注册场景。",
    category: "auth",
    thumbnail: "📝",
    definition: SIGNUP_FLOW_TEMPLATE,
  },
  {
    id: "login",
    name: "用户登录",
    description: "验证凭证 → 查询用户 → 创建会话。适用于标准的 Web 应用登录场景。",
    category: "auth",
    thumbnail: "🔑",
    definition: LOGIN_FLOW_TEMPLATE,
  },
  {
    id: "crud",
    name: "CRUD 数据操作",
    description: "验证数据 → 插入/更新/删除 → 返回结果 → 通知。适用于后台管理系统的通用增删改查。",
    category: "crud",
    thumbnail: "🗄️",
    definition: CRUD_FLOW_TEMPLATE,
  },
  {
    id: "password-reset",
    name: "密码重置",
    description: "按邮箱查询用户 → 发送重置邮件 → 更新密码。适用于标准的「忘记密码」功能。",
    category: "auth",
    thumbnail: "🔒",
    definition: PASSWORD_RESET_FLOW_TEMPLATE,
  },
  {
    id: "contact-form",
    name: "联系方式表单",
    description: "验证字段 → 保存到数据库 → 发送通知邮件。适用于官网的「联系我们」或反馈表单。",
    category: "form",
    thumbnail: "📬",
    definition: CONTACT_FORM_FLOW_TEMPLATE,
  },
];

// ═══════════════════════════════════════════════════════════════════
// 公共 API
// ═══════════════════════════════════════════════════════════════════

/**
 * 获取所有已注册的流程模板
 *
 * @returns 所有模板的数组
 */
export function getAllTemplates(): FlowTemplate[] {
  return [...TEMPLATE_REGISTRY];
}

/**
 * 根据模板 ID 查找模板
 *
 * @param id - 模板唯一标识符
 * @returns 找到的模板，若不存在则返回 undefined
 */
export function getTemplate(id: string): FlowTemplate | undefined {
  return TEMPLATE_REGISTRY.find((t) => t.id === id);
}

/**
 * 按分类筛选模板
 *
 * @param category - 模板分类
 * @returns 该分类下的所有模板
 */
export function getTemplatesByCategory(category: FlowTemplateCategory): FlowTemplate[] {
  return TEMPLATE_REGISTRY.filter((t) => t.category === category);
}
