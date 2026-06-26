import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

const COLORS: Record<string, string> = {
  Food: '#f97316',
  Transportation: '#3b82f6',
  Housing: '#8b5cf6',
  Entertainment: '#ec4899',
  Health: '#10b981',
  Other: '#6b7280',
};

function fmt(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function SpendingChart({ transactions }: Props) {
  const expenses = transactions.filter(tx => tx.type === 'expense');

  const grouped = expenses.reduce<Record<string, number>>((acc, tx) => {
    acc[tx.category] = (acc[tx.category] ?? 0) + tx.amount;
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <section className="section">
        <h2 className="section-title">Spending by Category</h2>
        <div className="empty-state">
          <span className="empty-state-icon">📊</span>
          No expense data yet.
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map(entry => (
              <Cell key={entry.name} fill={COLORS[entry.name] ?? '#94a3b8'} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => fmt(Number(value))} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}
