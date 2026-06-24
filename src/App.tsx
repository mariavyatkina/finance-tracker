import { useState } from 'react';
import './App.css';
import { useTransactions } from './useTransactions';
import { SummaryBar } from './components/SummaryBar';
import { SpendingChart } from './components/SpendingChart';
import { TransactionList } from './components/TransactionList';
import { AddTransactionForm } from './components/AddTransactionForm';

function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <h1 className="app-title">Finance Tracker</h1>
          <button className="btn btn--primary" onClick={() => setShowModal(true)}>
            + Add Transaction
          </button>
        </div>
      </header>

      <main className="main">
        <SummaryBar transactions={transactions} />

        <div className="content-grid">
          <SpendingChart transactions={transactions} />
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </div>
      </main>

      {showModal && (
        <AddTransactionForm
          onAdd={addTransaction}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;
