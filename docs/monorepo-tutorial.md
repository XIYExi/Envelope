# 使用 pnpm + Turborepo 搭建 Monorepo 多包项目

> 从零开始，用 10 分钟搭建一个现代化的 Monorepo 工程。

## 什么是 Monorepo？

Monorepo（单一代码仓库）是一种将多个相关项目放在同一个 Git 仓库中的代码管理方式。

**传统方式（Multi-repo）：**

```
my-ui-lib/          ← 独立仓库
my-api/             ← 独立仓库
my-web-app/         ← 独立仓库
```

**Monorepo 方式：**

```
my-project/
├── packages/
│   ├── ui-lib/     ← UI 组件库
│   ├── api/        ← 后端服务
│   └── shared/     ← 公共工具
├── apps/
│   ├── web/        ← 前端应用
│   └── mobile/     ← 移动端应用
└── package.json
```

**优势：**

- 代码共享：`web` 直接引用 `ui-lib`，不需要发 npm 包
- 原子化提交：改了公共依赖，一次提交搞定
- 统一工具链：一套 lint、build、test 配置
- 依赖提升：公共依赖只安装一份，节省磁盘和时间

***

## 技术栈选择

| 工具             | 作用   | 为什么选它                             |
| -------------- | ---- | --------------------------------- |
| **pnpm**       | 包管理器 | 磁盘效率高（硬链接）、严格依赖隔离、原生 workspace 支持 |
| **Turborepo**  | 构建编排 | 并行构建、智能缓存、零配置上手                   |
| **TypeScript** | 类型系统 | 类型安全、IDE 支持好                      |

***

## 快速生成：用 CLI 脚手架一键搭建

手动创建文件太慢？这些工具可以一键生成整个 monorepo 结构：

### 方式一：create-turbo（官方推荐）

```bash
# 交互式创建，会问你用 npm/yarn/pnpm、是否用 TypeScript 等
pnpm create turbo

# 或者直接指定模板
pnpm create turbo my-monorepo --template with-tailwind
```

生成的结构：

```
my-monorepo/
├── apps/
│   └── web/           ← Next.js 应用（已配置好）
├── packages/
│   ├── ui/            ← 组件库（已配置好）
│   └── eslint-config/ ← 共享 ESLint 配置
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

### 方式二：create-tsup-library（组件库专用）

```bash
# 快速创建 TypeScript 组件库 + monorepo
pnpm create tsup-library my-lib
```

### 方式三：手动 + 脚本生成

如果想自己控制结构，可以用这个 shell 脚本快速生成子包：

```bash
#!/bin/bash
# scripts/create-package.sh
# 用法: bash scripts/create-package.sh packages/shared

PKG_PATH=$1
PKG_NAME=$(basename $PKG_PATH)
SCOPE="my-project"

mkdir -p $PKG_PATH/src

cat > $PKG_PATH/package.json << EOF
{
  "name": "@$SCOPE/$PKG_NAME",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "echo 'No build needed'",
    "clean": "echo 'No clean needed'"
  }
}
EOF

cat > $PKG_PATH/src/index.ts << EOF
export const $PKG_NAME = 'hello from $PKG_NAME';
EOF

cat > $PKG_PATH/tsconfig.json << EOF
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
EOF

echo "Created package: @my-project/$PKG_NAME at $PKG_PATH"
```

使用：

```bash
bash scripts/create-package.sh packages/utils
bash scripts/create-package.sh packages/ui
bash scripts/create-package.sh apps/web
```

### 方式对比

| 方式                    | 适合场景     | 自定义程度 | 速度 |
| --------------------- | -------- | ----- | -- |
| `create-turbo`        | 快速启动，学习用 | 低     | 最快 |
| `create-tsup-library` | 纯组件库     | 中     | 快  |
| 手动脚本                  | 完全控制结构   | 最高    | 中  |

***

## Step 1：初始化项目（手动方式）

```bash
# 创建项目目录
mkdir my-monorepo
cd my-monorepo

# 初始化 Git
git init

# 初始化 pnpm 项目
pnpm init
```

编辑根 `package.json`：

```json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "clean": "turbo clean"
  }
}
```

> **注意**：`"private": true` 是必须的，防止 monorepo 根目录被意外发布到 npm。

***

## Step 2：配置 pnpm Workspace

创建 `pnpm-workspace.yaml`：

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

这告诉 pnpm：`apps/` 和 `packages/` 下的每个子目录都是一个独立的 npm 包。

***

## Step 3：安装 Turborepo

```bash
pnpm add -Dw turbo
```

创建 `turbo.json`：

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "clean": {
      "cache": false
    }
  }
}
```

