import { useState, useEffect } from "react";
import "../css/ExpenseForm.css";

const initialexpense = {
  description: "",
  category: "",
  amount: "",
  date: "",
};

export default function ExpenseForm({ editingExpense, onSubmit, onCancel }) {
  const [expense, setExpense] = useState(initialexpense);

  useEffect(() => {
    if (editingExpense) {
      setExpense(editingExpense);
    } else {
      setExpense(initialexpense);
    }
  }, [editingExpense]);

  const handleChange = (field) => (e) => {
    setExpense({ ...expense, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(expense);
    setExpense(initialexpense);
  };

  const handleCancel = () => {
    setExpense(initialexpense);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>{editingExpense ? "Edit expense" : "Add expense"}</h2>

      <div className="form-row">
        <label>
          Description
          <input
            type="text"
            required
            placeholder="Description"
            value={expense.description}
            onChange={handleChange("description")}
          />
        </label>

        <label>
          Amount
          <input
            type="number"
            required
            placeholder="Amount"
            value={expense.amount}
            onChange={handleChange("amount")}
            step="0.01"
            min="0"
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Category
          <select
            required
            value={expense.category}
            onChange={handleChange("category")}
          >
            <option value="" disabled>
              Category
            </option>
            <option value="food">food</option>
            <option value="transportation">transportation</option>
            <option value="entertainment">entertainment</option>
            <option value="utilities">utilities</option>
            <option value="other">other</option>
          </select>
        </label>

        <label>
          Date
          <input
            type="date"
            required
            value={expense.date}
            onChange={handleChange("date")}
          />
        </label>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {editingExpense ? "Update" : "Add Expense"}
        </button>
      </div>
    </form>
  );
}
