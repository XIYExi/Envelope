import type { GenerateProjectInput } from "../../../src/generate";

/**
 * 参考项目：Dashboard
 *
 * 目标：
 * - 覆盖认证文件生成（middleware / login 等）
 * - 覆盖事件绑定触发 use client + callFlow 引入
 * - 覆盖 flow runtime 的按需注入（needsFlowRuntime）
 */
export const dashboardProjectFixture = {
  projectName: "ref-dashboard",
  project: {
    version: "3.0.0",
    theme: {
      primaryColor: "#16a34a",
      fontFamily: "Inter, sans-serif",
      borderRadius: "0.5rem",
    },
    seo: {
      titleTemplate: "%s | Envelope Dashboard",
      defaultDescription: "一个用于验证认证/流程/页面生成联动的 Dashboard 参考项目",
      siteUrl: "https://example.com/dashboard",
    },
  },
  auth: {
    version: "3.0.0",
    providers: [
      { name: "email", enabled: true, config: {} },
      {
        name: "github",
        enabled: true,
        config: {
          client_id: "PLACEHOLDER_CLIENT_ID",
        },
      },
    ],
    redirectUrls: {
      afterLogin: "/dashboard",
      afterLogout: "/login",
      afterSignup: "/dashboard",
    },
    session: {
      duration: 3600,
      refreshTokenRotation: true,
    },
  },
  routes: {
    version: "3.0.0",
    routes: [
      {
        id: "root",
        path: "/",
        pageId: "/",
        metadata: { title: "入口", description: "Dashboard 入口页" },
        children: [
          {
            id: "dashboard",
            path: "dashboard",
            pageId: "/dashboard",
            authRequired: true,
            metadata: { title: "仪表盘", description: "核心看板" },
            children: [
              {
                id: "users",
                path: "users",
                pageId: "/dashboard/users",
                authRequired: true,
                metadata: { title: "用户", description: "用户管理页" },
              },
            ],
          },
          {
            id: "settings",
            path: "settings",
            pageId: "/settings",
            authRequired: true,
            metadata: { title: "设置", description: "个人设置" },
          },
        ],
      },
    ],
  },
  flows: [
    {
      id: "flow-refresh-users",
      name: "RefreshUsers",
      yaml_content: "",
      description: "示例流程：用于演示事件绑定触发 flow runtime",
    },
  ],
  pages: [
    {
      version: "3.0.0",
      title: "入口",
      description: "作为参考项目的根页面（通常用于跳转/介绍）",
      path: "/",
      padding: 24,
      components: [
        {
          id: "entry-container",
          type: "Container",
          category: "layout",
          tailwindClasses: "container mx-auto p-6 space-y-4",
          children: [
            {
              id: "entry-card",
              type: "Card",
              category: "layout",
              children: [
                {
                  id: "entry-card-header",
                  type: "CardHeader",
                  category: "layout",
                  props: {
                    title: "Dashboard 入口",
                    description: "该页面用于 snapshot 测试（dashboard）",
                  },
                },
                {
                  id: "entry-card-content",
                  type: "CardContent",
                  category: "layout",
                  children: [
                    {
                      id: "entry-link",
                      type: "Link",
                      category: "navigation",
                      props: { href: "/dashboard", text: "进入仪表盘 →" },
                      tailwindClasses: "text-primary underline",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      version: "3.0.0",
      title: "仪表盘",
      description: "包含事件绑定的页面，用于触发 use client 代码路径",
      path: "/dashboard",
      padding: 24,
      components: [
        {
          id: "dash-container",
          type: "Container",
          category: "layout",
          tailwindClasses: "container mx-auto p-6 space-y-4",
          children: [
            {
              id: "dash-card",
              type: "Card",
              category: "layout",
              children: [
                {
                  id: "dash-card-header",
                  type: "CardHeader",
                  category: "layout",
                  props: { title: "仪表盘", description: "包含按钮事件绑定（onClick → flow）" },
                },
                {
                  id: "dash-card-footer",
                  type: "CardFooter",
                  category: "layout",
                  children: [
                    {
                      id: "dash-refresh-button",
                      type: "Button",
                      category: "form",
                      props: { text: "刷新用户数据", variant: "default" },
                      eventBindings: {
                        onClick: "flow-refresh-users",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      version: "3.0.0",
      title: "用户管理",
      description: "用于验证多级路由目录生成与页面覆盖行为",
      path: "/dashboard/users",
      padding: 24,
      components: [
        {
          id: "users-container",
          type: "Container",
          category: "layout",
          tailwindClasses: "container mx-auto p-6 space-y-4",
          children: [
            {
              id: "users-card",
              type: "Card",
              category: "layout",
              children: [
                {
                  id: "users-card-header",
                  type: "CardHeader",
                  category: "layout",
                  props: { title: "用户", description: "表格组件用于验证导入映射" },
                },
                {
                  id: "users-card-content",
                  type: "CardContent",
                  category: "layout",
                  children: [
                    {
                      id: "users-table",
                      type: "DataTable",
                      category: "data",
                      props: {
                        columns: [
                          { key: "email", header: "Email" },
                          { key: "role", header: "Role" },
                        ],
                        data: [
                          { email: "alice@example.com", role: "admin" },
                          { email: "bob@example.com", role: "user" },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      version: "3.0.0",
      title: "设置",
      description: "个人设置页（简单内容）",
      path: "/settings",
      padding: 24,
      components: [
        {
          id: "settings-container",
          type: "Container",
          category: "layout",
          tailwindClasses: "container mx-auto p-6 space-y-4",
          children: [
            {
              id: "settings-card",
              type: "Card",
              category: "layout",
              children: [
                {
                  id: "settings-card-header",
                  type: "CardHeader",
                  category: "layout",
                  props: { title: "设置", description: "用于验证多页面输出稳定性" },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} satisfies GenerateProjectInput;

