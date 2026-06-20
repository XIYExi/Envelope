/**
 * 项目基础文件生成器
 *
 * 根据 ProjectConfig 生成完整的 Next.js 项目脚手架：
 * - package.json — 依赖配置
 * - next.config.js — Next.js 配置
 * - tailwind.config.ts — Tailwind CSS 配置 + 主题色
 * - postcss.config.js — PostCSS 配置
 * - tsconfig.json — TypeScript 配置
 * - components.json — shadcn/ui 配置
 * - lib/utils.ts — cn 工具函数
 * - app/globals.css — 全局样式 + CSS 变量
 * - app/layout.tsx — 根布局
 * - Dockerfile — 多阶段构建
 * - README.md — 项目说明
 * - .env.example — 环境变量模板
 * - .gitignore — Git 忽略规则
 *
 * @author xiye
 * @date 2026-06-14
 */
import type { ProjectConfig } from "@envelope/engine";
import type { VirtualFile } from "../core/file-system";
import { tsStringLiteral } from "../core/tsx-escape";

/**
 * 生成 package.json
 */
function generatePackageJson(config: ProjectConfig): string {
  const pkg = {
    name: "envelope-app",
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
    dependencies: {
      next: "^14.2.0",
      react: "^18.3.0",
      "react-dom": "^18.3.0",
      "@supabase/supabase-js": "^2.45.0",
      "@supabase/ssr": "^0.5.0",
      "@tanstack/react-query": "^5.59.0",
      zustand: "^5.0.0",
      "lucide-react": "^0.447.0",
      "@radix-ui/react-slot": "^1.1.0",
      "class-variance-authority": "^0.7.0",
      clsx: "^2.1.0",
      "tailwind-merge": "^2.5.0",
      "@radix-ui/react-dialog": "^1.1.0",
      "@radix-ui/react-dropdown-menu": "^2.1.0",
      "@radix-ui/react-label": "^2.1.0",
      "@radix-ui/react-select": "^2.1.0",
      "@radix-ui/react-separator": "^1.1.0",
      "@radix-ui/react-tabs": "^1.1.0",
      "@radix-ui/react-toast": "^1.2.0",
      "@radix-ui/react-tooltip": "^1.1.0",
      "@radix-ui/react-avatar": "^1.1.0",
      "@radix-ui/react-checkbox": "^1.1.0",
      "@radix-ui/react-switch": "^1.1.0",
      "@radix-ui/react-popover": "^1.1.0",
    },
    devDependencies: {
      typescript: "^5.5.0",
      "@types/node": "^22.0.0",
      "@types/react": "^18.3.0",
      "@types/react-dom": "^18.3.0",
      tailwindcss: "^3.4.0",
      postcss: "^8.4.0",
      autoprefixer: "^10.4.0",
      eslint: "^8.57.0",
      "eslint-config-next": "^14.2.0",
    },
  };

  return JSON.stringify(pkg, null, 2) + "\n";
}

/**
 * 生成 next.config.js
 */
function generateNextConfig(config: ProjectConfig): string {
  const siteUrl = config.seo?.siteUrl ?? "";
  let domain = "";
  try {
    domain = new URL(siteUrl).hostname;
  } catch {
    domain = "";
  }

  return [
    `/** @type {import('next').NextConfig} */`,
    `const nextConfig = {`,
    `  output: "standalone",`,
    `  images: {`,
    `    remotePatterns: [`,
    `      {`,
    `        protocol: "https",`,
    `        hostname: "**",`,
    `      },`,
    `    ],`,
    `  },`,
    `  experimental: {`,
    `    serverActions: {`,
    `      bodySizeLimit: "2mb",`,
    `    },`,
    `  },`,
    `};`,
    ``,
    `module.exports = nextConfig;`,
    ``
  ].join("\n");
}

/**
 * 生成 tailwind.config.ts
 */
