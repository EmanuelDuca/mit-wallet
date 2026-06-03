export type AccountType = "Cash" | "Card" | "Savings" | "Fixed";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  institution?: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  accountId: string;
  category: string;
  amount: number; // negative = expense, positive = income
  type: "income" | "expense" | "transfer";
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  currency: string;
}

export const accounts: Account[] = [
  { id: "1", name: "Main Checking", type: "Card", balance: 3240.5, currency: "USD", institution: "Chase" },
  { id: "2", name: "Savings Jar", type: "Savings", balance: 8750.0, currency: "USD", institution: "Ally" },
  { id: "3", name: "Wallet Cash", type: "Cash", balance: 120.0, currency: "USD" },
  { id: "4", name: "Emergency Fund", type: "Fixed", balance: 5000.0, currency: "USD", institution: "Marcus" },
  { id: "5", name: "Visa Credit", type: "Card", balance: -450.0, currency: "USD", institution: "Citi" },
];

export const transactions: Transaction[] = [
  { id: "t1", date: "2026-06-03", description: "Grocery Store", accountId: "1", category: "Food", amount: -82.4, type: "expense" },
  { id: "t2", date: "2026-06-02", description: "Salary", accountId: "1", category: "Income", amount: 4200.0, type: "income" },
  { id: "t3", date: "2026-06-02", description: "Netflix", accountId: "5", category: "Entertainment", amount: -17.99, type: "expense" },
  { id: "t4", date: "2026-06-01", description: "Electricity Bill", accountId: "1", category: "Utilities", amount: -95.0, type: "expense" },
  { id: "t5", date: "2026-06-01", description: "Coffee Shop", accountId: "3", category: "Food", amount: -6.5, type: "expense" },
  { id: "t6", date: "2026-05-30", description: "Gym Membership", accountId: "5", category: "Health", amount: -49.99, type: "expense" },
  { id: "t7", date: "2026-05-29", description: "Freelance Payment", accountId: "1", category: "Income", amount: 650.0, type: "income" },
  { id: "t8", date: "2026-05-28", description: "Spotify", accountId: "5", category: "Entertainment", amount: -10.99, type: "expense" },
  { id: "t9", date: "2026-05-27", description: "Restaurant", accountId: "3", category: "Food", amount: -34.2, type: "expense" },
  { id: "t10", date: "2026-05-26", description: "Transfer to Savings", accountId: "1", category: "Transfer", amount: -500.0, type: "transfer" },
];

export const budgets: Budget[] = [
  { id: "b1", category: "Food", limit: 400, spent: 123.1, currency: "USD" },
  { id: "b2", category: "Entertainment", limit: 100, spent: 78.97, currency: "USD" },
  { id: "b3", category: "Utilities", limit: 200, spent: 95.0, currency: "USD" },
  { id: "b4", category: "Health", limit: 150, spent: 49.99, currency: "USD" },
  { id: "b5", category: "Transport", limit: 120, spent: 0, currency: "USD" },
];

export const netWorth = accounts.reduce((sum, a) => sum + a.balance, 0);

export const incomeThisMonth = transactions
  .filter((t) => t.type === "income" && t.date.startsWith("2026-06"))
  .reduce((sum, t) => sum + t.amount, 0);

export const expensesThisMonth = transactions
  .filter((t) => t.type === "expense" && t.date.startsWith("2026-06"))
  .reduce((sum, t) => sum + Math.abs(t.amount), 0);

export const savingsRate =
  incomeThisMonth > 0
    ? Math.round(((incomeThisMonth - expensesThisMonth) / incomeThisMonth) * 100)
    : 0;

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export function getAccountById(id: string) {
  return accounts.find((a) => a.id === id);
}
