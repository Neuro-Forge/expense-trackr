import './css/global.css';
import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import useLocalStorage from './hooks/useLocalStorage';

import './css/App.css';

function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses', []);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');

  const handleSubmit = (expense) => {
    if (expense.id) {
      setExpenses((prev) =>
        prev.map((e) => (e.id === expense.id ? expense : e))
      );
      setEditingExpense(null);
    } else {
      setExpenses((prev) => [...prev, { ...expense, id: Date.now() }]);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    if (editingExpense && editingExpense.id === id) {
      setEditingExpense(null);
    }
  };

  const filteredExpenses = filterCategory
    ? expenses.filter((e) => e.category === filterCategory)
    : expenses;

  const total = filteredExpenses.reduce(
    (sum, e) => sum + parseFloat(e.amount || 0),
    0
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1>Expense Tracker</h1>
      </header>

      <ExpenseForm
        editingExpense={editingExpense}
        onSubmit={handleSubmit}
      />

      <div className="filter-bar">
        <label>
          Category:
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="other">Other</option>
          </select>
        </label>
        <span className="total">Total: ${total.toFixed(2)}</span>
      </div>

      <ExpenseList
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App
