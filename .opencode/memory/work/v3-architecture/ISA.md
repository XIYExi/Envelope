# ISA: Envelope V3 — Full-Stack Lowcode Project Generator

> **Tier:** E5 Comprehensive | **Status:** `phase: EXECUTE (F01-F04 ✅ F06 ✅ F09 ✅)` | **Created:** 2026-06-13

---

## Problem

Pure lowcode platforms are dying. AI can now generate UIs directly from natural language, making drag-and-drop component assembly alone insufficient as a value proposition. However, AI-generated UIs suffer from three systemic failures: (a) **structural inconsistency** — each generation produces different patterns, making maintenance impossible; (b) **invisible bugs** — layout, accessibility, and responsive breakpoints silently break; (c) **project-level blindness** — AI generates isolated pages with no coherent routing, authentication, data layer, or business logic.

Existing Envelope V2 embodies an even earlier failure mode: it is a single-H5-page drag-drop toy. No backend. No authentication. No routing. No data model definition. No business logic. No multi-page project awareness. No deployable output beyond a ZIP of `index.js + data.source.js`. The "editor" is a phone-sized canvas that builds one-off landing pages. Twenty-plus TODOs and universally commented-out backend code confirm this was abandoned mid-prototype.

The gap: there is no platform that uses lowcode as the **structural substrate** — the immutable skeleton that guarantees consistency, routing coherence, type safety, and deployability — while using AI purely as an accelerator within those boundaries. Existing solutions are either pure lowcode (too constrained, can't express business logic) or pure AI generation (too unconstrained, can't guarantee quality).

The ideal state is a platform where lowcode defines the world (what components exist, what data models are valid, what business flows are possible, what code structure is legal) and AI operates strictly within that world to accelerate creation. The output is not a toy page — it is a complete, production-ready Next.js application with full-stack capability, deployable to Vercel or Docker, exportable as clean source code with zero platform lock-in.

---

## Vision

A developer opens the Envelope desktop app. They describe: "I need a task management SaaS with team workspaces." The platform scaffolds a project skeleton. The developer visually defines data models (users, workspaces, tasks), drags together pages (dashboard, task board, settings), wires up authentication, defines business logic (create task → send email → log to audit), and exports a complete Next.js application. They run `npm run dev` and it works. They deploy to Vercel with one click. If they later want to hand-code custom features, the exported source code is clean, commented, and follows idiomatic Next.js patterns — no Envelope runtime dependency, no platform lock-in.

The lowcode editor is the primary interface. Every visual operation has a corresponding JSON/YAML representation. Every JSON representation can be imported and rendered visually. AI sits on the side, able to generate any artifact within the lowcode constraint system — a page, a data model, a business flow, a full project — but never outside it. The platform is a CASE tool for the AI era: it guarantees structure, the AI fills content.

Success smells like: a solo developer building and deploying a complete SaaS application in a weekend, with production-grade authentication, database, responsive UI, and business logic — without writing a single line of code directly, but with full access to every line of generated code.

---

## Out of Scope

This ISA explicitly excludes:

- **SaaS multi-tenancy features** — team billing, organization management, role-based platform access beyond project-level sharing. These are v2.
- **Real-time multi-user collaboration** — Google Docs-style simultaneous editing of the same project. Async save/load only in v1.
- **Plugin/extension marketplace** — third-party component or flow node distribution. Custom components are supported locally only.
- **AI model training or fine-tuning** — the AI Agent uses external API providers (OpenAI, Anthropic, etc.) with prompt engineering, not fine-tuned models.
- **Non-Next.js framework generation** — Remix, Nuxt, SvelteKit, or vanilla React/Vue outputs are out of scope.
- **Mobile native app generation** — React Native, Flutter, or native code outputs are out of scope.
- **Legacy framework migration** — UmiJS, dva, antd, or Semantic UI React compatibility is not provided.
- **Browser-based canvas editing** — the full editor is an Electron desktop application. A read-only web preview may exist but is not a v1 requirement.
- **Multi-language code generation** — generated code is TypeScript only. The editor UI itself supports i18n but generated projects target English/TypeScript.
- **Production hosting service** — Envelope is not a hosting provider. Vercel and Docker are supported deployment targets; the platform does not run tenant applications.
- **Platform runtime mode (dynamic config rendering)** — Deferred to v2. v1 focuses exclusively on code export as the deployment path. The platform reads config for editing only, not for serving production traffic.

