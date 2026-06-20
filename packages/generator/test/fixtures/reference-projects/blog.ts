import type { GenerateProjectInput } from "../../../src/generate";

/**
 * 参考项目：Blog
 *
 * 目标：
 * - 覆盖基础脚手架 + 路由文件 + 页面代码生成的组合行为
 * - 用固定的 id / path，避免快照受随机值影响
 */
export const blogProjectFixture = {
  projectName: "ref-blog",
  project: {
    version: "3.0.0",
    theme: {
      primaryColor: "#2563eb",
      fontFamily: "Inter, sans-serif",
      borderRadius: "0.75rem",
    },
    seo: {
      titleTemplate: "%s | Envelope Blog",
      defaultDescription: "一个用于验证生成器输出稳定性的 Blog 参考项目",
      siteUrl: "https://example.com/blog",
    },
  },
  routes: {
    version: "3.0.0",
    routes: [
      {
        id: "root",
        path: "/",
        pageId: "/",
        metadata: {
          title: "首页",
          description: "最新文章与站点介绍",
        },
        children: [
          {
            id: "posts",
            path: "posts",
            pageId: "/posts",
            metadata: {
              title: "文章列表",
              description: "所有文章的汇总页",
            },
            children: [
              {
                id: "post-detail",
                path: "[slug]",
                pageId: "/posts/[slug]",
                metadata: {
                  title: "文章详情",
                  description: "单篇文章的阅读页",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  pages: [
    {
      version: "3.0.0",
      title: "Envelope Blog",
      description: "欢迎来到示例 Blog，用于验证生成器快照输出。",
      path: "/",
      padding: 24,
      components: [
        {
          id: "blog-container",
          type: "Container",
          category: "layout",
          tailwindClasses: "container mx-auto p-6 space-y-6",
          comment: "页面根容器",
          children: [
            {
              id: "blog-hero",
              type: "Card",
              category: "layout",
              comment: "站点介绍卡片",
              children: [
                {
                  id: "blog-hero-header",
                  type: "CardHeader",
                  category: "layout",
                  props: {
                    title: "Envelope Blog",
                    description: "用于测试 generateProject 的参考项目（blog）",
                  },
                },
                {
                  id: "blog-hero-content",
                  type: "CardContent",
                  category: "layout",
                  children: [
                    {
                      id: "blog-hero-link",
                      type: "Link",
                      category: "navigation",
                      props: {
                        href: "/posts",
                        text: "进入文章列表 →",
                      },
                      tailwindClasses: "inline-block text-primary underline",
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
      title: "文章列表",
      description: "包含文章条目的列表页（静态示例）",
      path: "/posts",
      padding: 24,
      components: [
        {
          id: "posts-container",
          type: "Container",
          category: "layout",
          tailwindClasses: "container mx-auto p-6 space-y-4",
          children: [
            {
              id: "posts-card",
              type: "Card",
              category: "layout",
              children: [
                {
                  id: "posts-card-header",
                  type: "CardHeader",
                  category: "layout",
                  props: {
                    title: "文章列表",
                    description: "这里展示文章条目（示例内容）",
                  },
                },
                {
                  id: "posts-card-content",
                  type: "CardContent",
                  category: "layout",
                  children: [
                    {
                      id: "posts-entry-link",
                      type: "Link",
                      category: "navigation",
                      props: {
                        href: "/posts/hello-world",
                        text: "Hello World（示例文章）",
                      },
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
      title: "文章详情",
      description: "单篇文章详情页（动态路由示例）",
      path: "/posts/[slug]",
      padding: 24,
      components: [
        {
          id: "post-detail-container",
          type: "Container",
          category: "layout",
          tailwindClasses: "container mx-auto p-6 space-y-6",
          children: [
            {
              id: "post-detail-card",
              type: "Card",
              category: "layout",
              children: [
                {
                  id: "post-detail-header",
                  type: "CardHeader",
                  category: "layout",
                  props: {
                    title: "文章详情页",
                    description: "此页面由动态路由 /posts/[slug] 映射",
                  },
                },
                {
                  id: "post-detail-footer",
                  type: "CardFooter",
                  category: "layout",
                  children: [
                    {
                      id: "post-detail-back",
                      type: "Link",
                      category: "navigation",
                      props: {
                        href: "/posts",
                        text: "← 返回列表",
                      },
                      tailwindClasses: "text-muted-foreground hover:underline",
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

