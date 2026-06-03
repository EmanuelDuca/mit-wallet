# Mit Wallet — UI Style Guide & Component Approach

Use this skill whenever building or reviewing a page or component in this project.

---

## Design System

**Library**: Shadcn UI — use existing components before writing custom ones.  
**Color palette**: Neutral (oklch, no hue). No blue/green/brand accents unless explicit.  
**Radius**: `--radius: 0.625rem` (rounded-lg). Cards use `rounded-xl`.  
**Font**: Inter via `--font-sans`. Weights: 400 body, 500 labels, 600 headings.  
**Dark mode**: Token-based via `.dark` class — no hardcoded colors, always use `bg-background`, `text-foreground`, `text-muted-foreground`, etc.

---

## Layout

### Page Shell
Every authenticated page uses this shell:

```
<TopBar />                          ← already in RootLayout
<div className="flex">
  <Sidebar />                       ← left nav (icon + label, collapsible)
  <main className="flex-1 p-6 overflow-auto min-h-[calc(100vh-3.5rem)]">
    <PageHeader title="..." />      ← h1 + optional subtitle + CTA
    {children}
  </main>
</div>
```

TopBar height is `h-14` (3.5rem). Sidebar width: `w-56` expanded, `w-14` collapsed.

### Page Header Component
```tsx
// src/components/layout/page-header.tsx
<div className="mb-6 flex items-center justify-between">
  <div>
    <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
    {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
  </div>
  {action}
</div>
```

---

## Spacing & Grid

- Page padding: `p-6`
- Card gaps: `gap-4` or `gap-6`
- Summary stat row: CSS grid `grid-cols-2 md:grid-cols-4 gap-4`
- Section spacing: `space-y-6`

---

## Components Reference

### Stat Card (KPI)
Used on Dashboard and Analysis for totals.

```tsx
<Card>
  <CardHeader className="pb-2">
    <CardDescription>{label}</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-semibold">{value}</div>
    <p className="text-xs text-muted-foreground mt-1">{trend}</p>
  </CardContent>
</Card>
```

### Transaction Row
Used on Dashboard (recent) and Records (full list).

```tsx
<div className="flex items-center justify-between py-3 border-b last:border-0">
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
      <Icon className="w-4 h-4 text-muted-foreground" />
    </div>
    <div>
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-muted-foreground">{category} · {date}</p>
    </div>
  </div>
  <span className={cn("text-sm font-medium", amount < 0 ? "text-destructive" : "text-foreground")}>
    {formatted amount}
  </span>
</div>
```

### Account Card
Used on Accounts page to display a money account.

```tsx
<Card className="rounded-xl">
  <CardHeader className="pb-2">
    <div className="flex items-center justify-between">
      <CardTitle className="text-base">{name}</CardTitle>
      <Badge variant="outline">{type}</Badge>  {/* Cash / Card / Savings */}
    </div>
    <CardDescription>{institution or note}</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-semibold">{balance}</div>
  </CardContent>
  <CardFooter className="gap-2">
    <Button size="sm" variant="outline">Edit</Button>
    <Button size="sm" variant="ghost" className="text-destructive">Delete</Button>
  </CardFooter>
</Card>
```

### Budget Progress Row
Used on Budgets page.

```tsx
<div className="space-y-1.5">
  <div className="flex justify-between text-sm">
    <span className="font-medium">{category}</span>
    <span className="text-muted-foreground">{spent} / {limit}</span>
  </div>
  <Progress value={percentage} className="h-2" />
  <p className="text-xs text-muted-foreground">{remaining} remaining</p>
</div>
```

### Empty State
Use when a list is empty.

```tsx
<div className="flex flex-col items-center justify-center py-16 text-center">
  <Icon className="w-10 h-10 text-muted-foreground mb-3" />
  <p className="text-sm font-medium">{title}</p>
  <p className="text-xs text-muted-foreground mt-1">{description}</p>
  {action && <Button size="sm" className="mt-4">{action}</Button>}
</div>
```

---

## Pages Spec

### /dashboard — Overview
**Goal**: Single-glance personal finance summary.

Sections:
1. **Stat row** (4 cards): Net Worth · Income this month · Expenses this month · Savings rate
2. **Recent Transactions** (Card): Last 5–10 rows + "View all" link to `/records`
3. **Budget Snapshot** (Card): Top 3 budgets with Progress bars + "Manage budgets" link
4. **Accounts Summary** (Card): List of accounts with balances + "View all" link to `/accounts`

---

### /accounts — Money Accounts
**Goal**: Add, view, and manage all money accounts (cards, cash, savings, fixed assets).

Sections:
1. **Page Header**: "Accounts" title + "Add Account" Button (opens Sheet or Dialog)
2. **Total Net Worth** banner (single large number)
3. **Account Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` of Account Cards
4. **Add/Edit Account** — Sheet from the right with a form: name, type (Cash/Card/Savings/Fixed), balance, currency, notes

Account types (Badge): `Cash` `Card` `Savings` `Fixed`

---

### /records — Transaction History
**Goal**: Full filterable/sortable list of all transactions.

Sections:
1. **Page Header**: "Records" + "Add Record" Button
2. **Filter bar**: Date range picker · Account dropdown · Category dropdown · Type toggle (Income/Expense/Transfer) · Search input
3. **Records Table** or virtualized list — columns: Date, Description, Account, Category, Amount
4. **Add/Edit Record** — Sheet with form: date, amount, type, account, category, note

---

### /analysis — Spending Analytics
**Goal**: Visual breakdown of finances over time.

Sections:
1. **Page Header**: "Analysis" + time period selector (Month / Quarter / Year)
2. **Spending by Category** — Donut or Bar chart
3. **Income vs Expense over time** — Bar chart (monthly)
4. **Top spending categories** — ranked list with amounts
5. **Month-over-month change** — stat cards with delta

Use Recharts (add via `npm install recharts`) wrapped in a `"use client"` boundary. Keep RSC pages thin.

---

### /budgets — Budget Management
**Goal**: Set monthly spending limits per category and track progress.

Sections:
1. **Page Header**: "Budgets" + "Add Budget" Button
2. **Summary**: Total budgeted · Total spent · Overall progress bar
3. **Budget List**: One row per category with Progress bar, amounts, and edit/delete actions
4. **Add/Edit Budget** — Dialog: category, monthly limit, currency

---

## Dos & Don'ts

- DO use `shadcn add <component>` before writing a component from scratch
- DO keep pages as RSC; push interactivity (`useState`, event handlers) into `"use client"` child components
- DO use `text-muted-foreground` for secondary labels
- DO use `variant="outline"` Badges for account types/categories
- DON'T use hardcoded colors (`text-gray-500`, `bg-blue-100`) — always use semantic tokens
- DON'T add mock data inline in page files — put it in `src/lib/mock-data.ts`
- DON'T add comments explaining what code does — only explain non-obvious WHY
