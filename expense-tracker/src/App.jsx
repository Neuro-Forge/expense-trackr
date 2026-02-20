import './css/global.css';
import { useMemo, useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import useLocalStorage from './hooks/useLocalStorage';
import Dashboard from './components/dashboard';

import './css/App.css';


function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses', []);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'family' | 'view'
  const [showForm, setShowForm] = useState(false);

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
    setShowForm(true);
    setActiveView('view');
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    if (editingExpense && editingExpense.id === id) {
      setEditingExpense(null);
      setShowForm(false);
    }
  };

  const handleAddClick = () => {
    setEditingExpense(null);
    setShowForm(true);
    setActiveView('view');
  };

  const filteredExpenses = useMemo(() => {
    let result = expenses;

    if (filterCategory) {
      result = result.filter((e) => e.category === filterCategory);
    }

    if (activeView === 'family') {
      result = result.filter((e) => e.isFamily);
    }

    return result;
  }, [expenses, filterCategory, activeView]);

  const total = filteredExpenses.reduce(
    (sum, e) => sum + parseFloat(e.amount || 0),
    0
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1>Expense Tracker</h1>
      </header>

      {/* Navigation bar */}
      <nav className="nav-bar">
        <button
          className={activeView === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveView('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={activeView === 'family' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveView('family')}
        >
          Family
        </button>
        <button
          className={activeView === 'view' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveView('view')}
        >
          View Expenses
        </button>

        <button className="nav-btn primary" onClick={handleAddClick}>
          Add Expense
        </button>
      </nav>

      {/* Dashboard view */}
      {activeView === 'dashboard' && <Dashboard expenses={expenses} />}

      {/* Add / Edit Expense form – only when user wants */}
      {showForm && (
        <ExpenseForm
          editingExpense={editingExpense}
          onSubmit={(expense) => {
            handleSubmit(expense);
            setShowForm(false); // hide after save
          }}
        />
      )}

      {/* Filters + list for View / Family views */}
      {(activeView === 'view' || activeView === 'family') && (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;
