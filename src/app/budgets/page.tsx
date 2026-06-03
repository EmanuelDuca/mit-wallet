import { Plus, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import PageHeader from "@/components/layout/page-header";
import { budgets, formatCurrency } from "@/lib/mock-data";

const totalBudgeted = budgets.reduce((sum, b) => sum + b.limit, 0);
const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
const overallPct = Math.min(Math.round((totalSpent / totalBudgeted) * 100), 100);

export default function BudgetsPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Budgets"
        description="Set monthly spending limits and track your progress"
        action={
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Budget
          </Button>
        }
      />

      {/* Overall Summary */}
      <Card>
        <CardContent className="py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Target className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1.5">
                <div>
                  <span className="text-sm font-medium">Monthly Budget Overview</span>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(totalSpent)} spent of {formatCurrency(totalBudgeted)} total
                  </p>
                </div>
                <span className="text-sm font-medium">{overallPct}%</span>
              </div>
              <Progress value={overallPct} className="h-2" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Budgeted</p>
              <p className="text-base font-semibold">{formatCurrency(totalBudgeted)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Spent</p>
              <p className="text-base font-semibold">{formatCurrency(totalSpent)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="text-base font-semibold">{formatCurrency(totalBudgeted - totalSpent)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget List */}
      <div className="space-y-3">
        {budgets.map((b) => {
          const pct = Math.min(Math.round((b.spent / b.limit) * 100), 100);
          const remaining = b.limit - b.spent;
          const isOverBudget = b.spent > b.limit;

          return (
            <Card key={b.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium">{b.category}</p>
                    <p className="text-xs text-muted-foreground">
                      {isOverBudget
                        ? `${formatCurrency(Math.abs(remaining))} over budget`
                        : `${formatCurrency(remaining)} remaining`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {formatCurrency(b.spent)} / {formatCurrency(b.limit)}
                    </span>
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Edit</Button>
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-destructive hover:text-destructive">
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress
                    value={pct}
                    className={`h-2 ${isOverBudget ? "[&>div]:bg-destructive" : ""}`}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{pct}% used</span>
                    <span>Limit: {formatCurrency(b.limit)}/mo</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Add Budget Placeholder */}
        <Card className="border-dashed">
          <CardContent className="py-6 flex items-center justify-center">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add a new budget category</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