function generateTailwindConfig(config: ProjectConfig): string {
  const primaryColor = config.theme?.primaryColor ?? "#3b82f6";
  const borderRadius = config.theme?.borderRadius ?? "0.5rem";
  const fontFamily = config.theme?.fontFamily ?? "Inter, sans-serif";

  return [
    `import type { Config } from "tailwindcss";`,
    ``,
    `const tailwindConfig: Config = {`,
    `  content: [`,
    `    "./app/**/*.{js,ts,jsx,tsx,mdx}",`,
    `    "./components/**/*.{js,ts,jsx,tsx,mdx}",`,
    `    "./lib/**/*.{js,ts,jsx,tsx,mdx}",`,
    `  ],`,
    `  theme: {`,
    `    extend: {`,
    `      colors: {`,
    `        border: "hsl(var(--border))",`,
    `        input: "hsl(var(--input))",`,
    `        ring: "hsl(var(--ring))",`,
    `        background: "hsl(var(--background))",`,
    `        foreground: "hsl(var(--foreground))",`,
    `        primary: {`,
    `          DEFAULT: "hsl(var(--primary))",`,
    `          foreground: "hsl(var(--primary-foreground))",`,
    `        },`,
    `        secondary: {`,
    `          DEFAULT: "hsl(var(--secondary))",`,
    `          foreground: "hsl(var(--secondary-foreground))",`,
    `        },`,
    `        destructive: {`,
    `          DEFAULT: "hsl(var(--destructive))",`,
    `          foreground: "hsl(var(--destructive-foreground))",`,
    `        },`,
    `        muted: {`,
    `          DEFAULT: "hsl(var(--muted))",`,
    `          foreground: "hsl(var(--muted-foreground))",`,
    `        },`,
    `        accent: {`,
    `          DEFAULT: "hsl(var(--accent))",`,
    `          foreground: "hsl(var(--accent-foreground))",`,
    `        },`,
    `        card: {`,
    `          DEFAULT: "hsl(var(--card))",`,
    `          foreground: "hsl(var(--card-foreground))",`,
    `        },`,
    `        popover: {`,
    `          DEFAULT: "hsl(var(--popover))",`,
    `          foreground: "hsl(var(--popover-foreground))",`,
    `        },`,
    `      },`,
    `      borderRadius: {`,
    `        lg: "var(--radius)",`,
    `        md: "calc(var(--radius) - 2px)",`,
    `        sm: "calc(var(--radius) - 4px)",`,
    `      },`,
    `      fontFamily: {`,
    `        sans: [${tsStringLiteral(fontFamily)}, "system-ui", "sans-serif"],`,
    `      },`,
    `    },`,
    `  },`,
    `  plugins: [],`,
    `};`,
    ``,
    `export default tailwindConfig;`,
    ``
  ].join("\n");
}

/**
 * 生成 postcss.config.js
 */
function generatePostcssConfig(): string {
  return [
    `module.exports = {`,
    `  plugins: {`,
    `    tailwindcss: {},`,
    `    autoprefixer: {},`,
    `  },`,
    `};`,
    ``
  ].join("\n");
}

/**
 * 生成 tsconfig.json
 */
function generateTsConfig(): string {
  const tsconfig = {
    compilerOptions: {
      target: "ES2022",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [
        {
          name: "next",
        },
      ],
      paths: {
        "@/*": ["./*"],
      },
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"],
  };

  return JSON.stringify(tsconfig, null, 2) + "\n";
}

/**
 * 生成 components.json（shadcn/ui 配置）
 */
function generateComponentsJson(config: ProjectConfig): string {
  return JSON.stringify({
    $schema: "https://ui.shadcn.com/schema.json",
    style: "default",
    rsc: true,
    tsx: true,
    tailwind: {
      config: "tailwind.config.ts",
      css: "app/globals.css",
      baseColor: "slate",
      cssVariables: true,
      prefix: "",
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks",
    },
  }, null, 2) + "\n";
}

/**
 * 生成 lib/utils.ts（cn 工具函数）
 */
function generateUtilsTs(): string {
  return [
    `import { clsx, type ClassValue } from "clsx";`,
    `import { twMerge } from "tailwind-merge";`,
    ``,
    `export function cn(...inputs: ClassValue[]) {`,
    `  return twMerge(clsx(inputs));`,
    `}`,
    ``
  ].join("\n");
}

/**
 * 将 HEX 颜色转换为 HSL 值字符串
 * 简化实现：直接使用 CSS 变量引用
 */
function hexToHslString(hex: string): { h: string; s: string; l: string } {
  // 验证 HEX 格式
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
    hex = "#3b82f6";
  }
  // 移除 # 前缀
  const clean = hex.replace("#", "");

  // 解析 RGB
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360).toString(),
    s: Math.round(s * 100).toString() + "%",
    l: Math.round(l * 100).toString() + "%",
  };
}