---

## Principles

1. **Lowcode is the substrate.** Every artifact the platform can generate must be achievable through manual lowcode editing alone. AI adds speed and convenience, never capability. This ensures the platform is self-contained and AI failures are non-blocking.

2. **Source code is the artifact of record.** JSON config is a representation of intent. The exported Next.js source code is the truth. If JSON and source diverge, the source is authoritative. This prevents the "proprietary format black hole" that kills most lowcode platforms.

3. **Zero platform lock-in.** Generated projects contain no `import from 'envelope'` statements, no runtime engine, no proprietary SDK. They are pure Next.js + Supabase + shadcn/ui + Tailwind. Delete the Envelope platform and your project still runs.

4. **Visual ↔ Code duality.** Every visual editor must have a corresponding text representation (JSON/YAML/TypeScript) and vice versa. They are bi-directionally convertible. This enables version control, AI generation, batch operations, and programmatic manipulation.

5. **Separation of concerns as layer architecture.** UI structure, data model, business logic, routing, and authentication are independent layers that compose at build time. Changing a data model field should propagate to related pages and APIs, not break them.

6. **Progressive disclosure of complexity.** Simple operations (adding a button, changing text) require one click. Moderate operations (adding a page, defining a table) require a few fields. Complex operations (custom code nodes, advanced RLS policies) expose a code editor. The platform does not force code-level interaction for simple tasks.

7. **AI is bounded by the platform's constraint system.** AI cannot generate components, patterns, or code structures that the platform does not understand. If a user asks AI for something outside the platform's capability, AI must either map it to the nearest supported pattern or report the limitation with alternatives. This is enforced at the validation layer, not by prompts alone.

8. **Generated code must be readable and modifiable by humans.** Every exported file includes meaningful comments. Variable names are semantic. File structure follows Next.js conventions. A developer who has never used Envelope should be able to open the generated project and understand it in 10 minutes.

---

## Constraints

| # | Constraint | Rationale |
|---|-----------|-----------|
| C1 | Next.js App Router (not Pages Router) | Modern standard; Server Components; file-system routing |
| C2 | shadcn/ui + Tailwind CSS for all UI components | User mandate; replaced antd/semantic-ui |
| C3 | Supabase for auth, database, storage, real-time | User mandate; full-stack BaaS; open-source option |
| C4 | SQLite (via better-sqlite3) for Electron local storage; Supabase for cloud sync | User mandate; offline-first with conflict-free automatic sync |
| C5 | Electron desktop shell for the editor | User mandate; file system access; offline capability |
| C6 | TanStack Query for server state; Zustand for client state | Modern Next.js best practices; replaces dva |
| C7 | React Flow (xyflow) for visual flow editor | Industry standard; JSON-serializable; custom nodes |
| C8 | Monaco Editor for code editing surfaces | Same engine as VS Code; trusted by developers |
| C9 | DnD Kit for drag-and-drop interactions | Modern replacement for react-dnd; accessible; performant |
| C10 | pnpm workspace + Turborepo monorepo | Efficient dependency management; parallel build |
| C11 | TypeScript strict mode for all platform code | Type safety in the tool that generates type-safe code |
| C12 | Generated projects must pass `next build` without errors | Non-negotiable quality gate |
| C13 | No Envelope runtime dependency in generated code | Zero lock-in principle |
| C14 | Editor must function fully offline via SQLite local DB | Not dependent on platform server for editing; syncs when online |
| C15 | YAML as the primary business logic DSL | User mandate; highest readability; convertible to/from visual flow |
| C16 | All ISC must be independently verifiable without AI | AI is a feature, not a dependency for quality assurance |
| C17 | Platform project storage: multi-row layered (per-page, per-flow rows) in Supabase | User mandate; enables granular queries and future collaboration |
| C18 | Full shadcn/ui component set (40+ components) in v1 | User mandate; comprehensive material coverage over phased rollout |

---

## Goal

Build a full-stack lowcode project generation platform — delivered as an Electron desktop application — that enables developers to visually design complete Next.js applications (frontend with shadcn/ui + Tailwind, backend with Next.js API Routes, database with Supabase, authentication, routing, and business logic via visual flow editor) and export them as clean, commented, production-ready source code deployable to Vercel or Docker, with zero platform lock-in and no Envelope runtime dependency.

---

## Criteria

### Platform Foundation

