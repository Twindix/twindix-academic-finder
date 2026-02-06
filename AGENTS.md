# AGENTS.md

Instructions for AI coding agents working with this codebase.

> **SYNC REQUIREMENTS:**
> 1. **Folder Structure:** Keep "Project Structure" section in sync when creating/reorganizing folders
> 2. **ESLint Rules:** Keep "Rules Summary" section in sync with [eslint-plugin-code-style](https://github.com/Mohamed-Elhawary/eslint-plugin-code-style) when rules are added, removed, or updated
>
> The same applies to `CLAUDE.md`.

## Project Overview

**Twindix Academic Finder** is a web application for viewing AI-powered assessment analysis results. Companies and universities enter student or candidate codes to access detailed AI model analysis outputs based on assessment answers.

- **Live URL:** https://academicfinder.twindix.com/
- **Repository:** https://github.com/hazem-rboua/Academic-Finder-Frontend

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 6.x | Build tool & dev server |
| Tailwind CSS | 4.x | Utility-first styling |
| React Router | 7.x | Client-side routing |
| ESLint | 9.x | Code linting (flat config) |

## Project Structure

> **SYNC:** Update this section whenever the folder structure changes.

```
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── offline.html           # PWA offline fallback
│   └── _redirects             # Netlify redirects
├── src/
│   ├── assets/                # Static assets
│   │   ├── icons/             # SVG/TSX icon components
│   │   └── images/            # Image files (logo, etc.)
│   ├── atoms/                 # Custom UI components (project identity)
│   ├── components/            # Shared components with logic
│   ├── constants/             # App constants, routes, and strings
│   ├── enums/                 # TypeScript enums
│   ├── hooks/                 # Custom React hooks
│   ├── interfaces/            # TypeScript interfaces
│   ├── layouts/               # Page layouts (AuthLayout, CodeLayout, MainLayout)
│   ├── pages/                 # Full page components
│   ├── routes/                # React Router configuration
│   ├── services/              # API services & Axios client
│   ├── types/                 # TypeScript type aliases
│   ├── utils/                 # Utility functions
│   ├── app.tsx                # Root application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles & Tailwind theme
├── scripts/                   # Build scripts
├── eslint.config.js           # ESLint flat config
├── vite.config.ts             # Vite configuration with PWA
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies & scripts
├── AGENTS.md                  # AI agent instructions (this file)
├── CLAUDE.md                  # Claude-specific configuration
└── README.md                  # Project documentation
```

---

## Component Architecture (CRITICAL)

> **Agents must understand and follow this architecture when building UI.**

### Folder Hierarchy

```
atoms/  →  components/  →  layouts/  →  pages/
```

| Folder | Purpose | Examples |
|--------|---------|----------|
| `atoms/` | Custom components with **project identity** | `Button`, `Input`, `Modal`, `Alert`, `Tooltip` |
| `components/` | Shared components with **multiple elements/logic** | `ChatBox`, `Sidebar`, `LogoutModal` |
| `layouts/` | Page layout structures (wrap pages with shared UI) | `AuthLayout`, `CodeLayout`, `MainLayout` |
| `pages/` | Full page UI components | `LoginPage`, `CodePage`, `ResultPage`, `ProfilePage` |

### Atom Guidelines

1. **One atom per UI primitive:** `Button`, `Input`, `Modal`, `Alert`
2. **No suffix required:** Just the component name (not `ButtonAtom`)
3. **Apply project identity:** Theme colors, radius, fonts
4. **Expose simple props:** Hide complexity, expose only what's needed
5. **Export from index:** `atoms/index.ts` re-exports all atoms

### When to Use Each Folder

| Building... | Use |
|-------------|-----|
| Small, single-purpose styled element | `atoms/` |
| Component with business logic or multiple atoms | `components/` |
| Reusable component used across pages | `components/` |
| Page wrapper with shared UI (Sidebar + content) | `layouts/` |
| Full page content | `pages/` |

---

## ESLint Configuration (CRITICAL)

> **MANDATORY:** All code must pass ESLint. Run `npm run lint:fix` before every commit.

### eslint-plugin-code-style

**77 custom rules** (67 auto-fixable 🔧, 17 configurable ⚙️, 10 report-only) for consistent React/TypeScript formatting.

| Resource | Link |
|----------|------|
| **Full Documentation** | https://github.com/Mohamed-Elhawary/eslint-plugin-code-style |
| **NPM Package** | https://www.npmjs.com/package/eslint-plugin-code-style |
| **Local Config** | `eslint.config.js` |
| **Current Version** | `1.15.0` (check `package.json`) |

> **Read the full documentation before implementing any code.** The table below is a quick reference.

> **VERSION SYNC:** When `eslint-plugin-code-style` version changes in `package.json`, agents MUST:
> 1. Fetch the plugin documentation to check for new/updated rules
> 2. Update rule counts in this file and `CLAUDE.md`
> 3. Add any new rules to the "Rules Summary" section

---

## Rules Summary (Quick Reference)

**Legend:** Auto-fixable | Configurable

### Array Rules
| Rule | Description |
|------|-------------|
| `array-callback-destructure` | Destructured params in callbacks go multiline when >=2 properties |
| `array-items-per-line` | <=3 items inline; >3 each on own line |
| `array-objects-on-new-lines` | Each object in array starts on its own line |

### Arrow Function Rules
| Rule | Description |
|------|-------------|
| `arrow-function-block-body` | Wrap multiline arrow expressions in parentheses |
| `arrow-function-simple-jsx` | Collapse simple single-element JSX returns to one line |
| `arrow-function-simplify` | Convert block body with single return to implicit return |
| `curried-arrow-same-line` | Curried arrows start on same line as `=>` |

### Component Rules
| Rule | Description |
|------|-------------|
| `component-props-destructure` | Props must be destructured `({ prop })` not `(props)` |
| `component-props-inline-type` | Inline type annotation with proper spacing |
| `folder-component-suffix` | `views/` -> `*View` suffix |
| `svg-component-icon-naming` | SVG components must end with `Icon` suffix |

### Function Rules
| Rule | Description |
|------|-------------|
| `function-arguments-format` | >=2 args: first on new line, each on own line |
| `function-call-spacing` | No space before `(`: `fn()` not `fn ()` |
| `function-declaration-style` | Convert function declarations to arrow expressions |
| `function-naming-convention` | camelCase + verb, handlers end with `Handler` |
| `function-params-per-line` | Multiline params: each on own line |

### Hook Rules
| Rule | Description |
|------|-------------|
| `hook-callback-format` | Callback on new line, deps on separate line |
| `hook-deps-per-line` | <=2 deps inline; >2 each on own line |
| `use-state-naming-convention` | Boolean state: `is`/`has`/`with`/`without` prefix |

### Import/Export Rules
| Rule | Description |
|------|-------------|
| `absolute-imports-only` | Use `@/` alias, no relative imports |
| `import-format` | <=3 specifiers inline; >3 each on own line |
| `export-format` | <=3 specifiers inline; >3 each on own line |
| `index-exports-only` | Index files: re-exports only, no code definitions |

### JSX Rules
| Rule | Description |
|------|-------------|
| `jsx-children-on-new-line` | Multiple children: each on own line |
| `jsx-simple-element-one-line` | Simple JSX with single child on one line |
| `jsx-ternary-format` | Simple ternaries inline; complex get parentheses |
| `classname-multiline` | Long className strings break to multiple lines |
| `classname-order` | Tailwind class ordering |
| `no-empty-lines-in-jsx` | No empty lines between children |

### Object Rules
| Rule | Description |
|------|-------------|
| `object-property-per-line` | Multiline: each property on own line |
| `no-empty-lines-in-objects` | No empty lines between properties |
| `opening-brackets-same-line` | `{`, `[`, `(` on same line as call |

### TypeScript Rules
| Rule | Description |
|------|-------------|
| `interface-format` | PascalCase + `Interface` suffix, camelCase properties |
| `type-format` | PascalCase + `Type` suffix, camelCase properties |
| `enum-format` | PascalCase + `Enum` suffix, UPPER_SNAKE_CASE members |
| `type-annotation-spacing` | No space before `:`, space after |
| `prop-naming-convention` | Boolean: `is`/`has` prefix; Callbacks: `on` prefix |

### Code Organization
| Rule | Description |
|------|-------------|
| `react-code-order` | refs -> state -> effects -> callbacks -> handlers -> render |
| `no-hardcoded-strings` | Import strings from `@/constants` |
| `variable-naming-convention` | camelCase for variables, proper prefixes for booleans |

---

## Other ESLint Plugins

| Plugin | Purpose |
|--------|---------|
| `@stylistic/eslint-plugin` | 4-space indent, double quotes, semicolons, trailing commas |
| `eslint-plugin-perfectionist` | Sorted objects, interfaces, imports |
| `eslint-plugin-check-file` | kebab-case files and folders |
| `eslint-plugin-tailwindcss` | Tailwind CSS rules |

---

## Theme Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-primary` | `#1356BC` | Primary actions |
| `--color-primary-dark` | `#0025BA` | Hover states |
| `--color-background` | `#F6F6F6` | Page background |
| `--color-surface` | `#FFFFFF` | Card backgrounds |
| `--color-error` | `#DC2626` | Error states |
| `--radius-default` | `14px` | Border radius |

---

## Build & Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server
npm run build     # Build for production
npm run lint      # Check linting
npm run lint:fix  # Auto-fix lint issues
```

---

## Git Workflow

### Commit Format

```
<type>(<scope>): <subject>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `chore`, `deps`

### Versioning (SemVer)

| Bump | When |
|------|------|
| **PATCH** | Bug fixes, minor tweaks |
| **MINOR** | New features, components |
| **MAJOR** | Breaking changes, removed features |

**Version Sync:** `package.json` version must match `CHANGELOG.md`

---

## Documentation Sync

| Change | Update |
|--------|--------|
| New folder | AGENTS.md, CLAUDE.md, README.md |
| Version bump | package.json, CHANGELOG.md |
| New convention | AGENTS.md, CLAUDE.md |
| eslint-plugin-code-style update | AGENTS.md (Rules Summary), CLAUDE.md (Must-Know Rules) |

---

## Important Notes

1. **Run `npm run lint:fix` before every commit**
2. **Read eslint-plugin-code-style full docs before coding**
3. **Use absolute imports only (`@/...`)**
4. **Keep AGENTS.md, CLAUDE.md, and README.md in sync with project structure**
