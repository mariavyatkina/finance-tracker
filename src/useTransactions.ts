import { useState, useEffect } from 'react';
import type { Transaction } from './types';

const STORAGE_KEY = 'finance-tracker-data';

function load(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(tx: Transaction) {
    setTransactions(prev => [tx, ...prev]);
  }

  function deleteTransaction(id: string) {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  }

  return { transactions, addTransaction, deleteTransaction };
}