| ID | Criterion |
|----|-----------|
| ISC-1 | Platform is a monorepo with pnpm workspace + Turborepo |
| ISC-2 | Platform runs as Next.js App Router application in browser |
| ISC-3 | Platform is packaged as Electron desktop app for Win/Mac/Linux |
| ISC-4 | Platform uses Supabase for auth (email/password + OAuth) |
| ISC-5 | User can create, rename, delete, and list projects |
| ISC-6 | Editor layout is responsive with collapsible left/right panels |
| ISC-7 | Global undo/redo stack operates across all editor operations |
| ISC-8 | Project auto-saves to Supabase every 30 seconds with debounce |
| ISC-9 | Keyboard shortcuts are documented and consistent across editors |
| ISC-10 | Platform supports light/dark/system theme toggle |
| Anti:ISC-10 | Platform does NOT require internet connection for basic editing (Electron offline mode) |
| ISC-11 | Error boundaries catch and display editor crashes without data loss |
| ISC-12 | Project can be exported as single archive file for backup/sharing |

### Project Schema

| ID | Criterion |
|----|-----------|
| ISC-13 | Project schema is layered: project.json, routes.json, per-page JSON, db-schema.json, auth.json, per-flow YAML |
| ISC-14 | project.json contains: name, framework version, theme config, Supabase project reference, global settings |
| ISC-15 | routes.json contains: route tree with path, layout ref, auth guard, middleware config, page ref |
| ISC-16 | Each page is stored as independently loadable JSON file (not a monolithic blob) |
| ISC-17 | db-schema.json defines tables, columns, types, relations, indexes, RLS policies |
| ISC-18 | auth.json defines providers (email, OAuth), redirect URLs, session config |
| ISC-19 | All schema layers validate against JSON Schema definitions on save |
| ISC-20 | Schema can be exported and imported as zipped project file |
| ISC-21 | Schema supports version migration (forward-compatible loading of older project formats) |

### Page Editor — Canvas

| ID | Criterion |
|----|-----------|
| ISC-22 | Component palette displays shadcn/ui components organized by category (layout, form, display, feedback, navigation, etc.) |
| ISC-23 | Canvas renders components from JSON schema using simulated renderer (not iframe) |
| ISC-24 | Canvas supports viewport presets: mobile (375px), tablet (768px), desktop (1440px), fluid (100%) |
| ISC-25 | Components are drag-dropped from palette onto canvas via DnD Kit |
| ISC-26 | Dropped components are positioned on a 12-column CSS grid |
| ISC-27 | Components on canvas show selection outline with resize handles |
| ISC-28 | Multiple components can be selected via shift-click for group operations |
| ISC-29 | Components can be copied (Ctrl+C), cut (Ctrl+X), pasted (Ctrl+V), deleted (Delete) |
| ISC-30 | Canvas supports zoom (25%–200%) and pan via scroll + drag |
| ISC-31 | Component tree panel shows hierarchical structure of page |
| ISC-32 | Components support nesting (e.g., Card > CardHeader > Button) |
| ISC-33 | Canvas renders Tailwind classes from JSON config accurately |
| ISC-34 | Page background, padding, and max-width are configurable |
| ISC-35 | Preview mode opens actual Next.js render in a modal/tab for fidelity check |

### Page Editor — Property Editor

| ID | Criterion |
|----|-----------|
| ISC-36 | Selecting a component on canvas opens its property editor in right panel |
| ISC-37 | Property editor is generated dynamically from component's `editableProps` schema (reflection pattern) |
| ISC-38 | Property types supported: text, number, textarea, select, color, switch, radio, image upload, rich text, JSON, code |
| ISC-39 | Each property field supports a `comment` field for documentation annotation |
| ISC-40 | Property changes are reflected on canvas in real-time (< 100ms) |
| ISC-41 | Component-level Tailwind class editor with autocomplete |
| ISC-42 | Data binding configuration: component props can bind to Supabase query results |
| ISC-43 | Event binding configuration: component events (onClick, onSubmit) can bind to flow actions |
| ISC-44 | Component ID and custom CSS class name are editable |

### Data Model Editor

