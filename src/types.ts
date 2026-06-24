export type TransactionType = 'income' | 'expense';

export const EXPENSE_CATEGORIES = [
  'Food', 'Transportation', 'Housing', 'Entertainment', 'Health', 'Other',
] as const;

export const INCOME_CATEGORIES = [
  'Salary', 'Freelance', 'Other',
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];
export type IncomeCategory = typeof INCOME_CATEGORIES[number];
export type Category = ExpenseCategory | IncomeCategory;

export interface Transaction {
  id: string;
  type: TransactionType;
  category: Category;
  amount: number;
  description: string;
  date: string;
}
