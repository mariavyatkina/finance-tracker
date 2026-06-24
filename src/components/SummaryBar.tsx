import type { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function SummaryBar({ transactions }: Props) {
  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary-bar">
      <div className="summary-card summary-card--income">
        <span className="summary-label">Total Income</span>
        <span className="summary-amount">{fmt(totalIncome)}</span>
      </div>
      <div className="summary-card summary-card--expense">
        <span className="summary-label">Total Expenses</span>
        <span className="summary-amount">{fmt(totalExpenses)}</span>
      </div>
      <div className={`summary-card summary-card--balance${balance < 0 ? ' summary-card--negative' : ''}`}>
        <span className="summary-label">Remaining Balance</span>
        <span className="summary-amount">{fmt(balance)}</span>
      </div>
    </div>
  );
}