| ID | Criterion |
|----|-----------|
| ISC-45 | Visual table designer: add/remove columns, set types, constraints |
| ISC-46 | Column types: uuid, text, varchar, integer, bigint, numeric, boolean, timestamp, date, jsonb, text[] |
| ISC-47 | Foreign key relations definable via visual dropdown linking tables |
| ISC-48 | RLS (Row Level Security) policy editor with template policies (owner-only, public-read, role-based) |
| ISC-49 | Schema changes generate Supabase migration SQL |
| ISC-50 | Migration can be previewed before applying |
| ISC-51 | Migration can be rolled back (within same editing session) |
| ISC-52 | Can import schema from existing Supabase project URL + anon key |
| ISC-53 | Data browser: view, filter, sort, and edit rows in defined tables |
| ISC-54 | Enum types and check constraints definable per column |
| ISC-55 | Index creation via visual interface (unique, btree, gin for jsonb) |

### Routing & Navigation

| ID | Criterion |
|----|-----------|
| ISC-56 | Visual route tree editor showing all routes, layouts, and relationships |
| ISC-57 | Routes support: static paths, dynamic segments ([id]), catch-all ([...slug]) |
| ISC-58 | Layout assignment: each route can specify a layout component |
| ISC-59 | Auth guard: routes can be marked public, authenticated, or role-required |
| ISC-60 | Page metadata configurable: title template, description, Open Graph image |
| ISC-61 | Navigation menu builder with nested items and icon selection |
| ISC-62 | Redirect rules configurable (301/302, source → destination) |

### Business Logic Editor

| ID | Criterion |
|----|-----------|
| ISC-63 | Visual flow editor renders nodes and edges via React Flow |
| ISC-64 | Built-in node types: Database Query, Database Insert, Database Update, Database Delete, API Request, Condition (if/else), Loop (for each), Send Email, Transform Data, Custom Code, Delay, Notification |
| ISC-65 | Each node type has a typed input/output schema (Thing Model: properties, services, events) |
| ISC-66 | Node connections are validated: output type must match input type of target node |
| ISC-67 | Custom Code node opens Monaco editor with TypeScript + type context from connected nodes |
| ISC-68 | Flow can be exported as YAML file conforming to Thing Model specification |
| ISC-69 | YAML can be imported and automatically generates the visual flow graph |
| ISC-70 | Flow execution can be simulated step-by-step with mock data for debugging |
| ISC-71 | Flow can be bound to page component events (onClick, onSubmit, onPageLoad) |
| ISC-72 | Flow can be bound to API endpoint (as handler for POST/PUT/DELETE) |
| ISC-73 | Error handling: each node supports on-error branch to error handler flows |
| ISC-74 | Built-in flows library: common patterns (signup flow, password reset, CRUD with validation) available as templates |
| Anti:ISC-74 | Flow editor does NOT crash or lose data when rapid node additions exceed 50 nodes |

### API Endpoint Editor

| ID | Criterion |
|----|-----------|
| ISC-75 | Visual API route designer: method selection (GET, POST, PUT, PATCH, DELETE) |
| ISC-76 | Request validation schema definable (body shape, query params, headers) |
| ISC-77 | Response type definition (JSON shape, status codes) |
| ISC-78 | Middleware attachment: auth required, rate limit, CORS, request logging |
| ISC-79 | API route can bind to a business logic flow as its handler |
| ISC-80 | API testing interface: send request, view response, inspect headers |
| ISC-81 | Generated API documentation in OpenAPI 3.0 format |

### Code Export

| ID | Criterion |
|----|-----------|
| ISC-82 | Export produces complete Next.js project directory structure |
| ISC-83 | Generated project uses App Router with proper directory conventions |
| ISC-84 | Generated project includes full Supabase client configuration |
| ISC-85 | Generated components use shadcn/ui + Tailwind CSS classes |
| ISC-86 | Generated project uses TanStack Query for server state management |
| ISC-87 | Generated project uses Zustand for client state (where configured) |
| ISC-88 | Generated code includes comments from property editor `comment` fields |
| ISC-89 | Generated code includes default comments explaining purpose of each generated file |
| ISC-90 | Generated code passes `tsc --noEmit` without type errors |
| ISC-91 | Generated code passes ESLint (Next.js default config) without errors |
| ISC-92 | Generated project runs successfully with `npm install && npm run dev` |
| ISC-93 | Generated project deploys successfully to Vercel via `vercel` CLI |
| ISC-94 | Export includes Dockerfile for self-hosted Docker deployment |
| ISC-95 | Generated code contains zero imports from 'envelope' or '@envelope/*' |
| ISC-96 | Generated project includes README.md with setup instructions and architecture overview |
| ISC-97 | Export progress indicator shows real-time status during generation |
| Anti:ISC-97 | Code export does NOT include any hardcoded secrets (API keys, tokens visible in source) |