**关键配置解释：**

- `"dependsOn": ["^build"]` — 先 build 所有依赖包，再 build 当前包（`^` 表示依赖）
- `"outputs": ["dist/**"]` — 告诉 Turbo 哪些文件是构建产物，用于缓存判断
- `"persistent": true` — dev 是长驻进程（如 `next dev`），不会自动结束

***

## Step 4：创建子包

### 创建共享工具包

```bash
mkdir -p packages/shared/src
```

`packages/shared/package.json`：

```json
{
  "name": "@my-project/shared",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "echo 'No build needed'",
    "clean": "echo 'No clean needed'"
  }
}
```

`packages/shared/src/index.ts`：

```typescript
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN').format(date);
}
```

### 创建 UI 组件包

```bash
mkdir -p packages/ui/src
```

`packages/ui/package.json`：

```json
{
  "name": "@my-project/ui",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "@my-project/shared": "workspace:*"
  },
  "scripts": {
    "build": "echo 'No build needed'",
    "clean": "echo 'No clean needed'"
  }
}
```

> **`workspace:*`** 表示依赖同 monorepo 内的 `@my-project/shared` 包，版本自动跟随。

`packages/ui/src/Button.tsx`：

```tsx
import { formatCurrency } from '@my-project/shared';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}

export function PriceDisplay({ price }: { price: number }) {
  return <span>{formatCurrency(price)}</span>;
}
```

`packages/ui/src/index.ts`：

```typescript
export { Button, PriceDisplay } from './Button';
```

### 创建应用包

```bash
mkdir -p apps/web/src
```

`apps/web/package.json`：

```json
{
  "name": "@my-project/web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "echo 'dev server starting...'",
    "build": "echo 'building web app...'",
    "clean": "rm -rf dist node_modules"
  },
  "dependencies": {
    "@my-project/ui": "workspace:*",
    "@my-project/shared": "workspace:*"
  }
}
```

`apps/web/src/main.ts`：

```typescript
import { Button, PriceDisplay } from '@my-project/ui';
import { formatDate } from '@my-project/shared';

console.log('Web app started at:', formatDate(new Date()));

const submitBtn = new Button({
  label: 'Submit',
  onClick: () => console.log('Clicked!'),
});

console.log('Price:', new PriceDisplay({ price: 199.99 }));
```

***

## Step 5：安装依赖并验证

```bash
# 在根目录执行
pnpm install
```

验证 workspace 链接：

```bash
# 查看 pnpm 如何处理 workspace 依赖
pnpm ls --depth 0 -r
```

你会看到类似输出：

```
my-monorepo
@my-project/shared  1.0.0
@my-project/ui      1.0.0
@my-project/web     1.0.0
```

***

## Step 6：运行 Turborepo

```bash
# 并行 build 所有包
pnpm build

# 启动所有 dev 服务器
pnpm dev

# 运行 lint
pnpm lint
```

### 体验缓存

第一次运行 `pnpm build` 后，再运行一次：

```bash
pnpm build
# 第二次会显示类似：
#  Tasks: 3 successful, 3 total
# Cached: 3 active, 0 total
#  Time:  16ms  ← 几乎瞬间完成！
```

Turborepo 检测到文件没变化，直接使用缓存，跳过构建。

***

## Step 7：包之间的依赖关系

Turborepo 根据 `package.json` 中的 `dependencies` 自动推断构建顺序：

```
shared (无依赖)
   ↑
ui (依赖 shared)
   ↑
web (依赖 ui 和 shared)
```

执行 `turbo build` 时：

1. 先 build `shared`（无依赖）
2. 再 build `ui`（依赖 shared）
3. 最后 build `web`（依赖 ui）

这个顺序是自动推导的，你不需要手动配置。

***

## 进阶：用 turbo gen 生成新包

Turborepo 内置了代码生成功能，可以在已有 monorepo 中快速添加新包：

```bash
# 交互式生成，会让你选择模板和位置
pnpm turbo gen init

# 使用自定义模板生成
pnpm turbo gen workspace --template node
```

自定义模板示例（`turbo/generators/templates/my-package/template.json`）：

