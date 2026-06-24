# Finance Tracker

**Live app:** https://finance-tracker-o9n3.onrender.com/

A personal finance tracker for logging income and expenses, visualizing spending by category, and monitoring your balance over time.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Charts | Recharts |
| Persistence | Browser localStorage |
| Styling | Plain CSS with CSS variables |

No backend, no database, no authentication — everything runs in the browser and persists locally.

## Getting Started

**Prerequisites:** Node.js 18 or higher.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** (or the next available port if 5173 is in use).

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Features

### Dashboard
Three summary cards update in real time as you add or remove transactions:
- **Total Income** — sum of all income entries
- **Total Expenses** — sum of all expense entries
- **Remaining Balance** — income minus expenses (turns red if negative)

### Add a Transaction
Click **+ Add Transaction** to open the form. Fill in:
- **Type** — Expense or Income (toggle button)
- **Category** — changes based on type (see below)
- **Amount** — positive number in USD
- **Description** — short label for the transaction
- **Date** — defaults to today

**Expense categories:** Food, Transportation, Housing, Entertainment, Health, Other

**Income categories:** Salary, Freelance, Other

### Spending Chart
A pie chart shows your expense breakdown by category. Each category has a distinct color. Hover a slice to see the exact dollar amount. The chart only appears once you have at least one expense.

### Transaction List
All transactions are listed sorted by date (most recent first). Each row shows the date, type badge, category, description, and amount. Click the **✕** button on any row to delete it.

### Persistence
Transactions are saved to `localStorage` under the key `finance-tracker-data`. Your data survives page refreshes and browser restarts. Clearing browser storage will erase all transactions.

## Project Structure

```
src/
├── types.ts                   # TypeScript types and category constants
├── useTransactions.ts         # Custom hook: state + localStorage sync
├── App.tsx                    # Root component, modal state
├── App.css                    # All styles (CSS variables, layout, components)
├── index.css                  # Global reset
└── components/
    ├── SummaryBar.tsx          # Income / Expenses / Balance cards
    ├── SpendingChart.tsx       # Recharts pie chart
    ├── TransactionList.tsx     # Sorted transaction list with delete
    └── AddTransactionForm.tsx  # Modal form for adding transactions
```