/**
 * 生成 app/globals.css
 */
function generateGlobalsCss(config: ProjectConfig): string {
  const primaryColor = config.theme?.primaryColor ?? "#3b82f6";
  const hslColor = hexToHslString(primaryColor);
  const borderRadius = config.theme?.borderRadius ?? "0.5rem";

  const lines: string[] = [];

  lines.push("@tailwind base;");
  lines.push("@tailwind components;");
  lines.push("@tailwind utilities;");
  lines.push("");

  lines.push("@layer base {");
  lines.push("  :root {");
  lines.push("    --background: 0 0% 100%;");
  lines.push("    --foreground: 222.2 84% 4.9%;");
  lines.push("    --card: 0 0% 100%;");
  lines.push("    --card-foreground: 222.2 84% 4.9%;");
  lines.push("    --popover: 0 0% 100%;");
  lines.push("    --popover-foreground: 222.2 84% 4.9%;");
  lines.push(`    --primary: ${hslColor.h} ${hslColor.s} ${hslColor.l};`);
  lines.push("    --primary-foreground: 210 40% 98%;");
  lines.push("    --secondary: 210 40% 96.1%;");
  lines.push("    --secondary-foreground: 222.2 47.4% 11.2%;");
  lines.push("    --muted: 210 40% 96.1%;");
  lines.push("    --muted-foreground: 215.4 16.3% 46.9%;");
  lines.push("    --accent: 210 40% 96.1%;");
  lines.push("    --accent-foreground: 222.2 47.4% 11.2%;");
  lines.push("    --destructive: 0 84.2% 60.2%;");
  lines.push("    --destructive-foreground: 210 40% 98%;");
  lines.push("    --border: 214.3 31.8% 91.4%;");
  lines.push("    --input: 214.3 31.8% 91.4%;");
  lines.push("    --ring: 222.2 84% 4.9%;");
  lines.push(`    --radius: ${borderRadius};`);
  lines.push("  }");
  lines.push("");
  lines.push("  .dark {");
  lines.push("    --background: 222.2 84% 4.9%;");
  lines.push("    --foreground: 210 40% 98%;");
  lines.push("    --card: 222.2 84% 4.9%;");
  lines.push("    --card-foreground: 210 40% 98%;");
  lines.push("    --popover: 222.2 84% 4.9%;");
  lines.push("    --popover-foreground: 210 40% 98%;");
  lines.push(`    --primary: ${hslColor.h} ${hslColor.s} ${hslColor.l};`);
  lines.push("    --primary-foreground: 222.2 47.4% 11.2%;");
  lines.push("    --secondary: 217.2 32.6% 17.5%;");
  lines.push("    --secondary-foreground: 210 40% 98%;");
  lines.push("    --muted: 217.2 32.6% 17.5%;");
  lines.push("    --muted-foreground: 215 20.2% 65.1%;");
  lines.push("    --accent: 217.2 32.6% 17.5%;");
  lines.push("    --accent-foreground: 210 40% 98%;");
  lines.push("    --destructive: 0 62.8% 30.6%;");
  lines.push("    --destructive-foreground: 210 40% 98%;");
  lines.push("    --border: 217.2 32.6% 17.5%;");
  lines.push("    --input: 217.2 32.6% 17.5%;");
  lines.push("    --ring: 212.7 26.8% 83.9%;");
  lines.push("  }");
  lines.push("}");
  lines.push("");
  lines.push("@layer base {");
  lines.push("  * {");
  lines.push("    @apply border-border;");
  lines.push("  }");
  lines.push("  body {");
  lines.push("    @apply bg-background text-foreground;");
  lines.push("  }");
  lines.push("}");
  lines.push("");

  return lines.join("\n");
}

