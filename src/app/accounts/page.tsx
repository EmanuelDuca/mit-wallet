import { Plus, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/layout/page-header";
import { accounts, formatCurrency, netWorth } from "@/lib/mock-data";

export default function AccountsPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Accounts"
        description="Manage your money accounts and track balances"
        action={
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Account
          </Button>
        }
      />

      {/* Net Worth Banner */}
      <Card className="bg-muted/40">
        <CardContent className="py-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center">
            <Wallet className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Net Worth</p>
            <p className="text-3xl font-semibold">{formatCurrency(netWorth)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <Card key={account.id} className="rounded-xl">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{account.name}</CardTitle>
                <Badge variant="outline">{account.type}</Badge>
              </div>
              {account.institution && (
                <CardDescription>{account.institution}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-semibold ${account.balance < 0 ? "text-destructive" : ""}`}>
                {formatCurrency(account.balance, account.currency)}
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm" variant="outline">Edit</Button>
              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Add Account Placeholder */}
        <Card className="rounded-xl border-dashed flex items-center justify-center min-h-[160px]">
          <button className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-6 w-full h-full">
            <Plus className="w-6 h-6" />
            <span className="text-sm font-medium">New Account</span>
          </button>
        </Card>
      </div>
    </div>
  );
}
