import type { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function fmtDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric'
  });
}

export function TransactionList({ transactions, onDelete }: Props) {
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));

  if (sorted.length === 0) {
    return (
      <section className="section">
        <h2 className="section-title">Transactions</h2>
        <div className="empty-state">
          <span className="empty-state-icon">📋</span>
          No transactions yet. Add one to get started!
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">Transactions</h2>
      <div className="transaction-list">
        {sorted.map(tx => (
          <div key={tx.id} className="transaction-row">
            <span className="tx-date">{fmtDate(tx.date)}</span>
            <span className={`tx-badge tx-badge--${tx.type}`}>{tx.type}</span>
            <span className="tx-category">{tx.category}</span>
            <span className="tx-description">{tx.description}</span>
            <span className={`tx-amount tx-amount--${tx.type}`}>
              {tx.type === 'expense' ? '−' : '+'}{fmt(tx.amount)}
            </span>
            <button
              className="btn-icon btn-icon--danger"
              onClick={() => onDelete(tx.id)}
              aria-label={`Delete ${tx.description} — ${fmt(tx.amount)}`}
            >✕</button>
          </div>
        ))}
      </div>
    </section>
  );
}
