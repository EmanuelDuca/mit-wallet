import { Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/layout/page-header";
import { formatCurrency, getAccountById, transactions } from "@/lib/mock-data";

const typeColors: Record<string, string> = {
  income: "text-foreground",
  expense: "text-destructive",
  transfer: "text-muted-foreground",
};

export default function RecordsPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Records"
        description="All your transactions in one place"
        action={
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Record
          </Button>
        }
      />

      {/* Filter Bar */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                <SelectItem value="1">Main Checking</SelectItem>
                <SelectItem value="2">Savings Jar</SelectItem>
                <SelectItem value="3">Wallet Cash</SelectItem>
                <SelectItem value="5">Visa Credit</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{transactions.length} Transactions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {transactions.map((t) => {
            const account = getAccountById(t.accountId);
            return (
              <div key={t.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium">{t.category[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {account?.name ?? "Unknown"} · {t.category} · {t.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs capitalize hidden sm:flex">
                    {t.type}
                  </Badge>
                  <span className={`text-sm font-medium min-w-[80px] text-right ${typeColors[t.type]}`}>
                    {t.amount > 0 ? "+" : ""}{formatCurrency(t.amount)}
                  </span>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Edit</Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
