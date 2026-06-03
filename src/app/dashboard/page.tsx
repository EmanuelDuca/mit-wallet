import Link from "next/link";
import { ArrowUpRight, Landmark, LayoutDashboard, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageHeader from "@/components/layout/page-header";
import {
  accounts,
  budgets,
  expensesThisMonth,
  formatCurrency,
  incomeThisMonth,
  netWorth,
  savingsRate,
  transactions,
} from "@/lib/mock-data";

const statCards = [
  {
    label: "Net Worth",
    value: formatCurrency(netWorth),
    trend: "All accounts combined",
    icon: Wallet,
  },
  {
    label: "Income This Month",
    value: formatCurrency(incomeThisMonth),
    trend: "June 2026",
    icon: TrendingUp,
  },
  {
    label: "Expenses This Month",
    value: formatCurrency(expensesThisMonth),
    trend: "June 2026",
    icon: Landmark,
  },
  {
    label: "Savings Rate",
    value: `${savingsRate}%`,
    trend: "of income saved",
    icon: LayoutDashboard,
  },
];

export default function DashboardPage() {
  const recentTransactions = transactions.slice(0, 6);
  const topBudgets = budgets.slice(0, 3);
  const topAccounts = accounts.slice(0, 4);

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Dashboard" description="Your financial overview for June 2026" />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(({ label, value, trend, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>{label}</CardDescription>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{value}</div>
              <p className="text-xs text-muted-foreground mt-1">{trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/records" className="flex items-center gap-1 text-xs">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            {recentTransactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2.5 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{t.category} · {t.date}</p>
                </div>
                <span className={`text-sm font-medium ${t.amount < 0 ? "text-destructive" : ""}`}>
                  {t.amount > 0 ? "+" : ""}{formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Budget Snapshot */}
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Budget Snapshot</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/budgets" className="flex items-center gap-1 text-xs">
                  Manage <ArrowUpRight className="w-3 h-3" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-2 space-y-4">
              {topBudgets.map((b) => {
                const pct = Math.min(Math.round((b.spent / b.limit) * 100), 100);
                return (
                  <div key={b.id} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{b.category}</span>
                      <span className="text-muted-foreground">
                        {formatCurrency(b.spent)} / {formatCurrency(b.limit)}
                      </span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Accounts Summary */}
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Accounts</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/accounts" className="flex items-center gap-1 text-xs">
                  View all <ArrowUpRight className="w-3 h-3" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-2">
              {topAccounts.map((a, i) => (
                <div key={a.id}>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{a.name}</span>
                      <Badge variant="outline" className="text-xs">{a.type}</Badge>
                    </div>
                    <span className={`text-sm font-medium ${a.balance < 0 ? "text-destructive" : ""}`}>
                      {formatCurrency(a.balance)}
                    </span>
                  </div>
                  {i < topAccounts.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