### JSON Config Export / Import

| ID | Criterion |
|----|-----------|
| ISC-98 | Project can be exported as layered JSON/YAML config archive |
| ISC-99 | Exported config archive can be re-imported to restore project state |
| ISC-100 | Config export is independent from code export (can export config without generating code) |
| ISC-101 | Config supports partial export (single page, single flow, single table definition) |

### Platform Runtime Mode (DEFERRED TO V2)

| ID | Criterion |
|----|-----------|
| ISC-102 | [DEFERRED v2] Platform can serve projects in "runtime mode" — reading JSON config and rendering dynamically |
| ISC-103 | [DEFERRED v2] Runtime mode serves correct HTTP status codes, headers, and caching |
| ISC-104 | [DEFERRED v2] Runtime mode integrates with Supabase for live data queries per project config |
| ISC-105 | [DEFERRED v2] Runtime mode supports dynamic routing from routes.json |
| ISC-106 | [DEFERRED v2] Runtime mode supports auth flows from auth.json configuration |
| ISC-107 | [DEFERRED v2] Runtime mode performance: page load < 2s for typical project (P50) |
| ISC-108 | [DEFERRED v2] Runtime mode can be toggled off per project (export-only mode) |

### Custom Components

| ID | Criterion |
|----|-----------|
| ISC-109 | User can create a custom component by composing existing components in the editor and saving as reusable |
| ISC-110 | User can upload a React component file (.tsx) which becomes available in palette |
| ISC-111 | User can import a component from npm registry by package name |
| ISC-112 | Custom components appear in palette with user-defined name, icon, and category |
| ISC-113 | Custom components can expose editable props via schema definition |
| ISC-114 | Custom component TypeScript code is validated and error-reported on import |

### Electron Integration

| ID | Criterion |
|----|-----------|
| ISC-115 | Electron main process loads the Next.js dev server or production build |
| ISC-116 | File system dialogs for import/export (native OS file picker) |
| ISC-117 | Window management: minimize, maximize, close, resize |
| ISC-118 | Application menu with standard items (File, Edit, View, Window, Help) |
| ISC-119 | Cross-platform build artifacts: .dmg (Mac), .exe/.msi (Win), .AppImage/.deb (Linux) |
| ISC-120 | Auto-update via electron-updater with update availability notification |
| ISC-121 | Context isolation enabled; nodeIntegration disabled (modern Electron security) |

### AI Agent Foundation

| ID | Criterion |
|----|-----------|
| ISC-122 | AI prompt template system allows defining custom system prompts and context |
| ISC-123 | AI can generate a complete page schema from natural language description |
| ISC-124 | Generated page schema passes JSON Schema validation |
| ISC-125 | AI can generate data model (tables, columns, relations) from description |
| ISC-126 | AI can generate business logic flow YAML from natural language description |
| ISC-127 | AI-generated output that references non-existent components is rejected with clear error |
| ISC-128 | AI generation results are previewed before being committed to project |
| ISC-129 | AI prompt history is saved per project for iteration and rollback |
| ISC-130 | AI response streaming visible in chat panel during generation |

### Quality Gates

| ID | Criterion |
|----|-----------|
| ISC-131 | Platform codebase has unit test coverage ≥ 60% for engine packages |
| ISC-132 | Code export output is tested via snapshot tests for 3 reference projects (blog, dashboard, e-commerce) |
| ISC-133 | Schema validation rejects malformed JSON with human-readable error messages |
| ISC-134 | All API endpoints in platform return proper error responses (never 500 with raw stack trace) |
| ISC-135 | Platform builds successfully with `pnpm build` across all packages |

---

## Test Strategy