```json
{
  "type": "add",
  "ui": {
    "type": "inquirer.prompt",
    "prompts": [
      {
        "name": "name",
        "message": "Package name?",
        "type": "input"
      }
    ]
  },
  "actions": [
    {
      "type": "add",
      "files": "**/*"
    }
  ]
}
```

这样团队成员就可以用统一的模板生成新包，保证结构一致。

***

## 常用命令速查

| 命令                          | 作用                         |
| --------------------------- | -------------------------- |
| `pnpm create turbo`         | 一键创建 monorepo 项目           |
| `pnpm install`              | 安装所有依赖，建立 workspace 链接     |
| `pnpm build`                | 并行 build 所有包（Turborepo 编排） |
| `pnpm dev`                  | 并行启动所有 dev 服务器             |
| `pnpm lint`                 | 并行 lint 所有包                |
| `pnpm add -Dw <pkg>`        | 在根目录添加 devDependency       |
| `pnpm --filter <pkg> <cmd>` | 只对指定包执行命令                  |
| `pnpm -r exec <cmd>`        | 在所有包中执行命令                  |
| `pnpm turbo gen init`       | 交互式生成新包                    |

### --filter 用法

```bash
# 只 build ui 包
pnpm --filter @my-project/ui build

# 只 dev web 应用
pnpm --filter @my-project/web dev

# build web 及其所有依赖
pnpm --filter @my-project/web... build
```

***

## 目录结构参考

```
my-monorepo/
├── apps/
│   └── web/                    ← 应用层
│       ├── package.json
│       └── src/
├── packages/
│   ├── shared/                 ← 共享工具（无框架依赖）
│   │   ├── package.json
│   │   └── src/
│   └── ui/                     ← UI 组件库
│       ├── package.json
│       └── src/
├── package.json                ← 根配置
├── pnpm-workspace.yaml         ← workspace 声明
├── turbo.json                  ← Turborepo 任务配置
└── .gitignore
```

***

## 进阶：TypeScript 路径别名

如果你用 TypeScript，可以在根目录创建 `tsconfig.base.json`：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

然后每个子包的 `tsconfig.json` 继承它：

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

***

## 进阶：Git Hooks + Lint Staged

在根目录安装：

```bash
pnpm add -Dw husky lint-staged
npx husky init
```

创建 `.husky/pre-commit`：

```bash
pnpm lint-staged
```

创建 `.lintstagedrc`：

```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md}": ["prettier --write"]
}
```

这样每次 `git commit` 前会自动检查和修复代码。

***

## 常见问题

### Q: pnpm 和 npm/yarn 有什么区别？

| 特性        | npm | yarn | pnpm       |
| --------- | --- | ---- | ---------- |
| 安装速度      | 慢   | 中等   | **最快**     |
| 磁盘占用      | 高   | 高    | **低（硬链接）** |
| 依赖隔离      | 差   | 差    | **严格**     |
| Workspace | 支持  | 支持   | **原生支持**   |

### Q: Turborepo 和 Nx 有什么区别？

- **Turborepo**：零配置上手，轻量，适合中小项目
- **Nx**：功能更全（代码生成、受影响分析），配置更复杂，适合大型企业项目

### Q: 什么时候该拆分包？

- 当两个应用共享同一段逻辑时
- 当你想独立发布某个组件库时
- 当构建时间过长，需要并行化时

不要为了 Monorepo 而 Monorepo — 如果只有一个应用，没必要拆。

***

## 总结

| 步骤 | 操作                                | 产出           |
| -- | --------------------------------- | ------------ |
| 1  | `pnpm init` + 配置 package.json     | 根项目          |
| 2  | 创建 pnpm-workspace.yaml            | Workspace 声明 |
| 3  | `pnpm add -Dw turbo` + turbo.json | 构建编排         |
| 4  | 创建 apps/ 和 packages/              | 子包结构         |
| 5  | `pnpm install`                    | 依赖安装 + 链接    |
| 6  | `pnpm build`                      | *并行构建* + 缓存  |

**核心原则：**

- 根 `package.json` 的 `"private": true` 必须有
- 包之间的依赖用 `"workspace:*"`
- Turborepo 的 `"dependsOn": ["^build"]` 确保构建顺序
- 把共享逻辑放 `packages/`，应用放 `apps/`

***

*参考文档：[pnpm Workspace](https://pnpm.io/workspaces)* *|* *[Turborepo](https://turbo.build/repo/docs)*
