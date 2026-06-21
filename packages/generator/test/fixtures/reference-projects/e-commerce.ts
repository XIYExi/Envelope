import type { GenerateProjectInput } from "../../../src/generate";

/**
 * 参考项目：E-commerce
 *
 * 目标：
 * - 覆盖数据库迁移 + 类型生成
 * - 覆盖 endpoints → app/api/{path}/route.ts 的生成逻辑
 * - 覆盖 flow runtime + endpoint 组合输出
 */
export const ecommerceProjectFixture = {
  projectName: "ref-e-commerce",
  project: {
    version: "3.0.0",
    theme: {
      primaryColor: "#ea580c",
      fontFamily: "Inter, sans-serif",
      borderRadius: "0.75rem",
    },
    seo: {
      titleTemplate: "%s | Envelope Shop",
      defaultDescription: "一个用于验证 db/types/endpoints 生成的电商参考项目",
      siteUrl: "https://example.com/shop",
    },
  },
  routes: {
    version: "3.0.0",
    routes: [
      {
        id: "root",
        path: "/",
        pageId: "/",
        metadata: { title: "商店首页", description: "电商参考项目首页" },
        children: [
          { id: "products", path: "products", pageId: "/products", metadata: { title: "商品", description: "商品列表" } },
          { id: "cart", path: "cart", pageId: "/cart", metadata: { title: "购物车", description: "购物车页面" } },
          { id: "checkout", path: "checkout", pageId: "/checkout", metadata: { title: "结算", description: "结算页" } },
        ],
      },
    ],
  },
  dbSchema: {
    version: "3.0.0",
    enums: [
      { name: "order_status", values: ["pending", "paid", "cancelled"] },
    ],
    tables: [
      {
        name: "products",
        comment: "商品表（示例）",
        rlsEnabled: true,
        columns: [
          { name: "id", type: "uuid", isPrimary: true, nullable: false, comment: "主键" },
          { name: "title", type: "text", nullable: false, comment: "商品标题" },
          { name: "price", type: "numeric", nullable: false, defaultValue: "0", comment: "价格（示例）" },
          { name: "created_at", type: "timestamp", nullable: false, defaultValue: "now()", comment: "创建时间" },
        ],
        indexes: [
          { name: "idx_products_title", columns: ["title"], unique: false, type: "btree" },
        ],
        rlsPolicies: [],
      },
      {
        name: "orders",
        comment: "订单表（示例）",
        rlsEnabled: true,
        columns: [
          { name: "id", type: "uuid", isPrimary: true, nullable: false },
          { name: "status", type: "text", nullable: false, defaultValue: "'pending'::text" },
          { name: "created_at", type: "timestamp", nullable: false, defaultValue: "now()" },
        ],
        indexes: [],
        rlsPolicies: [],
      },
    ],
  },
  flows: [
    {
      id: "flow-checkout",
      name: "Checkout",
      yaml_content: "",
      description: "示例流程：用于验证 endpoints 调用 flow 的代码生成",
    },
  ],
  endpoints: [
    {
      id: "endpoint-checkout",
      method: "POST",
      path: "/api/checkout",
      flow_id: "flow-checkout",
    },
  ],
  pages: [
    {
      version: "3.0.0",
      title: "商店首页",
      description: "电商参考项目首页（含导航）",
      path: "/",
      padding: 24,
      components: [
        {
          id: "shop-home-container",
          type: "Container",
          category: "layout",
          tailwindClasses: "container mx-auto p-6 space-y-4",
          children: [
            {
              id: "shop-home-card",
              type: "Card",
              category: "layout",
              children: [
                {
                  id: "shop-home-header",
                  type: "CardHeader",
                  category: "layout",
                  props: { title: "Envelope Shop", description: "用于 snapshot 测试（e-commerce）" },
                },
                {
                  id: "shop-home-content",
                  type: "CardContent",
                  category: "layout",
                  children: [
                    {
                      id: "shop-home-products-link",
                      type: "Link",
                      category: "navigation",
                      props: { href: "/products", text: "浏览商品 →" },
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
      title: "商品列表",
      description: "商品列表页（示例）",
      path: "/products",
      padding: 24,
      components: [
        {
          id: "products-container",
          type: "Container",
          category: "layout",
          tailwindClasses: "container mx-auto p-6 space-y-4",
          children: [
            {
              id: "products-card",
              type: "Card",
              category: "layout",
              children: [
                {
                  id: "products-header",
                  type: "CardHeader",
                  category: "layout",
                  props: { title: "商品", description: "此处展示商品列表（示例数据）" },
                },
                {
                  id: "products-footer",
                  type: "CardFooter",
                  category: "layout",
                  children: [
                    {
                      id: "products-go-cart",
                      type: "Link",
                      category: "navigation",
                      props: { href: "/cart", text: "查看购物车 →" },
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
      title: "购物车",
      description: "购物车页（示例）",
      path: "/cart",
      padding: 24,
      components: [
        {
          id: "cart-container",
          type: "Container",
          category: "layout",
          tailwindClasses: "container mx-auto p-6 space-y-4",
          children: [
            {
              id: "cart-card",
              type: "Card",
              category: "layout",
              children: [
                {
                  id: "cart-header",
                  type: "CardHeader",
                  category: "layout",
                  props: { title: "购物车", description: "示例购物车页面" },
                },
                {
                  id: "cart-footer",
                  type: "CardFooter",
                  category: "layout",
                  children: [
                    {
                      id: "cart-checkout",
                      type: "Link",
                      category: "navigation",
                      props: { href: "/checkout", text: "去结算 →" },
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
      title: "结算",
      description: "结算页（示例）",
      path: "/checkout",
      padding: 24,
      components: [
        {
          id: "checkout-container",
          type: "Container",
          category: "layout",
          tailwindClasses: "container mx-auto p-6 space-y-4",
          children: [
            {
              id: "checkout-card",
              type: "Card",
              category: "layout",
              children: [
                {
                  id: "checkout-header",
                  type: "CardHeader",
                  category: "layout",
                  props: { title: "结算", description: "示例结算页（配合 /api/checkout endpoint）" },
                },
                {
                  id: "checkout-card-footer",
                  type: "CardFooter",
                  category: "layout",
                  children: [
                    {
                      id: "checkout-btn",
                      type: "Button",
                      category: "form",
                      props: { text: "提交订单", variant: "default" },
                      eventBindings: {
                        onClick: "flow-checkout",
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
  ],
} satisfies GenerateProjectInput;