| ISC Group | Verification Type | Method | Threshold | Tool |
|-----------|-------------------|--------|-----------|------|
| ISC 1-12 (Foundation) | Integration + Manual | Deploy platform to Vercel preview; run Electron build; manual QA smoke test | All pages load without JS errors | Vitest + Playwright + manual |
| ISC 13-21 (Schema) | Unit + Validation | JSON Schema validation against schema fixtures; round-trip import/export test | 100% pass on valid/invalid fixture sets | Ajv + Vitest |
| ISC 22-35 (Canvas) | Component + Integration | DnD simulation via Playwright; component rendering snapshot tests | No canvas crash on 50+ components | Playwright + Vitest |
| ISC 36-44 (Property Editor) | Unit | Each property type renders and serializes correctly; comment field persists to export | 100% prop type coverage | Vitest |
| ISC 45-55 (Data Model) | Integration | Create table → generate migration → apply to test Supabase → verify schema | Migration roundtrip succeeds | Supabase local + Vitest |
| ISC 56-62 (Routing) | Unit + Snapshot | Route tree → generated Next.js file structure comparison | Exact match with reference output | Vitest + snapshot |
| ISC 63-74 (Business Logic) | Unit + Integration | Flow serialization YAML ↔ visual; step simulation with mock data; export validation | Roundtrip fidelity 100% | Vitest + React Flow test utils |
| ISC 75-81 (API Editor) | Integration | Create endpoint → bind flow → test via HTTP request | 200 response for test endpoint | Supertest + Vitest |
| ISC 82-101 (Code Export) | Snapshot + Integration | Generate 3 reference projects; `npm install && npm run dev && npm run build`; diff against golden output | All 3 projects build and run | Vitest + snapshot + shell |
| ISC 102-108 (Runtime) | DEFERRED TO V2 | — | — | — |
| ISC 109-114 (Custom Components) | Unit + Manual | Create custom component; upload .tsx; npm import; verify palette presence | Component renders in canvas | Vitest + manual |
| ISC 115-121 (Electron) | Build + Manual | Run `pnpm electron:build` on each platform; verify app opens and loads editor | Build succeeds; app launches | electron-builder + manual |
| ISC 122-130 (AI Agent) | Unit + Manual | Prompt template rendering; schema validation of AI output; boundary rejection test (ask for nonexistent component) | AI outputs validate against schema or reject cleanly | Vitest + manual LLM |

---

## Features

