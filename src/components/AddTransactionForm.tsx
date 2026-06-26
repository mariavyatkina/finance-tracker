import { useState } from 'react';
import type { Transaction, TransactionType, Category } from '../types';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../types';

interface Props {
  onAdd: (tx: Transaction) => void;
  onClose: () => void;
}

const today = new Date().toISOString().slice(0, 10);

export function AddTransactionForm({ onAdd, onClose }: Props) {
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<Category>(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(today);
  const [error, setError] = useState('');

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  function handleTypeChange(newType: TransactionType) {
    setType(newType);
    setCategory(newType === 'expense' ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a description.');
      return;
    }
    onAdd({
      id: crypto.randomUUID(),
      type,
      category,
      amount: parsed,
      description: description.trim(),
      date,
    });
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Transaction</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <fieldset className="form-group">
            <legend className="form-group-legend">Type</legend>
            <div className="toggle-group">
              <button
                type="button"
                data-type="expense"
                className={`toggle-btn${type === 'expense' ? ' active' : ''}`}
                aria-pressed={type === 'expense'}
                onClick={() => handleTypeChange('expense')}
              >Expense</button>
              <button
                type="button"
                data-type="income"
                className={`toggle-btn${type === 'income' ? ' active' : ''}`}
                aria-pressed={type === 'income'}
                onClick={() => handleTypeChange('income')}
              >Income</button>
            </div>
          </fieldset>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value as Category)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount ($)</label>
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              inputMode="decimal"
              value={amount}
              onChange={e => { setAmount(e.target.value); setError(''); }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              placeholder="e.g. Monthly groceries"
              value={description}
              onChange={e => { setDescription(e.target.value); setError(''); }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn--primary btn--full">Add Transaction</button>
        </form>
      </div>
    </div>
  );
}