/**
 * 生成 app/layout.tsx（根布局）
 */
function generateRootLayout(config: ProjectConfig): string {
  const titleTemplate = config.seo?.titleTemplate ?? "%s | Envelope App";
  const defaultDesc = config.seo?.defaultDescription ?? "Built with Envelope V3";
  const fontFamily = config.theme?.fontFamily ?? "Inter, sans-serif";

  return [
    `import type { Metadata } from "next";`,
    `import type { ReactNode } from "react";`,
    `import "./globals.css";`,
    ``,
    `export const metadata: Metadata = {`,
    `  title: {`,
    `    template: ${tsStringLiteral(titleTemplate)},`,
    `    default: "Envelope App",`,
    `  },`,
    `  description: ${tsStringLiteral(defaultDesc)},`,
    `};`,
    ``,
    `export default function RootLayout({`,
    `  children,`,
    `}: {`,
    `  children: ReactNode;`,
    `}) {`,
    `  return (`,
    `    <html lang="en" suppressHydrationWarning>`,
    `      <body`,
    `        className="min-h-screen bg-background font-sans antialiased"`,
    `        style={{ fontFamily: ${tsStringLiteral(fontFamily)} }}`,
    `      >`,
    `        {children}`,
    `      </body>`,
    `    </html>`,
    `  );`,
    `}`,
    ``
  ].join("\n");
}

/**
 * 生成 Dockerfile（多阶段构建）
 */
function generateDockerfile(): string {
  return [
    `# Stage 1: Dependencies`,
    `FROM node:20-alpine AS deps`,
    `RUN apk add --no-cache libc6-compat`,
    `WORKDIR /app`,
    ``,
    `COPY package.json package-lock.json* ./`,
    `RUN npm ci`,
    ``,
    `# Stage 2: Build`,
    `FROM node:20-alpine AS builder`,
    `WORKDIR /app`,
    `COPY --from=deps /app/node_modules ./node_modules`,
    `COPY . .`,
    ``,
    `ENV NEXT_TELEMETRY_DISABLED=1`,
    ``,
    `RUN npm run build`,
    ``,
    `# Stage 3: Production`,
    `FROM node:20-alpine AS runner`,
    `WORKDIR /app`,
    ``,
    `ENV NODE_ENV=production`,
    `ENV NEXT_TELEMETRY_DISABLED=1`,
    ``,
    `RUN addgroup --system --gid 1001 nodejs`,
    `RUN adduser --system --uid 1001 nextjs`,
    ``,
    `COPY --from=builder /app/public ./public`,
    ``,
    `RUN mkdir .next`,
    `RUN chown nextjs:nodejs .next`,
    ``,
    `COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./`,
    `COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static`,
    ``,
    `USER nextjs`,
    ``,
    `EXPOSE 3000`,
    ``,
    `ENV PORT=3000`,
    ``,
    `CMD ["node", "server.js"]`,
    ``
  ].join("\n");
}

/**
 * 生成 README.md
 */
