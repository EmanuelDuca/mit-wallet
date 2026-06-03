import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PageHeader from "@/components/layout/page-header";
import { expensesThisMonth, formatCurrency, incomeThisMonth, transactions } from "@/lib/mock-data";

// Aggregate spending by category from mock transactions
const categoryTotals = transactions
  .filter((t) => t.type === "expense")
  .reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + Math.abs(t.amount);
    return acc;
  }, {});

const categoryList = Object.entries(categoryTotals)
  .map(([category, total]) => ({ category, total }))
  .sort((a, b) => b.total - a.total);

const totalExpenses = categoryList.reduce((sum, c) => sum + c.total, 0);

// Simplified monthly bar data (static mock)
const monthlyData = [
  { month: "Jan", income: 4200, expenses: 2800 },
  { month: "Feb", income: 4200, expenses: 3100 },
  { month: "Mar", income: 4850, expenses: 2600 },
  { month: "Apr", income: 4200, expenses: 3400 },
  { month: "May", income: 4850, expenses: 2950 },
  { month: "Jun", income: incomeThisMonth, expenses: expensesThisMonth },
];

const maxBar = Math.max(...monthlyData.flatMap((m) => [m.income, m.expenses]));

export default function AnalysisPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Analysis"
        description="Spending breakdown and financial trends"
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Income (June)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{formatCurrency(incomeThisMonth)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Expenses (June)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{formatCurrency(expensesThisMonth)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Net (June)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {formatCurrency(incomeThisMonth - expensesThisMonth)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Spending by Category</CardTitle>
            <CardDescription>All recorded expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryList.map(({ category, total }) => {
              const pct = Math.round((total / totalExpenses) * 100);
              return (
                <div key={category} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{category}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(total)} · {pct}%
                    </span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Income vs Expenses Bar Chart (CSS-based) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Income vs Expenses</CardTitle>
            <CardDescription>Monthly comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {monthlyData.map(({ month, income, expenses }) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-0.5 items-end" style={{ height: "160px" }}>
                    <div
                      className="flex-1 bg-foreground/20 rounded-sm"
                      style={{ height: `${(income / maxBar) * 100}%` }}
                    />
                    <div
                      className="flex-1 bg-destructive/40 rounded-sm"
                      style={{ height: `${(expenses / maxBar) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{month}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-foreground/20 inline-block" />
                Income
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-destructive/40 inline-block" />
                Expenses
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Categories Ranked */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top Spending Categories</CardTitle>
          <CardDescription>Ranked by total amount</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {categoryList.map(({ category, total }, i) => (
              <div
                key={category}
                className="flex items-center gap-4 py-3 border-b last:border-0"
              >
                <span className="w-6 text-center text-sm font-medium text-muted-foreground">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm font-medium">{category}</span>
                <span className="text-sm font-medium">{formatCurrency(total)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
