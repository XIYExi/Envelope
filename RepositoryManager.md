# RepositoryManager — Envelope

## Purpose
Full-stack lowcode project generation platform. Visually design complete Next.js applications (shadcn/ui + Tailwind + Supabase), export clean source code or deploy directly. Electron desktop app.

## Current State
- **V2** (git default branch): abandoned prototype. UmiJS + dva + antd/semantic-ui + react-dnd H5 page editor. ~35% complete. Not deployable.
- **V3** (target): complete rewrite. See `.opencode/memory/work/v3-architecture/ISA.md` for full specification.

## Architecture (V3 Target)
```
envelope/
├── apps/
│   └── platform/          # Next.js App Router — the editor IDE
├── packages/
│   ├── engine/            # Core lowcode engine (schema, canvas, property editor)
│   ├── materials/         # shadcn/ui component schemas (editableProps per component)
│   ├── flow/              # Business logic flow engine (Thing Model + React Flow)
│   ├── generator/         # JSON/YAML → Next.js source code generator
│   └── runtime/           # Platform runtime mode (dynamic config rendering)
└── templates/
    └── nextjs-base/       # Base Next.js template for generated projects
```

## Key Dependencies (V3)
- **Editor:** Next.js 14+ (App Router), shadcn/ui, Tailwind CSS, Zustand, TanStack Query, React Flow, DnD Kit, Monaco Editor
- **Backend:** Supabase (Auth, PostgreSQL, Storage, Realtime)
- **Desktop:** Electron (contextIsolation enabled, nodeIntegration disabled)
- **Build:** pnpm workspace, Turborepo, TypeScript strict

## Execution Paths
- `pnpm dev` — start editor dev server
- `pnpm build` — build all packages
- `pnpm electron:dev` — start Electron with dev server
- `pnpm electron:build` — package Electron app for distribution
- `pnpm test` — run all tests
- `pnpm lint` — lint all packages

## Change History
| Date | Change |
|------|--------|
| 2026-06-13 | ISA for V3 architecture created. Full rearchitecture decided — abandon UmiJS+dva+antd stack for Next.js+shadcn/ui+Supabase. |
| ~2023 (V2) | Original Envelope V2 prototype — single H5 page editor with react-dnd. Abandoned due to dependency conflicts and scope limitations. |