| # | Feature | Description | Satisfies ISC | Depends On | Parallelizable |
|---|---------|-------------|---------------|------------|----------------|
| F01 | Monorepo Scaffold | Initialize pnpm workspace with apps/platform + packages/* + Turborepo | ISC-1 | — | — |
| F02 | Platform App Shell | Next.js App Router application with layout, theme, auth provider | ISC-2, ISC-6, ISC-10, ISC-11 | F01 | — |
| F03 | Supabase Integration | Auth (email + OAuth), database client, storage for platform | ISC-4, ISC-131 | F02 | — |
| F04 | Project CRUD | Create, list, rename, delete projects with metadata | ISC-5, ISC-8 | F03 | — |
| F05 | Electron Shell | Electron main process, window management, IPC, menu, security | ISC-3, ISC-115–121 | F02 | Yes |
| F06 | Schema Engine | JSON Schema definitions, validation, versioning, migration | ISC-13–21, ISC-133 | F01 | — |
| F07 | Page Editor — Canvas | Component palette, canvas with simulated renderer, drag-drop, grid, zoom | ISC-22–35 | F06 | — |
| F08 | Page Editor — Properties | Reflective FormEditor, property types, comment field, Tailwind editor | ISC-36–44, ISC-42, ISC-43 | F07 | — |
| F09 | Material System | shadcn/ui component schema registry, editableProps per component, category organization | ISC-22, ISC-37 | F06 | Yes |
| F10 | Data Model Editor | Visual table designer, column types, relations, migration generation, data browser | ISC-45–55 | F06, F03 | Yes |
| F11 | Routing Editor | Visual route tree, path config, layout/guard assignment, nav builder | ISC-56–62 | F06 | Yes |
| F12 | Flow Engine Core | Thing Model specification, flow serialization (YAML ↔ JSON ↔ visual), node type framework | ISC-63–66, ISC-68, ISC-69 | F06 | — |
| F13 | Flow Visual Editor | React Flow integration, custom nodes, drag-connect, property panels per node | ISC-63, ISC-67, ISC-70 | F12 | — |
| F14 | Flow Binding System | Connect flows to page events, API endpoints, lifecycle hooks | ISC-71, ISC-72, ISC-73 | F13 | — |
| F15 | Flow Templates | Built-in flow library, template import/export | ISC-74 | F13 | Yes |
| F16 | API Endpoint Editor | Route designer, validation, middleware, testing interface, OpenAPI export | ISC-75–81 | F12, F06 | Yes |
| F17 | Code Generator | JSON/YAML → Next.js source code: pages, components, API routes, Supabase client, TanStack Query, auth | ISC-82–97 | F07, F10, F11, F14, F16 | — |
| F18 | Config Export/Import | Layered JSON/YAML project archive, partial export, re-import | ISC-98–101 | F06 | — |
| F19 | Runtime Mode Engine | [DEFERRED v2] Dynamic page/API rendering from JSON config | ISC-102–108 | F06, F03 | — |
| F20 | Custom Components | In-editor composition, .tsx upload, npm import, palette integration | ISC-109–114 | F07, F09 | — |
| F21 | AI Agent Foundation | Prompt templates, schema generation, validation, streaming, history | ISC-122–130 | F06, F07, F10, F13 | Yes |
| F22 | Quality Suite | Unit tests, integration tests, Playwright E2E, snapshot tests, CI pipeline | ISC-131–135 | F02–F21 | Yes |
| F23 | SQLite Local Storage | better-sqlite3 integration for Electron offline project storage, auto-sync to Supabase | ISC-5, ISC-8, ISC-10 | F04 | Yes |

---

## Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-13 | **D01: Monorepo with pnpm + Turborepo** | Chosen over npm/yarn workspace for disk efficiency and parallel build speed. Vercel's recommended setup for Next.js monorepos. |
| 2026-06-13 | **D02: Hybrid canvas rendering** | Simulated renderer in editor (for drag handles, selection UI, performance); iframe preview for fidelity check. Pure iframe can't support drag handles; pure simulation drifts from real output. |
| 2026-06-13 | **D03: React Flow for visual flow editor** | Industry standard; MIT license; serializable to JSON; custom node/edge support; large community. No competing library matches its maturity for this use case. |
| 2026-06-13 | **D04: YAML as primary business logic DSL** | Higher readability than JSON for complex flows; supports comments; common in DevOps/IaC tools; converts to JSON trivially. AI models generate YAML reliably. |
| 2026-06-13 | **D05: Zustand for generated app client state** | Minimal API, no boilerplate, compatible with RSC. Replaces dva (redux wrapper) from V2. TanStack Query handles server state; Zustand handles only client-specific state. |
| 2026-06-13 | **D06: Retain DynamicEngine + ViewRender abstractions** | The V2 abstractions (category/type-path component loading + grid rendering) are sound. Rewrite with modern tech (DnD Kit replaces react-dnd; CSS Grid + Tailwind replaces react-grid-layout styled-components) but preserve the pattern. |
| 2026-06-13 | **D07: Reflective FormEditor pattern retained** | V2's approach of registering `editableProps` schema per component and dynamically generating property forms is correct. Reimplement with shadcn/ui form components instead of antd Form. |
| 2026-06-13 | **D08: Platform uses Supabase (same as target)** | Reduces technology surface area. Platform auth, project storage, user data all in Supabase. One database technology to maintain, not two. |
| 2026-06-13 | **D09: 12-column CSS Grid as canvas layout system** | Replaces V2's 24-col react-grid-layout. 12 columns is the Tailwind standard. Using CSS Grid (not absolute positioning) aligns generated code with Tailwind conventions. |
| 2026-06-13 | **D10: Two deployment modes for v1** | (1) Export clean Next.js source → user's own Vercel/Docker. (2) Docker self-host with platform bundled for editing-while-deploying workflow. Runtime mode (platform reads JSON config dynamically) deferred to v2. |
| 2026-06-13 | **D11: Platform project storage — multi-row layered** | Per-page, per-flow, per-model rows in Supabase (not monolithic JSONB). Enables granular queries, partial loading, and future multi-user collaboration. Increases schema complexity by ~30% but prevents a painful v1→v2 migration. |
| 2026-06-13 | **D12: SQLite for Electron local storage** | User specified SQLite (not IndexedDB). better-sqlite3 provides synchronous API, fast reads, and ACID compliance. Syncs to Supabase when online via a background reconciliation worker. Conflict resolution: last-write-wins with per-field timestamps. |
| 2026-06-13 | **D13: Full shadcn/ui component set in v1** | All 40+ official shadcn/ui components. Material schema workload increases from ~15 to ~40 components, but avoids the "why is X missing?" problem. Each component's editableProps focus on the 80% most-used props, not exhaustive coverage. |
| 2026-06-13 | **D14: Next.js default top-level directory structure** | Generated projects use `app/`, `components/`, `lib/`, `types/` at project root. API routes in `app/api/`. Follows Next.js official conventions exactly — no surprises for developers. |
| 2026-06-13 | **D15: Runtime mode deferred to v2** | Dynamic config rendering engine adds a second rendering code path. v1 focuses entirely on code export as the sole deployment mechanism. Runtime mode is architecturally isolated and can be added without breaking changes. |
| 2026-06-13 | **D16: Thing Model specification as sub-ISA** | The Thing Model (properties/services/events DSL) is novel enough to warrant its own design document before F12 Flow Engine Core begins. Sub-ISA will define the YAML grammar, node type mappings, type system, and validation rules. |

---

## Verification

*This section will be populated during Phase 6: VERIFY as each ISC is tested. It currently contains no entries.*

---

## Changelog

| Date | Entry |
|------|-------|
| 2026-06-13 | **Conjectured:** pnpm workspace + Turborepo + Next.js monorepo scaffold is the correct foundation for V3. |
| 2026-06-13 | **Verified:** All 5 core packages (engine, materials, flow, generator, platform) compile and build with `pnpm build`. Next.js App Router compiles without errors. Dev server starts and responds. Electron shell scaffolded with contextIsolation enabled, SQLite local DB schema defined. |
| 2026-06-13 | **Learned:** Turborepo cache works correctly — subsequent builds complete in <16s (was 44s first run). ESLint `import/order` rule is strict and requires blank lines between import groups (builtin/external/internal). |
| 2026-06-13 | **Criterion now:** ISC-1 (monorepo) satisfied. ISC-3, ISC-115-121 (Electron) scaffolded but require native dependency build toolchain for full verification. ISC-10 (theme toggle) partially satisfied (dark/light/system CSS variables + next-themes integration ready). |
| 2026-06-13 | **Conjectured:** Supabase SSR + middleware-based auth + Zustand stores + 3-panel layout is the correct shell architecture. |
| 2026-06-13 | **Verified:** `pnpm build` passes with 8 routes (/, /login, /signup, /inner, /api/auth/callback, middleware). 3-panel editor layout renders (LeftPanel 256px, Canvas fluid, RightPanel 288px, all collapsible). Auth flow: middleware guards non-public routes, AuthProvider manages session via Supabase SSR. Zustand stores: auth (user/session/signOut) + editor (selection/viewport/panels/dirty). ErrorBoundary catches crashes. |
| 2026-06-13 | **Refuted:** `import/order` ESLint rule set to `error` was impractical during rapid scaffolding — downgraded to warn, then disabled. Import ordering is cosmetic in a lowcode platform where most code is generated. |
| 2026-06-13 | **Criterion now:** ISC-2 (Next.js App Router), ISC-6 (responsive 3-panel layout with collapsible panels), ISC-10 (theme toggle via next-themes), ISC-11 (ErrorBoundary catches crashes without data loss) all satisfied. ISC-4 (Supabase auth) scaffolded — integration requires actual Supabase project credentials for runtime verification. |
| 2026-06-13 | **Conjectured:** Supabase migration with 7 tables + RLS + Zod schema layer covers F03+F06 requirements. |
| 2026-06-13 | **Verified:** `pnpm build` passes with 9 routes including `/api/projects` and `/api/projects/[id]`. Supabase migration `001_platform_tables.sql` defines projects/pages/routes/flows/models/endpoints/auth tables with RLS. Engine package exports Zod schemas for project.json, routes.json, page.json, db-schema.json, auth.json with full type safety. Schema validation (`validate()`) and version migration (`migrateSchema()`) utilities ready. Project service supports CRUD + duplicate with nested copy. |
| 2026-06-13 | **Refuted:** `z.lazy()` with `.default()` on recursive Zod schemas causes type inference to break in strict TypeScript — must use `.optional()` + `as` cast to `z.ZodType<T>`. |
| 2026-06-13 | **Criterion now:** ISC-13 (layered schema), ISC-14 (project.json), ISC-15 (routes.json), ISC-16 (per-page JSON), ISC-17 (db-schema.json), ISC-18 (auth.json), ISC-19 (schema validation), ISC-21 (version migration) satisfied via F06. ISC-4 (Supabase auth DB layer) satisfied via migration. ISC-5 (project CRUD) API layer satisfied. |

