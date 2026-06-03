# Mit Wallet — Project Guide

Personal budget management app built with Next.js 15 App Router, TypeScript, Tailwind v4, and Shadcn UI (neutral palette).

## Tech Stack

- **Framework**: Next.js 15, App Router, RSC by default
- **Styling**: Tailwind v4 + Shadcn (neutral, `radix-vega` style, oklch tokens)
- **Icons**: lucide-react
- **Font**: Inter (`--font-sans`)
- **Components**: `@/components/ui/` (Shadcn), `@/components/layout/` (shared layout)

## App Routes

| Route | Purpose |
|---|---|
| `/` | Landing — redirects or links to dashboard |
| `/dashboard` | Main overview: net worth, recent transactions, budget snapshot |
| `/accounts` | Manage money accounts (cards, cash, savings, fixed assets) |
| `/records` | Full transaction history with filters and sorting |
| `/analysis` | Charts and spending analytics by category/time |
| `/budgets` | Create and track spending budgets per category |

## Project Conventions

- All pages live in `src/app/<route>/page.tsx`
- Shared layout components go in `src/components/layout/`
- Shadcn UI components go in `src/components/ui/` (added via `npx shadcn add <component>`)
- Feature-specific components go in `src/components/<feature>/`
- Data types and mock data go in `src/lib/`
- No API routes yet — use mock/static data in `src/lib/mock-data.ts`

## Style Rules

See `.claude/skills/mit-wallet-style.md` for the detailed UI style guide.

Always follow that guide when building or modifying any page or component.
