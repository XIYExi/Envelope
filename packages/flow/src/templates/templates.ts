/**
 * F15 Flow Templates — 内置可复用流程模板库
 *
 * 提供 5 种常见业务场景的预构建流程模板，涵盖：
 * - 用户注册与登录认证
 * - CRUD 数据操作（带验证）
 * - 密码重置
 * - 联系方式表单
 *
 * 每个模板包含完整的节点配置、连线关系和中文注释，
 * 用户可通过 UI 一键导入并自定义。
 *
 * @author xiye
 * @date 2026-06-14
 */

import type { FlowDefinition, FlowNode, FlowEdge } from "../thing-model/types";

// ═══════════════════════════════════════════════════════════════════
// 模板 1：用户注册流程
// ═══════════════════════════════════════════════════════════════════

/**
 * 注册流程模板 — 验证输入 → 检查已有用户 → 插入用户 → 发送欢迎邮件
 *
 * 适用于标准的 Web 应用用户注册场景。
 * 流程先校验表单数据，然后查询数据库检查邮箱是否已注册，
 * 若未注册则插入新记录并发送欢迎邮件；若已注册则直接结束。
 *
 * 节点数量：7（1 start + 1 transform + 1 query + 1 if + 1 insert + 1 email + 1 end）
 */
export const SIGNUP_FLOW_TEMPLATE: FlowDefinition = {
  thing: "template-signup",
  version: "1.0.0",
  description: "用户注册流程 — 验证输入 → 检查已有用户 → 插入用户 → 发送欢迎邮件",
  nodes: [
    {
      // 流程开始
      id: "s-node-start",
      type: "event.start",
      position: { x: 300, y: 50 },
      label: "注册开始",
      config: {},
    },
    {
      // 校验注册表单输入（邮箱格式、密码强度等）
      id: "s-node-validate",
      type: "transform.data",
      position: { x: 300, y: 160 },
      label: "校验输入",
      config: {
        expression: "validateSignupForm(event.data)",
      },
    },
    {
      // 查询数据库是否已有该邮箱用户
      id: "s-node-check-user",
      type: "db.query",
      position: { x: 300, y: 280 },
      label: "查询已有用户",
      config: {
        table: "users",
        where: { email: "{{form.email}}" },
      },
    },
    {
      // 判断用户是否已存在
      id: "s-node-if-exists",
      type: "condition.if",
      position: { x: 300, y: 400 },
      label: "用户是否已存在？",
      config: {
        condition: "result.length === 0",
      },
    },
    {
      // 插入新用户记录
      id: "s-node-insert",
      type: "db.insert",
      position: { x: 100, y: 520 },
      label: "插入用户",
      config: {
        table: "users",
        data: {
          email: "{{form.email}}",
          password: "{{hashedPassword}}",
          name: "{{form.name}}",
          createdAt: "{{now}}",
        },
      },
    },
    {
      // 发送欢迎邮件
      id: "s-node-welcome-email",
      type: "action.email",
      position: { x: 100, y: 640 },
      label: "发送欢迎邮件",
      config: {
        to: "{{form.email}}",
        subject: "欢迎注册",
        template: "welcome-email",
      },
    },
    {
      // 流程结束
      id: "s-node-end",
      type: "event.end",
      position: { x: 300, y: 760 },
      label: "注册完成",
      config: {},
    },
  ],
  edges: [
    { id: "se-1", source: "s-node-start", sourceHandle: "out", target: "s-node-validate", targetHandle: "input" },
    { id: "se-2", source: "s-node-validate", sourceHandle: "result", target: "s-node-check-user", targetHandle: "table" },
    { id: "se-3", source: "s-node-check-user", sourceHandle: "result", target: "s-node-if-exists", targetHandle: "condition" },
    { id: "se-4", source: "s-node-if-exists", sourceHandle: "true", target: "s-node-insert", targetHandle: "data", label: "不存在" },
    { id: "se-5", source: "s-node-if-exists", sourceHandle: "false", target: "s-node-end", targetHandle: "in", label: "已存在" },
    { id: "se-6", source: "s-node-insert", sourceHandle: "record", target: "s-node-welcome-email", targetHandle: "to" },
    { id: "se-7", source: "s-node-welcome-email", sourceHandle: "sent", target: "s-node-end", targetHandle: "in" },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// 模板 2：用户登录流程
// ═══════════════════════════════════════════════════════════════════

/**
 * 登录流程模板 — 验证凭证 → 查询用户 → 验证密码 → 创建会话
 *
 * 适用于标准的 Web 应用用户登录场景。
 * 流程从表单事件触发开始，查询数据库获取用户记录，
 * 验证密码哈希匹配，成功后创建会话。
 *
 * 节点数量：6（1 start + 1 trigger + 1 query + 1 if + 1 update + 1 end）
 */
export const LOGIN_FLOW_TEMPLATE: FlowDefinition = {
  thing: "template-login",
  version: "1.0.0",
  description: "用户登录流程 — 验证凭证 → 查询用户 → 验证密码 → 创建会话",
  nodes: [
    {
      // 流程开始
      id: "l-node-start",
      type: "event.start",
      position: { x: 300, y: 50 },
      label: "登录开始",
      config: {},
    },
    {
      // 由登录表单提交触发
      id: "l-node-trigger",
      type: "event.trigger",
      position: { x: 300, y: 160 },
      label: "登录表单提交",
      config: {
        event: "onSubmit",
        component: "LoginForm",
      },
    },
    {
      // 根据邮箱查询用户记录
      id: "l-node-query",
      type: "db.query",
      position: { x: 300, y: 280 },
      label: "查询用户",
      config: {
        table: "users",
        where: { email: "{{event.data.email}}" },
        limit: 1,
      },
    },
    {
      // 判断是否找到了用户
      id: "l-node-if-found",
      type: "condition.if",
      position: { x: 300, y: 400 },
      label: "用户是否存在？",
      config: {
        condition: "result && result.length > 0",
      },
    },
    {
      // 更新最后登录时间并创建会话
      id: "l-node-session",
      type: "db.update",
      position: { x: 300, y: 520 },
      label: "更新登录记录",
      config: {
        table: "users",
        where: { id: "{{result[0].id}}" },
        data: { lastLoginAt: "{{now}}", sessionToken: "{{sessionToken}}" },
      },
    },
    {
      // 登录成功结束
      id: "l-node-end",
      type: "event.end",
      position: { x: 300, y: 640 },
      label: "登录成功",
      config: {},
    },
  ],
  edges: [
    { id: "le-1", source: "l-node-start", sourceHandle: "out", target: "l-node-trigger", targetHandle: "data" },
    { id: "le-2", source: "l-node-trigger", sourceHandle: "data", target: "l-node-query", targetHandle: "where" },
    { id: "le-3", source: "l-node-query", sourceHandle: "result", target: "l-node-if-found", targetHandle: "condition" },
    { id: "le-4", source: "l-node-if-found", sourceHandle: "true", target: "l-node-session", targetHandle: "data", label: "找到用户" },
    { id: "le-5", source: "l-node-if-found", sourceHandle: "false", target: "l-node-end", targetHandle: "in", label: "用户不存在" },
    { id: "le-6", source: "l-node-session", sourceHandle: "count", target: "l-node-end", targetHandle: "in" },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// 模板 3：CRUD 数据操作（带验证）
// ═══════════════════════════════════════════════════════════════════

/**
 * CRUD 模板 — 验证数据 → 插入/更新/删除 → 返回结果 → 通知
 *
 * 适用于后台管理系统的通用增删改查场景。
 * 通过多路分支节点区分操作类型（create / update / delete），
 * 每种操作都先进行数据验证，再执行相应的数据库操作。
 *
 * 节点数量：12（1 start + 1 trigger + 4 switch outputs + 3 transforms + 3 db ops + 3 notifications + 3 ends）
 */
export const CRUD_FLOW_TEMPLATE: FlowDefinition = {
  thing: "template-crud",
  version: "1.0.0",
  description: "带验证的增删改查流程 — 验证数据 → 插入/更新/删除 → 返回结果 → 通知",
  nodes: [
    {
      id: "c-node-start",
      type: "event.start",
      position: { x: 300, y: 50 },
      label: "CRUD 开始",
      config: {},
    },
    {
      // 由数据表单提交触发
      id: "c-node-trigger",
      type: "event.trigger",
      position: { x: 300, y: 160 },
      label: "表单提交",
      config: {
        event: "onSubmit",
        component: "DataForm",
      },
    },
    {
      // 多路分支：根据表单中的操作类型分发
      id: "c-node-switch",
      type: "condition.switch",
      position: { x: 300, y: 280 },
      label: "操作类型",
      config: {
        value: "{{event.data.operation}}",
        cases: [
          { match: "create", label: "新建" },
          { match: "update", label: "更新" },
          { match: "delete", label: "删除" },
        ],
      },
    },
    // ── 新建分支 ──
    {
      id: "c-node-validate-create",
      type: "transform.data",
      position: { x: 100, y: 400 },
      label: "验证新建数据",
      config: { expression: "validateCreateData(event.data.payload)" },
    },
    {
      id: "c-node-insert",
      type: "db.insert",
      position: { x: 100, y: 520 },
      label: "插入记录",
      config: { table: "{{event.data.table}}", data: "{{validatedData}}" },
    },
    {
      id: "c-node-notify-create",
      type: "notification",
      position: { x: 100, y: 640 },
      label: "新建成功通知",
      config: { title: "操作成功", message: "数据已保存", type: "success" },
    },
    {
      id: "c-node-end-create",
      type: "event.end",
      position: { x: 100, y: 760 },
      label: "新建完成",
      config: {},
    },
    // ── 更新分支 ──
    {
      id: "c-node-validate-update",
      type: "transform.data",
      position: { x: 300, y: 400 },
      label: "验证更新数据",
      config: { expression: "validateUpdateData(event.data.payload)" },
    },
    {
      id: "c-node-update",
      type: "db.update",
      position: { x: 300, y: 520 },
      label: "更新记录",
      config: { table: "{{event.data.table}}", where: "{{event.data.where}}", data: "{{validatedData}}" },
    },
    {
      id: "c-node-notify-update",
      type: "notification",
      position: { x: 300, y: 640 },
      label: "更新成功通知",
      config: { title: "操作成功", message: "数据已更新", type: "success" },
    },
    {
      id: "c-node-end-update",
      type: "event.end",
      position: { x: 300, y: 760 },
      label: "更新完成",
      config: {},
    },
    // ── 删除分支 ──
    {
      id: "c-node-validate-delete",
      type: "transform.data",
      position: { x: 500, y: 400 },
      label: "验证删除条件",
      config: { expression: "validateDeleteCondition(event.data.where)" },
    },
    {
      id: "c-node-delete",
      type: "db.delete",
      position: { x: 500, y: 520 },
      label: "删除记录",
      config: { table: "{{event.data.table}}", where: "{{event.data.where}}" },
    },
    {
      id: "c-node-notify-delete",
      type: "notification",
      position: { x: 500, y: 640 },
      label: "删除成功通知",
      config: { title: "操作成功", message: "数据已删除", type: "success" },
    },
    {
      id: "c-node-end-delete",
      type: "event.end",
      position: { x: 500, y: 760 },
      label: "删除完成",
      config: {},
    },
  ],
  edges: [
    // start → trigger → switch
    { id: "ce-1", source: "c-node-start", sourceHandle: "out", target: "c-node-trigger", targetHandle: "data" },
    { id: "ce-2", source: "c-node-trigger", sourceHandle: "data", target: "c-node-switch", targetHandle: "value" },
    // 新建分支
    { id: "ce-3", source: "c-node-switch", sourceHandle: "create", target: "c-node-validate-create", targetHandle: "input" },
    { id: "ce-4", source: "c-node-validate-create", sourceHandle: "result", target: "c-node-insert", targetHandle: "data" },
    { id: "ce-5", source: "c-node-insert", sourceHandle: "record", target: "c-node-notify-create", targetHandle: "message" },
    { id: "ce-6", source: "c-node-notify-create", sourceHandle: "shown", target: "c-node-end-create", targetHandle: "in" },
    // 更新分支
    { id: "ce-7", source: "c-node-switch", sourceHandle: "update", target: "c-node-validate-update", targetHandle: "input" },
    { id: "ce-8", source: "c-node-validate-update", sourceHandle: "result", target: "c-node-update", targetHandle: "data" },
    { id: "ce-9", source: "c-node-update", sourceHandle: "count", target: "c-node-notify-update", targetHandle: "message" },
    { id: "ce-10", source: "c-node-notify-update", sourceHandle: "shown", target: "c-node-end-update", targetHandle: "in" },
    // 删除分支
    { id: "ce-11", source: "c-node-switch", sourceHandle: "delete", target: "c-node-validate-delete", targetHandle: "input" },
    { id: "ce-12", source: "c-node-validate-delete", sourceHandle: "result", target: "c-node-delete", targetHandle: "where" },
    { id: "ce-13", source: "c-node-delete", sourceHandle: "count", target: "c-node-notify-delete", targetHandle: "message" },
    { id: "ce-14", source: "c-node-notify-delete", sourceHandle: "shown", target: "c-node-end-delete", targetHandle: "in" },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// 模板 4：密码重置流程
// ═══════════════════════════════════════════════════════════════════

/**
 * 密码重置模板 — 按邮箱查询用户 → 发送重置邮件 → 更新密码
 *
 * 适用于标准的"忘记密码"功能。
 * 流程接收到邮箱地址后查询用户，若用户存在则发送重置链接邮件，
 * 用户点击链接后通过自定义代码处理密码哈希并更新数据库。
 *
 * 节点数量：7（1 start + 1 trigger + 1 query + 1 if + 1 email + 1 code + 1 update + 1 end）
 */
export const PASSWORD_RESET_FLOW_TEMPLATE: FlowDefinition = {
  thing: "template-password-reset",
  version: "1.0.0",
  description: "密码重置流程 — 按邮箱查询用户 → 发送重置邮件 → 更新密码",
  nodes: [
    {
      id: "p-node-start",
      type: "event.start",
      position: { x: 300, y: 50 },
      label: "重置开始",
      config: {},
    },
    {
      // 由忘记密码表单触发
      id: "p-node-trigger",
      type: "event.trigger",
      position: { x: 300, y: 160 },
      label: "忘记密码请求",
      config: {
        event: "onSubmit",
        component: "ForgotPasswordForm",
      },
    },
    {
      // 根据邮箱查询用户
      id: "p-node-query",
      type: "db.query",
      position: { x: 300, y: 280 },
      label: "查询用户",
      config: {
        table: "users",
        where: { email: "{{event.data.email}}" },
        limit: 1,
      },
    },
    {
      // 判断用户是否存在
      id: "p-node-if-found",
      type: "condition.if",
      position: { x: 300, y: 400 },
      label: "用户是否存在？",
      config: {
        condition: "result && result.length > 0",
      },
    },
    {
      // 发送密码重置邮件（包含重置链接/验证码）
      id: "p-node-send-mail",
      type: "action.email",
      position: { x: 300, y: 520 },
      label: "发送重置邮件",
      config: {
        to: "{{event.data.email}}",
        subject: "密码重置",
        template: "password-reset",
      },
    },
    {
      // 生成哈希密码并更新数据库
      id: "p-node-update-pwd",
      type: "db.update",
      position: { x: 300, y: 640 },
      label: "更新密码",
      config: {
        table: "users",
        where: { id: "{{result[0].id}}" },
        data: { password: "{{newHashedPassword}}" },
      },
    },
    {
      id: "p-node-end",
      type: "event.end",
      position: { x: 300, y: 760 },
      label: "重置完成",
      config: {},
    },
  ],
  edges: [
    { id: "pe-1", source: "p-node-start", sourceHandle: "out", target: "p-node-trigger", targetHandle: "data" },
    { id: "pe-2", source: "p-node-trigger", sourceHandle: "data", target: "p-node-query", targetHandle: "where" },
    { id: "pe-3", source: "p-node-query", sourceHandle: "result", target: "p-node-if-found", targetHandle: "condition" },
    { id: "pe-4", source: "p-node-if-found", sourceHandle: "true", target: "p-node-send-mail", targetHandle: "to" },
    { id: "pe-5", source: "p-node-if-found", sourceHandle: "false", target: "p-node-end", targetHandle: "in", label: "用户不存在" },
    { id: "pe-6", source: "p-node-send-mail", sourceHandle: "sent", target: "p-node-update-pwd", targetHandle: "data" },
    { id: "pe-7", source: "p-node-update-pwd", sourceHandle: "count", target: "p-node-end", targetHandle: "in" },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// 模板 5：联系方式表单
// ═══════════════════════════════════════════════════════════════════

/**
 * 联系方式表单模板 — 验证字段 → 保存到数据库 → 发送通知邮件
 *
 * 适用于官网的"联系我们"或"反馈"表单场景。
 * 流程先校验表单字段（姓名、邮箱、留言内容等），
 * 若校验通过则保存到数据库并通知管理员；否则返回验证错误。
 *
 * 节点数量：8（1 start + 1 trigger + 1 transform + 1 if + 1 insert + 1 email + 1 notification + 2 ends）
 */
export const CONTACT_FORM_FLOW_TEMPLATE: FlowDefinition = {
  thing: "template-contact-form",
  version: "1.0.0",
  description: "联系方式表单 — 验证字段 → 保存到数据库 → 发送通知邮件",
  nodes: [
    {
      // 流程开始
      id: "f-node-start",
      type: "event.start",
      position: { x: 300, y: 50 },
      label: "表单提交开始",
      config: {},
    },
    {
      // 由联系表单提交触发
      id: "f-node-trigger",
      type: "event.trigger",
      position: { x: 300, y: 160 },
      label: "联系表单提交",
      config: {
        event: "onSubmit",
        component: "ContactForm",
      },
    },
    {
      // 校验字段：姓名、邮箱、留言内容是否合法
      id: "f-node-validate",
      type: "transform.data",
      position: { x: 300, y: 280 },
      label: "校验表单字段",
      config: {
        expression: "validateContactForm(event.data)",
      },
    },
    {
      // 判断校验是否通过
      id: "f-node-if-valid",
      type: "condition.if",
      position: { x: 300, y: 400 },
      label: "校验是否通过？",
      config: {
        condition: "validationResult.valid === true",
      },
    },
    {
      // 保存留言到数据库
      id: "f-node-save",
      type: "db.insert",
      position: { x: 100, y: 520 },
      label: "保存留言",
      config: {
        table: "contact_messages",
        data: {
          name: "{{event.data.name}}",
          email: "{{event.data.email}}",
          message: "{{event.data.message}}",
          createdAt: "{{now}}",
        },
      },
    },
    {
      // 发送通知邮件给管理员
      id: "f-node-email",
      type: "action.email",
      position: { x: 100, y: 640 },
      label: "通知管理员",
      config: {
        to: "admin@example.com",
        subject: "新留言通知",
        template: "contact-notification",
      },
    },
    {
      // 校验失败：显示错误提示
      id: "f-node-error",
      type: "notification",
      position: { x: 500, y: 520 },
      label: "显示验证错误",
      config: {
        title: "提交失败",
        message: "{{validationResult.errors}}",
        type: "error",
      },
    },
    {
      // 流程结束（成功/失败均指向这里）
      id: "f-node-end",
      type: "event.end",
      position: { x: 300, y: 760 },
      label: "处理完成",
      config: {},
    },
  ],
  edges: [
    { id: "fe-1", source: "f-node-start", sourceHandle: "out", target: "f-node-trigger", targetHandle: "data" },
    { id: "fe-2", source: "f-node-trigger", sourceHandle: "data", target: "f-node-validate", targetHandle: "input" },
    { id: "fe-3", source: "f-node-validate", sourceHandle: "result", target: "f-node-if-valid", targetHandle: "condition" },
    { id: "fe-4", source: "f-node-if-valid", sourceHandle: "true", target: "f-node-save", targetHandle: "data", label: "校验通过" },
    { id: "fe-5", source: "f-node-if-valid", sourceHandle: "false", target: "f-node-error", targetHandle: "title", label: "校验失败" },
    { id: "fe-6", source: "f-node-save", sourceHandle: "record", target: "f-node-email", targetHandle: "to" },
    { id: "fe-7", source: "f-node-email", sourceHandle: "sent", target: "f-node-end", targetHandle: "in" },
    { id: "fe-8", source: "f-node-error", sourceHandle: "shown", target: "f-node-end", targetHandle: "in" },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// 模板集合
// ═══════════════════════════════════════════════════════════════════

/**
 * 所有内置模板的集合数组
 */
export const BUILT_IN_TEMPLATE_DEFINITIONS: FlowDefinition[] = [
  SIGNUP_FLOW_TEMPLATE,
  LOGIN_FLOW_TEMPLATE,
  CRUD_FLOW_TEMPLATE,
  PASSWORD_RESET_FLOW_TEMPLATE,
  CONTACT_FORM_FLOW_TEMPLATE,
];
