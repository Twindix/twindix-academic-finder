# Claude Code Configuration

> **SYNC REQUIREMENTS:**
> 1. **Folder Structure:** Keep in sync when creating/reorganizing folders
> 2. **ESLint Rules:** Keep "Must-Know Rules" table in sync with [eslint-plugin-code-style](https://github.com/Mohamed-Elhawary/eslint-plugin-code-style) when rules are added, removed, or updated

For full instructions, see [AGENTS.md](./AGENTS.md).

## Project

**Twindix Academic Finder** — https://academicfinder.twindix.com/

---

## ESLint (CRITICAL)

> **Read the full documentation before writing any code.**

| Resource | Link |
|----------|------|
| **eslint-plugin-code-style (77 rules)** | https://github.com/Mohamed-Elhawary/eslint-plugin-code-style |
| **Local Config** | `eslint.config.js` |
| **Current Version** | `1.15.0` (check `package.json`) |

**Always run `npm run lint:fix` after making changes.**

> **VERSION SYNC:** When `eslint-plugin-code-style` version changes in `package.json`, agents MUST:
> 1. Fetch the plugin documentation to check for new/updated rules
> 2. Update rule counts in this file and `AGENTS.md`
> 3. Add any new rules to the "Must-Know Rules" table below

---

## Must-Know Rules (Quick Reference)

| Category | Rule | Requirement |
|----------|------|-------------|
| **Naming** | `function-naming-convention` | camelCase + verb, `*Handler` suffix |
| | `use-state-naming-convention` | Boolean: `is`/`has`/`with` prefix |
| | `interface-format` | `*Interface` suffix |
| | `type-format` | `*Type` suffix |
| | `enum-format` | `*Enum` suffix, UPPER_SNAKE_CASE members |
| | `svg-component-icon-naming` | SVG -> `*Icon` suffix |
| **Imports** | `absolute-imports-only` | Use `@/`, no relative imports |
| | `import-format` | <=3 inline, >3 multiline |
| **Components** | `component-props-destructure` | `({ prop })` not `(props)` |
| | `component-props-inline-type` | Inline type annotations |
| **Hooks** | `hook-callback-format` | Callback + deps on separate lines |
| | `hook-deps-per-line` | <=2 inline, >2 multiline |
| | `react-code-order` | refs -> state -> effects -> handlers |
| **Arrays** | `array-items-per-line` | <=3 inline, >3 multiline |
| **JSX** | `jsx-simple-element-one-line` | Simple children on one line |
| | `classname-order` | Tailwind class ordering |
| **Strings** | `no-hardcoded-strings` | Import from `@/constants` |

See [AGENTS.md](./AGENTS.md) for full rules table or the [plugin docs](https://github.com/Mohamed-Elhawary/eslint-plugin-code-style).

---

## Component Architecture (CRITICAL)

> **Agents must follow this hierarchy when building UI.**

```
atoms/  →  components/  →  layouts/  →  pages/
```

| Folder | Purpose |
|--------|---------|
| `atoms/` | Custom components with **project identity** |
| `components/` | Shared components with **multiple elements/logic** |
| `layouts/` | Page layouts (AuthLayout, CodeLayout, MainLayout) |
| `pages/` | Full page components |

### Why Atoms?

Atoms:
1. **Apply identity** - Theme colors, radius `14px`, fonts
2. **Simplify usage** - Expose only needed props
3. **Consistent styling** - One source of truth per UI primitive

```typescript
// With atom: one import, pre-styled
import { Button } from "@/atoms";
<Button variant="primary" onClick={handleClick}>Submit</Button>
```

See [AGENTS.md](./AGENTS.md#component-architecture-critical) for full examples.

---

## Project Structure

> **SYNC:** Keep in sync with AGENTS.md and README.md when folders change.

```
├── public/                    # Static assets
├── src/
│   ├── assets/                # Icons and images
│   │   ├── icons/             # SVG/TSX icon components
│   │   └── images/            # Image files
│   ├── atoms/                 # Custom UI components (project identity)
│   ├── components/            # Shared components with logic
│   ├── constants/             # App constants, routes, and strings
│   ├── enums/                 # TypeScript enums
│   ├── hooks/                 # Custom React hooks
│   ├── interfaces/            # TypeScript interfaces
│   ├── layouts/               # Page layouts
│   ├── pages/                 # Full page components
│   ├── routes/                # React Router configuration
│   ├── services/              # API services & Axios client
│   ├── types/                 # TypeScript type aliases
│   ├── utils/                 # Utility functions
│   ├── app.tsx                # Root application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles & Tailwind theme
├── scripts/                   # Build scripts
├── AGENTS.md                  # AI agent instructions
├── CLAUDE.md                  # Claude-specific configuration (this file)
└── README.md                  # Project documentation
```

---

## Formatting Rules

| Rule | Value |
|------|-------|
| Indentation | 4 spaces |
| Quotes | Double |
| Semicolons | Required |
| Trailing commas | Required |
| Object keys | Sorted alphabetically |
| Files/Folders | kebab-case |

---

## Claude-Specific

- No `Co-Authored-By` in commits
- No Claude signature in commits
- Follow Conventional Commits: `feat(scope): subject`

---

## Version Management

| Bump | When |
|------|------|
| PATCH | Bug fixes |
| MINOR | New features |
| MAJOR | Breaking changes |

Update both `package.json` and `CHANGELOG.md`.

---

## Documentation Sync

| Change | Update |
|--------|--------|
| Folder structure | AGENTS.md, CLAUDE.md, README.md |
| Version bump | package.json, CHANGELOG.md |
| eslint-plugin-code-style update | AGENTS.md (Rules Summary), CLAUDE.md (Must-Know Rules) |

---

## Design Tokens

```css
--color-primary: #1356BC
--color-primary-dark: #0025BA
--color-background: #F6F6F6
--color-surface: #FFFFFF
--color-error: #DC2626
--radius-default: 14px
```

---

## Reminders

- React 19, TypeScript 5, Tailwind 4, Vite 6
- Run `npm run lint:fix` before commits
- Read eslint-plugin-code-style docs before coding
- Keep docs in sync with project structure