function generateReadme(): string {
  return [
    `# Envelope App`,
    ``,
    `Built with **Envelope V3** — low-code Next.js application scaffold.`,
    ``,
    `## Tech Stack`,
    ``,
    `- **Framework**: Next.js 14 (App Router)`,
    `- **Database**: Supabase (PostgreSQL)`,
    `- **Styling**: Tailwind CSS + shadcn/ui`,
    `- **State**: Zustand`,
    `- **Data Fetching**: TanStack React Query`,
    ``,
    `## Getting Started`,
    ``,
    `1. Clone the repository`,
    `2. Copy \`.env.example\` to \`.env.local\` and fill in your Supabase credentials`,
    `3. Run \`npm install\``,
    `4. Run \`npm run dev\``,
    `5. Open [http://localhost:3000](http://localhost:3000)`,
    ``,
    `## Project Structure`,
    ``,
    `\`\`\``,
    `app/          — Next.js App Router pages and layouts`,
    `components/   — Reusable UI components (shadcn/ui)`,
    `lib/          — Utility functions, Supabase clients`,
    `types/        — TypeScript type definitions`,
    `supabase/     — Database migrations`,
    `public/       — Static assets`,
    `\`\`\``,
    ``,
    `## Environment Variables`,
    ``,
    `| Variable | Description |`,
    `|----------|-------------|`,
    `| \`NEXT_PUBLIC_SUPABASE_URL\` | Supabase project URL |`,
    `| \`NEXT_PUBLIC_SUPABASE_ANON_KEY\` | Supabase anonymous key |`,
    ``
  ].join("\n");
}

/**
 * 生成 .env.example
 */
function generateEnvExample(): string {
  return [
    `# Supabase`,
    `NEXT_PUBLIC_SUPABASE_URL=your-project-url`,
    `NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`,
    ``,
    `# App`,
    `NEXT_PUBLIC_SITE_URL=http://localhost:3000`,
    ``
  ].join("\n");
}

/**
 * 生成 .gitignore
 */
function generateGitignore(): string {
  return [
    `# Dependencies`,
    `node_modules/`,
    ``,
    `# Next.js`,
    `.next/`,
    `out/`,
    ``,
    `# Production`,
    `build/`,
    ``,
    `# Environment`,
    `.env`,
    `.env.local`,
    `.env*.local`,
    ``,
    `# Debug`,
    `npm-debug.log*`,
    `yarn-debug.log*`,
    `yarn-error.log*`,
    ``,
    `# TypeScript`,
    `*.tsbuildinfo`,
    `next-env.d.ts`,
    ``,
    `# IDE`,
    `.vscode/`,
    `.idea/`,
    ``,
    `# OS`,
    `.DS_Store`,
    `Thumbs.db`,
    ``
  ].join("\n");
}

/**
 * 生成项目基础文件
 *
 * 根据 ProjectConfig 生成完整的 Next.js 项目脚手架文件。
 * 包含依赖配置、框架配置、样式系统、Docker 部署等所有基础文件。
 *
 * @param config - 项目配置（主题、SEO、Supabase 连接）
 * @returns 生成的文件数组
 */
export function generateProjectFiles(config: ProjectConfig): VirtualFile[] {
  const files: VirtualFile[] = [];

  // 配置文件
  files.push({ path: "package.json", content: generatePackageJson(config) });
  files.push({ path: "next.config.js", content: generateNextConfig(config) });
  files.push({ path: "tailwind.config.ts", content: generateTailwindConfig(config) });
  files.push({ path: "postcss.config.js", content: generatePostcssConfig() });
  files.push({ path: "tsconfig.json", content: generateTsConfig() });
  files.push({ path: "components.json", content: generateComponentsJson(config) });

  // 源码文件
  files.push({ path: "lib/utils.ts", content: generateUtilsTs() });
  files.push({ path: "app/globals.css", content: generateGlobalsCss(config) });
  files.push({ path: "app/layout.tsx", content: generateRootLayout(config) });

  // 部署文件
  files.push({ path: "Dockerfile", content: generateDockerfile() });
  files.push({ path: "README.md", content: generateReadme() });
  files.push({ path: ".env.example", content: generateEnvExample() });
  files.push({ path: ".gitignore", content: generateGitignore() });

  return files;
}
